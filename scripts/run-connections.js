const { chromium } = require('playwright');
const path = require('path');

const baseUrl = 'https://calculadora.comandoconstrucciones.com';
const outDir = '/root/clawd/asistente/projects/comandocalc-docs/static/img/screenshots';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Processing connection...');
  try {
    await page.goto(`${baseUrl}/calc/connection`, { waitUntil: 'networkidle', timeout: 30000 });
    
    const submitBtn = page.locator('button', { hasText: 'Verificar' }).first();
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();
    
    await page.waitForTimeout(3000);

    const outFile = path.join(outDir, `connections.png`);
    await page.screenshot({ path: outFile, fullPage: true });
    console.log(`Saved ${outFile}`);
  } catch (e) {
    console.error(`Error processing connection:`, e.message);
  }

  await browser.close();
}

run();
