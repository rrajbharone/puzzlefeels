import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/games/');

  const hoCard = page.locator('a[href="/hidden-object-game/"]');
  const styles = await hoCard.evaluate(el => {
    const visual = el.querySelector('.directory-visual');
    const spans = Array.from(el.querySelectorAll('.directory-icon span')).map(s => ({
      bg: getComputedStyle(s).backgroundColor,
      color: getComputedStyle(s).color
    }));
    return {
      visualBg: getComputedStyle(visual).backgroundImage,
      spans
    };
  });
  console.log('HO styles:', JSON.stringify(styles, null, 2));

  const spotCard = page.locator('a[href="/spot-the-difference-game/"]');
  const spotStyles = await spotCard.evaluate(el => {
    const spans = Array.from(el.querySelectorAll('.directory-icon span')).map(s => ({
      bg: getComputedStyle(s).backgroundColor,
      color: getComputedStyle(s).color
    }));
    return { spans };
  });
  console.log('Spot styles:', JSON.stringify(spotStyles, null, 2));

  await browser.close();
})();
