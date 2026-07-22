const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ARAS_ROOT = 'D:\\博威\\项目\\ICS\\ArasDocs';
const ZH_ROOT = path.join(ARAS_ROOT, 'docs-zh');
const SYS_ADMIN = path.join(ARAS_ROOT, 'sys-admin', 'index.html');
const PROJ_ROOT = 'D:\\博威\\项目\\ICS\\个人知识库';
const OUTPUT_DIR = path.join(PROJ_ROOT, 'src', 'data', 'aras-docs');
const MENU_OUTPUT = path.join(PROJ_ROOT, 'src', 'data', 'aras-menu.ts');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ===== Parse sys-admin/index.html =====
const html = fs.readFileSync(SYS_ADMIN, 'utf8');
const $ = cheerio.load(html);

function slugify(text) {
  return text.toLowerCase()
    .replace(/[（）()·]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '') || 'unnamed';
}

// Extract menu tree from sidebar nav
const menuTree = [];

$('.nav-group').each((gi, groupEl) => {
  const $group = $(groupEl);
  const groupTitle = $group.find('> .nav-group-title').clone().children('.count,.arrow').remove().end().text().trim();
  const groupId = slugify(groupTitle);
  const groupNode = { id: groupId, name: groupTitle, type: 'group', children: [] };

  // Direct nav-items under this group (not in sub-groups)
  $group.find('> .nav-items > a.nav-item').each((i, a) => {
    const $a = $(a);
    const name = $a.text().trim();
    const href = $a.attr('href') || '';
    const docFile = href.replace('../docs-zh/', '');
    groupNode.children.push({
      id: slugify(name),
      name,
      type: 'item',
      docFile,
    });
  });

  // Sub-groups
  $group.find('> .nav-items > .sub-group').each((si, subEl) => {
    const $sub = $(subEl);
    const subTitle = $sub.find('> .sub-group-title').clone().children('.count,.arrow').remove().end().text().trim();
    const subId = slugify(subTitle);
    const subNode = { id: subId, name: subTitle, type: 'subgroup', children: [] };

    $sub.find('.sub-items > a.nav-item').each((i, a) => {
      const $a = $(a);
      const name = $a.text().trim();
      const href = $a.attr('href') || '';
      const docFile = href.replace('../docs-zh/', '');
      subNode.children.push({
        id: slugify(name),
        name,
        type: 'item',
        docFile,
      });
    });

    groupNode.children.push(subNode);
  });

  menuTree.push(groupNode);
});

console.log('Parsed menu groups:', menuTree.length);
menuTree.forEach(g => {
  const itemCount = countItems(g);
  console.log(`  ${g.name}: ${itemCount} docs, ${g.children.length} children`);
});

function countItems(node) {
  let c = 0;
  if (node.type === 'item') c = 1;
  if (node.children) node.children.forEach(ch => { c += countItems(ch); });
  return c;
}

