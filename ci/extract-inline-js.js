#!/usr/bin/env node
/* Extract inline <script> blocks (no src attribute) from the repo's HTML
   pages into ci-extracted/<page>.inline.js so plain-JS tools (node --check,
   Semgrep, CodeQL) can analyze the code that actually ships in the pages.
   Deterministic: pages sorted, blocks joined with a marker comment. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'ci-extracted');
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
let total = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const blocks = [];
  const re = /<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) { if (m[1].trim()) blocks.push(m[1]); }
  if (!blocks.length) continue;
  const body = blocks.map((b, i) => '/* ===== ' + page + ' inline block ' + (i + 1) + ' ===== */\n' + b).join('\n');
  fs.writeFileSync(path.join(outDir, page.replace(/\.html$/, '') + '.inline.js'), body);
  total += blocks.length;
  console.log(page + ': ' + blocks.length + ' block(s)');
}
console.log('total inline blocks: ' + total);
