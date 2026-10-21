import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.DEPLOY_BASE ?? '/ecommerce-storefront-portfolio/';

const viteBin = resolve(root, 'node_modules/vite/bin/vite.js');
if (!existsSync(viteBin)) {
  console.error('vite is not installed — run `npm install` first.');
  process.exit(1);
}

console.log(`> building static site with base "${base}"`);
execFileSync(process.execPath, [viteBin, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    DEPLOY_BASE: base,
    VITE_ROUTER_BASENAME: base,
  },
});

const dist = resolve(root, 'dist');
const indexHtml = readFileSync(resolve(dist, 'index.html'), 'utf8');

const redirectScript = `<script>(function(){try{sessionStorage.setItem('portfolio:redirect',window.location.href);}catch(e){}window.location.replace('${base}');})();</script>`;

const notFoundHtml = indexHtml.includes('<head>')
  ? indexHtml.replace('<head>', `<head>\n    ${redirectScript}`)
  : `${redirectScript}\n${indexHtml}`;

writeFileSync(resolve(dist, '404.html'), notFoundHtml);
writeFileSync(resolve(dist, '.nojekyll'), '');
mkdirSync(dist, { recursive: true });

console.log('> wrote dist/404.html (SPA fallback) and dist/.nojekyll');
