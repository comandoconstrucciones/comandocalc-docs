const { chromium } = require('playwright');

const BASE = 'https://calculadora.comandoconstrucciones.com';

const modules = [
  { id: 'beam',                path: '/calc/beam' },
  { id: 'column',              path: '/calc/column' },
  { id: 'purlin',              path: '/calc/purlin' },
  { id: 'facade-purlin',       path: '/calc/facade-purlin' },
  { id: 'wind',                path: '/calc/wind' },
  { id: 'baseplate',           path: '/calc/baseplate' },
  { id: 'truss',               path: '/calc/truss' },
  { id: 'frame',               path: '/calc/frame' },
  { id: 'connection',          path: '/calc/connection', actionText: 'Verificar' },
  { id: 'vibration',           path: '/calc/vibration' },
  { id: 'steeldeck',           path: '/calc/steeldeck' },
  { id: 'flexo-compression',   path: '/calc/flexo-compression' },
  { id: 'composite-column',    path: '/calc/composite-column' },
  { id: 'budget',              path: '/calc/budget' },
  { id: 'industrial-building', path: '/calc/industrial-building', actionText: 'Diseñar Nave Industrial' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const mod of modules) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    const consoleErrors = [];
    const networkErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', r => {
      if (r.status() >= 400 && r.url().includes('/api/')) networkErrors.push(`${r.status()} ${r.url()}`);
    });

    try {
      await page.goto(`${BASE}${mod.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      
      const btnText = mod.actionText || 'Calcular';
      const btn = page.locator('button').filter({ hasText: btnText }).first();
      await btn.waitFor({ state: 'visible', timeout: 6000 });
      await btn.click();
      await page.waitForTimeout(4000);

      const pageText = await page.textContent('body');
      const hasError = pageText.includes('Error') || pageText.includes('error') || networkErrors.length > 0;
      const hasResults = pageText.includes('OK') || pageText.includes('FALLA') || pageText.includes('kg') || pageText.includes('Verificación');

      const jsErrs = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('net::ERR'));

      results.push({
        id: mod.id,
        status: networkErrors.length > 0 ? 'API_ERR' : jsErrs.length > 0 ? 'JS_ERR' : hasResults ? 'OK' : 'NO_RESULT',
        networkErrors: networkErrors.slice(-3),
        consoleErrors: jsErrs.slice(-2),
      });
    } catch (e) {
      results.push({ id: mod.id, status: `CRASH`, detail: e.message.slice(0,80), networkErrors, consoleErrors: consoleErrors.filter(e => !e.includes('favicon')) });
    }

    await context.close();
  }

  await browser.close();

  console.log('\n REPORTE DE BUGS — ComandoCalc\n' + '='.repeat(60));
  for (const r of results) {
    const icon = r.status === 'OK' ? '✅' : r.status === 'CRASH' ? '💥' : r.status === 'API_ERR' ? '❌' : r.status === 'JS_ERR' ? '⚠️' : '❓';
    console.log(`${icon} ${r.status.padEnd(12)} ${r.id}`);
    if (r.detail) console.log(`             ${r.detail}`);
    if (r.networkErrors.length) r.networkErrors.forEach(e => console.log(`             API: ${e}`));
    if (r.consoleErrors.length) r.consoleErrors.forEach(e => console.log(`             JS:  ${e.slice(0,120)}`));
  }
  
  const issues = results.filter(r => r.status !== 'OK');
  console.log(`\n${'='.repeat(60)}\nTotal: ${results.length} módulos | Bugs: ${issues.length} | OK: ${results.length - issues.length}`);
}

run();
// Quick check what buttons exist on beam and wind
