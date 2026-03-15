const { chromium } = require('playwright');
const path = require('path');

const baseUrl = process.argv[2] || 'https://calculadora.comandoconstrucciones.com';
const outDir = path.join(__dirname, '../static/img/screenshots');

const modules = [
  { id: 'homepage', path: '/', action: 'wait_only' },
  { id: 'beam', path: '/calc/beam' },
  { id: 'column', path: '/calc/column' },
  { id: 'truss', path: '/calc/truss' },
  { id: 'frame', path: '/calc/frame' },
  { id: 'baseplate', path: '/calc/baseplate' },
  { id: 'purlin', path: '/calc/purlin' },
  { id: 'facade-purlin', path: '/calc/facade-purlin' },
  { id: 'wind', path: '/calc/wind' },
  { id: 'composite-column', path: '/calc/composite-column' },
  { id: 'connections', path: '/calc/connection', actionText: 'Verificar' },
  { id: 'vibration', path: '/calc/vibration' },
  { id: 'steeldeck', path: '/calc/steeldeck' },
  { id: 'flexo-compression', path: '/calc/flexo-compression' },
  { id: 'budget', path: '/calc/budget' },
  { id: 'perfiles', path: '/calc/perfiles', action: 'wait_only' },
  { id: 'normativa', path: '/normas', action: 'wait_only' },
  { id: 'industrial-building', path: '/calc/industrial-building', action: 'wait_only' }
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  for (const mod of modules) {
    console.log(`Processing ${mod.id}...`);
    try {
      await page.goto(`${baseUrl}${mod.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      
      if (mod.action !== 'wait_only') {
        const btnText = mod.actionText || 'Calcular';
        const btn = page.locator('button', { hasText: btnText }).first();
        await btn.waitFor({ state: 'visible', timeout: 5000 });
        await btn.click();
        
        // Wait for results to render
        await page.waitForTimeout(4000); 
      } else {
        await page.waitForTimeout(2000);
      }

      const outFile = path.join(outDir, `${mod.id}.png`);
      await page.screenshot({ path: outFile, fullPage: true });
      console.log(`Saved ${outFile}`);
    } catch (e) {
      console.error(`Error processing ${mod.id}:`, e.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run();
