const fs = require('fs');
const path = 'D:\\博威\\项目\\ICS\\个人知识库\\node_modules\\@vue\\reactivity';

// Read the ESM bundler file and create a CJS wrapper
const esmContent = fs.readFileSync(path + '\\dist\\reactivity.esm-bundler.js', 'utf8');

// Simple ESM to CJS conversion for this specific file
// The esm-bundler file uses export { ... } and import from @vue/shared
let cjsContent = esmContent
  .replace(/import\s*\{([^}]+)\}\s*from\s*['"]@vue\/shared['"];?/g, (match, imports) => {
    const names = imports.split(',').map(s => s.trim()).filter(Boolean);
    const destructure = names.map(n => {
      const parts = n.split(/\s+as\s+/);
      return parts.length > 1 ? parts[0].trim() + ': ' + parts[1].trim() : n;
    }).join(', ');
    return 'const { ' + destructure + ' } = require("@vue/shared");';
  })
  .replace(/export\s*\{([^}]+)\};?\s*$/gm, (match, exports) => {
    const names = exports.split(',').map(s => s.trim()).filter(Boolean);
    return names.map(n => {
      const parts = n.split(/\s+as\s+/);
      if (parts.length > 1) {
        return 'exports.' + parts[1].trim() + ' = ' + parts[0].trim() + ';';
      }
      return 'exports.' + n + ' = ' + n + ';';
    }).join('\n');
  });

fs.writeFileSync(path + '\\index.js', cjsContent);
console.log('Created reactivity/index.js');

// Also create the cjs.js and cjs.prod.js that the exports field references
fs.writeFileSync(path + '\\dist\\reactivity.cjs.js', cjsContent);
fs.writeFileSync(path + '\\dist\\reactivity.cjs.prod.js', cjsContent);
console.log('Created reactivity CJS dist files');
