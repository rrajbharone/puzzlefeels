import { expect, test } from '@playwright/test';

test.describe('Binairo – Online Puzzle Game E2E Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (sessionStorage.getItem('__binairo_e2e_init') !== 'yes') {
        localStorage.clear();
        localStorage.setItem('puzzlefeels-theme', 'light');
        sessionStorage.setItem('__binairo_e2e_init', 'yes');
      }
    });
  });

  test('Page loads with correct SEO metadata, H1, breadcrumbs, and JSON-LD schemas', async ({ page }) => {
    const response = await page.goto('/binairo-online-puzzle-game/');
    expect(response?.status()).toBe(200);

    // H1 and Title
    await expect(page.locator('main h1')).toHaveText('Binairo – Online Puzzle Game');
    await expect(page).toHaveTitle('Binairo – Online Puzzle Game | Play Free Binary Logic Puzzles | PuzzleFeels');

    // Canonical link
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://puzzlefeels.com/binairo-online-puzzle-game/'
    );

    // Meta description exact length 145-160 chars
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc?.length).toBeGreaterThanOrEqual(145);
    expect(metaDesc?.length).toBeLessThanOrEqual(160);
    expect(metaDesc).toContain('Binairo');

    // Breadcrumbs
    const breadcrumbs = page.locator('.binairo-breadcrumbs a');
    await expect(breadcrumbs.nth(0)).toHaveAttribute('href', '/');
    await expect(breadcrumbs.nth(0)).toHaveText('Home');
    await expect(breadcrumbs.nth(1)).toHaveAttribute('href', '/games/');
    await expect(breadcrumbs.nth(1)).toHaveText('Games');
    await expect(page.locator('.binairo-breadcrumbs [aria-current="page"]')).toHaveText(
      'Binairo – Online Puzzle Game'
    );

    // JSON-LD Structured Data
    const schemas = await page.locator('script[type="application/ld+json"]').all();
    expect(schemas.length).toBeGreaterThanOrEqual(3);

    const schemaTexts = await Promise.all(schemas.map((s) => s.textContent()));
    const parsedSchemas = schemaTexts.map((txt) => JSON.parse(txt || '{}'));

    const gameSchema = parsedSchemas.find((s) => s['@type'] === 'VideoGame');
    expect(gameSchema).toBeDefined();
    expect(gameSchema?.name).toBe('Binairo – Online Puzzle Game');
    expect(gameSchema?.url).toBe('https://puzzlefeels.com/binairo-online-puzzle-game/');

    const breadcrumbSchema = parsedSchemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema?.itemListElement?.length).toBe(3);

    const faqSchema = parsedSchemas.find((s) => s['@type'] === 'FAQPage');
    expect(faqSchema).toBeDefined();
    expect(faqSchema?.mainEntity?.length).toBe(10);
  });

  test('Difficulty selector switches board configurations accurately', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    // Initial default: Easy (6x6 = 36 cells)
    const easyBtn = page.locator('.binairo-diff-btn[data-difficulty="easy"]');
    await expect(easyBtn).toHaveClass(/is-active/);
    const initialCellCount = await page.locator('.binairo-cell').count();
    expect(initialCellCount).toBe(36);
    await expect(page.locator('#binairo-filled')).toContainText('/ 36');

    // Switch to Medium (8x8 = 64 cells)
    const medBtn = page.locator('.binairo-diff-btn[data-difficulty="medium"]');
    await medBtn.click();
    await expect(medBtn).toHaveClass(/is-active/);
    const medCellCount = await page.locator('.binairo-cell').count();
    expect(medCellCount).toBe(64);
    await expect(page.locator('#binairo-filled')).toContainText('/ 64');

    // Switch to Hard (10x10 = 100 cells)
    const hardBtn = page.locator('.binairo-diff-btn[data-difficulty="hard"]');
    await hardBtn.click();
    await expect(hardBtn).toHaveClass(/is-active/);
    const hardCellCount = await page.locator('.binairo-cell').count();
    expect(hardCellCount).toBe(100);
    await expect(page.locator('#binairo-filled')).toContainText('/ 100');

    // Switch to Daily
    const dailyBtn = page.locator('.binairo-diff-btn[data-difficulty="daily"]');
    await dailyBtn.click();
    await expect(dailyBtn).toHaveClass(/is-active/);
    const dailyCellCount = await page.locator('.binairo-cell').count();
    expect(dailyCellCount).toBeGreaterThanOrEqual(36);
  });

  test('Interactive board allows cycling cells and direct digit input', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    // Find the first empty cell
    const emptyCell = page.locator('.binairo-cell:not(.is-given)').first();
    await expect(emptyCell).toBeVisible();

    const movesEl = page.locator('#binairo-moves');
    await expect(movesEl).toHaveText('0');

    // Click 1: cycles from empty to 0
    await emptyCell.click();
    await expect(emptyCell.locator('.token-0')).toBeVisible();
    await expect(movesEl).toHaveText('1');

    // Click 2: cycles from 0 to 1
    await emptyCell.click();
    await expect(emptyCell.locator('.token-1')).toBeVisible();
    await expect(movesEl).toHaveText('2');

    // Click 3: cycles from 1 to empty
    await emptyCell.click();
    await expect(emptyCell.locator('.binairo-token')).toHaveCount(0);
    await expect(movesEl).toHaveText('3');

    // Test Undo
    const undoBtn = page.locator('#binairo-undo-btn');
    await undoBtn.click();
    await expect(emptyCell.locator('.token-1')).toBeVisible();

    // Test Redo
    const redoBtn = page.locator('#binairo-redo-btn');
    await redoBtn.click();
    await expect(emptyCell.locator('.binairo-token')).toHaveCount(0);

    // Test Quick Input Selector
    await emptyCell.click(); // selects cell and sets to 0
    await page.locator('#binairo-set-1').click(); // changes to 1
    await expect(emptyCell.locator('.token-1')).toBeVisible();

    await page.locator('#binairo-set-0').click(); // changes to 0
    await expect(emptyCell.locator('.token-0')).toBeVisible();

    await page.locator('#binairo-set-clear').click(); // clears cell
    await expect(emptyCell.locator('.binairo-token')).toHaveCount(0);
  });

  test('Original clues cannot be edited or erased', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    const givenCell = page.locator('.binairo-cell.is-given').first();
    await expect(givenCell).toBeVisible();

    const originalText = await givenCell.textContent();
    const movesEl = page.locator('#binairo-moves');

    // Click given cell
    await givenCell.click();
    expect(await givenCell.textContent()).toBe(originalText);
    await expect(movesEl).toHaveText('0');

    // Try erase button
    await page.locator('#binairo-set-clear').click();
    expect(await givenCell.textContent()).toBe(originalText);
  });

  test('Step-by-step Hint and Check Progress work properly', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    // Click Hint
    const hintBtn = page.locator('#binairo-hint-btn');
    await hintBtn.click();

    // Toast alert appears explaining the deduction
    const toast = page.locator('#binairo-toast');
    await expect(toast).not.toHaveAttribute('hidden');
    const toastText = await toast.textContent();
    expect(toastText).toBeTruthy();
    expect(toastText?.length).toBeGreaterThan(10);

    // Check Progress
    const checkBtn = page.locator('#binairo-check-btn');
    await checkBtn.click();
    await expect(toast).not.toHaveAttribute('hidden');
  });

  test('ZoomControl operates smoothly on the board', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    const zoomWrapper = page.locator('.zoom-popover-wrapper');
    await expect(zoomWrapper).toBeVisible();

    // Open zoom popover
    await zoomWrapper.locator('.zoom-toggle-btn').click();
    const popover = zoomWrapper.locator('.zoom-popover');
    await expect(popover).toBeVisible();

    // Zoom in
    await popover.locator('.btn-zoom-in').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('115%');

    // Reset zoom
    await popover.locator('.btn-zoom-reset').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('100%');
  });

  test('Sound toggle, Pause/Resume, and Reset work properly', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    // Sound toggle
    const soundBtn = page.locator('#binairo-sound-toggle');
    const soundLabel = soundBtn.locator('.sound-status-label');
    await expect(soundLabel).toHaveText('Sound On');

    await soundBtn.click();
    await expect(soundLabel).toHaveText('Sound Off');

    await soundBtn.click();
    await expect(soundLabel).toHaveText('Sound On');

    // Pause / Resume
    const pauseBtn = page.locator('#binairo-pause-btn');
    await pauseBtn.click();
    const pauseOverlay = page.locator('#binairo-paused');
    await expect(pauseOverlay).not.toHaveAttribute('hidden');

    const resumeBtn = page.locator('#binairo-resume');
    await resumeBtn.click();
    await expect(pauseOverlay).toHaveAttribute('hidden', '');
  });

  test('Mobile responsive layout has zero horizontal overflow across viewports', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 360, height: 740 },
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 414, height: 896 },
      { width: 430, height: 932 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/binairo-online-puzzle-game/');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `Overflow detected at ${vp.width}x${vp.height}`).toBe(false);
    }
  });

  test('Grid lines and circle token contrast render correctly in both light and dark modes', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');
    await page.waitForSelector('.binairo-cell');

    // 1. Light Mode Verification
    const firstCell = page.locator('.binairo-cell').first();
    const lightCellStyles = await firstCell.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        bg: s.backgroundColor,
        borderColor: s.borderColor,
        borderWidth: s.borderWidth,
        borderStyle: s.borderStyle,
      };
    });

    expect(lightCellStyles.borderColor).toBe('rgb(148, 163, 184)'); // #94a3b8
    expect(lightCellStyles.borderWidth).toBe('1px');
    expect(lightCellStyles.borderStyle).toBe('solid');

    // Outer grid border in light mode
    const lightGridBorder = await page.locator('.binairo-grid').evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderWidth: s.borderWidth,
        borderColor: s.borderColor,
      };
    });
    expect(lightGridBorder.borderWidth).toBe('3px');
    expect(lightGridBorder.borderColor).toBe('rgb(51, 65, 85)'); // #334155

    // 2. Toggle to Dark Mode
    const toggle = page.getByRole('switch');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Dark Mode Verification
    const darkCellStyles = await firstCell.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderColor: s.borderColor,
        borderWidth: s.borderWidth,
        borderStyle: s.borderStyle,
      };
    });

    expect(darkCellStyles.borderColor).toBe('rgb(74, 98, 150)'); // #4a6296 (crisp, clearly visible grid lines)
    expect(darkCellStyles.borderWidth).toBe('1px');
    expect(darkCellStyles.borderStyle).toBe('solid');

    // Outer grid border in dark mode
    const darkGridBorder = await page.locator('.binairo-grid').evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderWidth: s.borderWidth,
        borderColor: s.borderColor,
      };
    });
    expect(darkGridBorder.borderWidth).toBe('3px');
    expect(darkGridBorder.borderColor).toBe('rgb(71, 85, 105)'); // #475569

    // Toggle back to Light Mode
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('Explore More section displays exactly 3 related games excluding current game', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    const relatedSection = page.locator('.related-games-section');
    await expect(relatedSection).toBeVisible();
    await expect(relatedSection.locator('h2')).toHaveText('Explore More Puzzle Games');

    const cards = relatedSection.locator('.related-card');
    await expect(cards).toHaveCount(3);

    const hrefs = await cards.evaluateAll((list) => list.map((c) => c.getAttribute('href')));
    expect(hrefs.length).toBe(3);
    expect(hrefs).not.toContain('/binairo-online-puzzle-game/');
  });

  test('All 10 FAQ accordion items expand and collapse correctly', async ({ page }) => {
    await page.goto('/binairo-online-puzzle-game/');

    const faqItems = page.locator('.faq-list details');
    await expect(faqItems).toHaveCount(10);

    const firstSummary = faqItems.first().locator('summary');
    await expect(faqItems.first()).not.toHaveAttribute('open');

    await firstSummary.click();
    await expect(faqItems.first()).toHaveAttribute('open');

    await firstSummary.click();
    await expect(faqItems.first()).not.toHaveAttribute('open');
  });

  test('All Games directory (/games/) displays Binairo and search filter finds it', async ({ page }) => {
    await page.goto('/games/');

    const binairoCard = page.locator('.directory-card[href="/binairo-online-puzzle-game/"]');
    await expect(binairoCard).toBeVisible();
    await expect(binairoCard.locator('h3')).toHaveText('Binairo – Online Puzzle Game');

    // Test search filter
    const searchInput = page.locator('#game-search-input');
    await searchInput.fill('takuzu');
    await expect(binairoCard).toBeVisible();

    await searchInput.fill('binairo');
    await expect(binairoCard).toBeVisible();

    await searchInput.fill('xyznonexistent');
    await expect(binairoCard).toBeHidden();
  });
});
