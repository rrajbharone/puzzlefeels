import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const artifactDir = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';

  // 1. Desktop 1280 Light & Dark
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/murdoku-online-game/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${artifactDir}/murdoku-desktop-1280-light.png`, fullPage: false });

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${artifactDir}/murdoku-desktop-1280-dark.png`, fullPage: false });
    await page.close();
  }

  // 2. Mobile 390 Light & Dark
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:4321/murdoku-online-game/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${artifactDir}/murdoku-mobile-390-light.png`, fullPage: false });

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${artifactDir}/murdoku-mobile-390-dark.png`, fullPage: false });
    await page.close();
  }

  // 3. Victory Modal Light & Dark
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/murdoku-online-game/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Solve Easy-1: Arthur at (1,1), Beatrice at (0,0), Cynthia at (2,3), Donald at (3,2)
    const people = page.locator('.tray-card');
    await people.nth(0).click();
    await page.locator('.grid-cell[data-row="1"][data-col="1"]').click();
    await people.nth(1).click();
    await page.locator('.grid-cell[data-row="0"][data-col="0"]').click();
    await people.nth(2).click();
    await page.locator('.grid-cell[data-row="2"][data-col="3"]').click();
    await people.nth(3).click();
    await page.locator('.grid-cell[data-row="3"][data-col="2"]').click();

    // Accuse Cynthia
    await page.locator('#accuse-select').selectOption('cynthia');
    await page.locator('#btn-accuse').click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${artifactDir}/murdoku-victory-modal-light.png` });

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${artifactDir}/murdoku-victory-modal-dark.png` });

    // Click "Inspect Crime Scene" to view the board in solved state
    await page.locator('#modal-close-btn').click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${artifactDir}/murdoku-solved-board-dark.png` });

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${artifactDir}/murdoku-solved-board-light.png` });

    await page.close();
  }

  await browser.close();
  console.log('Successfully captured all Murdoku screenshots!');
}

run().catch(console.error);
