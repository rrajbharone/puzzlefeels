import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';

async function main() {
  const browser = await chromium.launch();
  
  // 1. Desktop Light (1280x900)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    // Let's interact with a couple of cells: shade cell 0 and cell 1
    const cell0 = page.locator('.norinori-cell').nth(0);
    const cell1 = page.locator('.norinori-cell').nth(1);
    await cell0.click();
    await cell1.click();
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-desktop-1280-light.png'), fullPage: false });
    console.log('Saved norinori-desktop-1280-light.png');
    await page.close();
  }

  // 2. Desktop Dark (1280x900)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    // Toggle theme to dark
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
    // Shade cell 0 and cell 1
    const cell0 = page.locator('.norinori-cell').nth(0);
    const cell1 = page.locator('.norinori-cell').nth(1);
    await cell0.click();
    await cell1.click();
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-desktop-1280-dark.png'), fullPage: false });
    console.log('Saved norinori-desktop-1280-dark.png');
    await page.close();
  }

  // 3. Mobile Light (390x844)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-mobile-390-light.png'), fullPage: false });
    console.log('Saved norinori-mobile-390-light.png');
    await page.close();
  }

  // 4. Mobile Dark (390x844)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-mobile-390-dark.png'), fullPage: false });
    console.log('Saved norinori-mobile-390-dark.png');
    await page.close();
  }

  // 5. Desktop Zoom & Settings Popovers
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    // Open zoom popover
    await page.click('#btn-zoom-toggle');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-zoom-popover.png'), fullPage: false });
    console.log('Saved norinori-zoom-popover.png');

    // Open settings popover
    await page.click('#btn-settings-toggle');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-settings-popover.png'), fullPage: false });
    console.log('Saved norinori-settings-popover.png');
    await page.close();
  }

  // 6. Victory State Screenshot (Solve the puzzle using hint or automated solution)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:4321/norinori-game/', { waitUntil: 'networkidle' });
    // Trigger hint until solved or inject solution
    await page.evaluate(() => {
      const puzzle = window.__norinori_puzzle || window.NORINORI_PUZZLES;
      // Click hint repeatedly or click the cells according to the solution
      const cells = document.querySelectorAll('.norinori-cell');
      // Let's use the Hint button
      const hintBtn = document.getElementById('btn-hint');
      for (let i = 0; i < 40; i++) {
        hintBtn.click();
      }
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'norinori-victory-modal.png'), fullPage: false });
    console.log('Saved norinori-victory-modal.png');
    await page.close();
  }

  await browser.close();
}

main().catch(console.error);
