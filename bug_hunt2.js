const { chromium } = require('playwright');
const BASE = 'https://calculadora.comandoconstrucciones.com';

const modules = [
  { id: 'beam',                path: '/calc/beam',               btnText: 'Calcular Viga' },
  { id: 'column',              path: '/calc/column',             btnText: 'Calcular' },
  { id: 'purlin',              path: '/calc/purlin',             btnText: 'Calcular' },
  { id: 'facade-purlin',       path: '/calc/facade-purlin',      btnText: 'Calcular' },
  { id: 'wind',                path: '/calc/wind',               btnText: 'Analizar Viento' },
  { id: 'baseplate',           path: '/calc/baseplate',          btnText: 'Diseñar Placa Base' },
  { id: 'truss',               path: '/calc/truss',              btnText: 'Calcular' },
  { id: 'frame',               path: '/calc/frame',              btnText: 'Calcular' },
  { id: 'connection',          path: '/calc/connection',         btnText: 'Verificar' },
  { id: 'vibration',           path: '/calc/vibration',          btnText: 'Analizar Vibraciones' },
  { id: 'steeldeck',           path: '/calc/steeldeck',          btnText: 'Evaluar Láminas' },
  { id: 'flexo-compression',   path: '/calc/flexo-compression',  btnText: 'Calcular' },
  { id: 'composite-column',    path: '/calc/composite-column',   btnText: 'Calcular' },
  { id: 'budget',              path: '/calc/budget',             btnText: 'Calcular Presupuesto' },
  { id: 'industrial-building', path: '/calc/industrial-building',btnText: 'Diseñar Nave Industrial' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const mod of modules) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const apiErrors = [];
    const jsErrors = [];

    page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
    page.on('response', r => {
      if (r.status() >= 400 && r.url().includes('/api/')) apiErrors.push(`${r.status()} ${r.url().split('/api')[1]}`);
    });

    try {
      await page.goto(`${BASE}${mod.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      
      // Try to find submit button by type first
      let btn = page.locator('button[type="submit"]').first();
      let found = await btn.count() > 0;
      if (!found) {
        btn = page.locator('button').filter({ hasText: mod.btnText }).first();
      }
      
      await btn.waitFor({ state: 'visible', timeout: 6000 });
      await btn.click();
      await page.waitForTimeout(4000);

      const text = await page.textContent('body');
      const uiError = text.toLowerCase().includes('error al') || text.includes('500') || text.includes('404');
      const hasResult = text.includes('OK') || text.includes('FALLA') || text.includes('kg') || text.includes('Fallback');
      const hasFallback = text.includes('Fallback');
      
      const filteredJs = jsErrors.filter(e => !e.includes('favicon') && !e.includes('net::ERR') && !e.includes('Failed to load resource'));

      let status = 'OK';
      if (apiErrors.length) status = 'API_ERR';
      else if (filteredJs.length) status = 'JS_ERR';
      else if (uiError) status = 'UI_ERR';
      else if (hasFallback) status = 'FALLBACK';
      else if (!hasResult) status = 'NO_RESULT';

      results.push({ id: mod.id, status, apiErrors, jsErrors: filteredJs, hasFallback });
    } catch (e) {
      results.push({ id: mod.id, status: 'BTN_NOT_FOUND', detail: e.message.slice(0,60), apiErrors, jsErrors });
    }
    await ctx.close();
  }

  await browser.close();

  console.log('\n=== REPORTE DE BUGS — ComandoCalc ===\n');
  for (const r of results) {
    const icon = {'OK':'✅','API_ERR':'❌','JS_ERR':'⚠️','UI_ERR':'🔴','FALLBACK':'🟡','NO_RESULT':'❓','BTN_NOT_FOUND':'🔍'}[r.status] || '?';
    const fb = r.hasFallback ? ' (usa fallback)' : '';
    console.log(`${icon} ${r.id.padEnd(22)} ${r.status}${fb}`);
    if (r.detail) console.log(`   ${r.detail}`);
    r.apiErrors.forEach(e => console.log(`   API: ${e}`));
    r.jsErrors.slice(0,1).forEach(e => console.log(`   JS: ${e.slice(0,100)}`));
  }
  const ok = results.filter(r => r.status === 'OK').length;
  const fallback = results.filter(r => r.status === 'FALLBACK').length;
  const errors = results.filter(r => !['OK','FALLBACK'].includes(r.status)).length;
  console.log(`\n${'─'.repeat(50)}\n✅ OK: ${ok} | 🟡 Fallback: ${fallback} | ❌ Errores: ${errors}`);
}

run();
