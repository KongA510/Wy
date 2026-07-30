const { chromium } = require('C:\\Users\\25748\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright');
(async () => {
  const br = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await br.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await pg.waitForTimeout(1200);
  await pg.fill('input[placeholder="请输入账号"]', 'kong.A');
  await pg.fill('input[placeholder="请输入密码"]', 'XwXy51020');
  await pg.click('button:has-text("登 录")');
  await pg.waitForTimeout(1800);
  const r = await pg.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('.VPNavBarMenu a')).map(a => a.textContent.trim());
    const sb = document.querySelector('.VPSidebar');
    const sbText = sb ? sb.textContent : '';
    // indent check: level-0 link left vs level-1 link left
    const l0 = sb && sb.querySelector('.VPSidebarItem.level-0.is-link .link');
    const l1 = sb && sb.querySelector('.VPSidebarItem.level-1.is-link .link');
    const indent = (l0 && l1) ? Math.round(l1.getBoundingClientRect().left - l0.getBoundingClientRect().left) : null;
    const itemsPad = (() => { const it = sb && sb.querySelector('.VPSidebarItem.level-0 > .items'); return it ? getComputedStyle(it).paddingLeft : 'NO .items'; })();
    // is 祥记 a leaf link (no caret / no nested 接口)?
    const xiangji = sb && Array.from(sb.querySelectorAll('.VPSidebarItem.level-1')).find(el => el.textContent.includes('祥记'));
    const xiangjiIsLink = xiangji ? xiangji.classList.contains('is-link') : null;
    const xiangjiHasCaret = xiangji ? !!xiangji.querySelector('.caret') : null;
    return {
      navLinks,
      hasDevIcon: sbText.includes('🧠'), hasXjIcon: sbText.includes('🏭'),
      hasFeIcon: sbText.includes('🎨'), hasBeIcon: sbText.includes('🗄️'), hasDailyIcon: sbText.includes('📔'),
      hasPmIcon: sbText.includes('📊'),
      noThirdLevel: !sbText.includes('获取物料分类') && !sbText.includes('BOM 核心服务'),
      indentPx: indent, itemsPaddingLeft: itemsPad,
      xiangjiIsLink, xiangjiHasCaret
    };
  });
  console.log('NAV:', JSON.stringify(r.navLinks));
  console.log('icons dev/xj/fe/be/daily/pm:', r.hasDevIcon, r.hasXjIcon, r.hasFeIcon, r.hasBeIcon, r.hasDailyIcon, r.hasPmIcon);
  console.log('home tree NO 3rd level:', r.noThirdLevel);
  console.log('indent level1-level0 (px):', r.indentPx, '| .items padding-left:', r.itemsPaddingLeft);
  console.log('祥记 is leaf link:', r.xiangjiIsLink, '| has caret:', r.xiangjiHasCaret);
  await pg.screenshot({ path: 'D:\\\\博威\\\\项目\\\\ICS\\\\个人知识库\\\\.vp_indent.png', fullPage: false });
  console.log('screenshot saved');
  await br.close();
})().catch(e => { console.error(e); process.exit(1); });
