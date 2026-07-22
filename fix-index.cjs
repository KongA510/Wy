const fs = require('fs');
const path = require('path');
const base = 'D:\\博威\\项目\\ICS\\个人知识库\\node_modules\\@vue';
const packages = ['reactivity', 'shared', 'runtime-core', 'runtime-dom', 'compiler-core', 'compiler-dom', 'server-renderer'];
for (const pkg of packages) {
  const idx = path.join(base, pkg, 'index.js');
  const cjs = path.join(base, pkg, 'dist', pkg.split('-').pop() + '.cjs.js');
  if (!fs.existsSync(idx)) {
    // find the actual cjs file
    const distDir = path.join(base, pkg, 'dist');
    if (fs.existsSync(distDir)) {
      const files = fs.readdirSync(distDir);
      const cjsFile = files.find(f => f.endsWith('.cjs.js') && !f.includes('prod'));
      if (cjsFile) {
        fs.writeFileSync(idx, "'use strict';\nmodule.exports = require('./dist/" + cjsFile + "');\n");
        console.log('Created: ' + pkg + '/index.js -> ' + cjsFile);
      } else {
        console.log('No cjs file found for: ' + pkg);
      }
    }
  } else {
    console.log('Exists: ' + pkg + '/index.js');
  }
}
