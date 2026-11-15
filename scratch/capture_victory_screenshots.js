import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:4321/murdoku-online-game/');
  const people = page.locator('.tray-card');
  await people.nth(0).click();
  await page.locator('.grid-cell[data-row="1"][data-col="1"]').click();
  await people.nth(1).click();
  await page.locator('.grid-cell[data-row="0"][data-col="0"]').click();
  await people.nth(2).click();
  await page.locator('.grid-cell[data-row="2"][data-col="3"]').click();
  await people.nth(3).click();
  await page.locator('.grid-cell[data-row="3"][data-col="2"]').click();
  await page.locator('#accuse-select').selectOption('cynthia');
  await page.locator('#btn-accuse').click();
  await page.waitForTimeout(400);

  const artifactDir = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';
  await page.screenshot({ path: `${artifactDir}/murdoku-victory-modal-light.png` });

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${artifactDir}/murdoku-victory-modal-dark.png` });

  await browser.close();
  console.log('Saved victory modal screenshots!');
}

run();