// ===== Extract HTML content =====
function extractContent(docFile) {
  // docFile can be like "Welcome.htm" or "Permissions/about_permissions.htm" or "WorfklowPromote/workflow_promote.htm"
  const filepath = path.join(ZH_ROOT, docFile);
  if (!fs.existsSync(filepath)) {
    console.warn('  MISSING:', docFile);
    return null;
  }
  const raw = fs.readFileSync(filepath, 'utf8');
  const $doc = cheerio.load(raw);

  // Remove RoboHelp boilerplate
  $doc('script').remove();
  $doc('.topic-header').remove();
  $doc('.topic-header-shadow').remove();
  $doc('style').remove();

  // Get body content
  const bodyDivs = $doc('body > div');
  let contentHtml = '';
  bodyDivs.each((i, el) => {
    const $el = $doc(el);
    if ($el.hasClass('topic-header') || $el.hasClass('topic-header-shadow')) return;
    const text = $el.text().trim();
    if (text.startsWith('\u00a9') || text === '') return;
    contentHtml += $doc.html(el);
  });

  const title = $doc('title').text() || $doc('h1').first().text() || '';

  // Clean up
  const $c = cheerio.load(contentHtml, { decodeEntities: false });
  $c('font[size="1"]').remove();
  $c('span[style*="font: 6.0pt"]').each((i, el) => {
    if ($c(el).text().trim() === '') $c(el).remove();
  });
  $c('p').each((i, el) => {
    const $el = $c(el);
    if ($el.text().trim() === '' && $el.find('img').length === 0) $el.remove();
  });

  // Rewrite image paths
  const sourceDir = path.dirname(docFile);
  const imageRoots = [path.join(ZH_ROOT, 'assets', 'images')];
  // Recursively find all 'images' directories under docs-zh (excluding template/whxdata)
  function findImageDirs(dir) {
    try {
      fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        if (!entry.isDirectory()) return;
        if (entry.name === 'template' || entry.name === 'whxdata') return;
        const full = path.join(dir, entry.name);
        if (entry.name === 'images') imageRoots.push(full);
        findImageDirs(full);
      });
    } catch(e) {}
  }
  findImageDirs(ZH_ROOT);

  $c('img').each((i, el) => {
    const $el = $c(el);
    let src = $el.attr('src') || '';
    if (!src || src.startsWith('http') || src.startsWith('data:')) return;
    const resolved = path.resolve(path.join(ZH_ROOT, sourceDir), src);
    for (const root of imageRoots) {
      const rel = path.relative(root, resolved);
      if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
        $el.attr('src', '/aras-images/' + rel.replace(/\\/g, '/'));
        break;
      }
    }
  });

  // Fix internal doc links
  $c('a[href]').each((i, el) => {
    const $el = $c(el);
    let href = $el.attr('href') || '';
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
    if (href.endsWith('.htm') || href.endsWith('.html')) {
      $el.attr('href', '#');
      $el.addClass('internal-doc-link');
    }
  });

  return { title, html: $c.html() || contentHtml };
}

// ===== Process all nodes and extract docs =====
let docCount = 0, errorCount = 0;
const processedFiles = new Set();

function processNode(node, parentPath) {
  parentPath = parentPath || '';
  const currentPath = parentPath ? parentPath + '/' + node.id : node.id;
  node.path = '/aras-docs/' + currentPath;

  if (node.type === 'item' && node.docFile) {
    if (!processedFiles.has(node.docFile)) {
      processedFiles.add(node.docFile);
      const content = extractContent(node.docFile);
      if (content) {
        const safeFilename = node.docFile.replace(/[\/\\]/g, '__').replace(/\.htm$/i, '');
        fs.writeFileSync(
          path.join(OUTPUT_DIR, safeFilename + '.json'),
          JSON.stringify({ title: content.title || node.name, html: content.html, sourceFile: node.docFile }, null, 2),
          'utf8'
        );
        node.jsonFile = safeFilename;
        docCount++;
      } else {
        errorCount++;
      }
    } else {
      // Already processed, just reference the same file
      const safeFilename = node.docFile.replace(/[\/\\]/g, '__').replace(/\.htm$/i, '');
      node.jsonFile = safeFilename;
    }
  }

  if (node.children) {
    node.children.forEach(child => processNode(child, currentPath));
  }
}

menuTree.forEach(node => processNode(node));

// ===== Write menu TS file =====
const menuTs = `// Auto-generated from sys-admin/index.html - DO NOT EDIT MANUALLY
// Generated at: ${new Date().toISOString()}
// Source: D:\\\\博威\\\\项目\\\\ICS\\\\ArasDocs\\\\sys-admin\\\\index.html

export interface ArasDocNode {
  id: string
  name: string
  type: 'group' | 'subgroup' | 'item'
  path?: string
  docFile?: string
  jsonFile?: string
  children?: ArasDocNode[]
}

export const arasDocMenu: ArasDocNode[] = ${JSON.stringify(menuTree, null, 2)};
`;

fs.writeFileSync(MENU_OUTPUT, menuTs, 'utf8');

console.log('\n===== Extraction Complete =====');
console.log('Menu groups:', menuTree.length);
console.log('Documents extracted:', docCount);
console.log('Errors (missing files):', errorCount);
console.log('Unique files processed:', processedFiles.size);

