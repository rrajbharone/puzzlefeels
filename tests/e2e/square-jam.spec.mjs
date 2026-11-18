import { expect, test } from '@playwright/test';

test.describe('Square Jam – Online Logic Puzzle Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (sessionStorage.getItem('__square_jam_e2e_init') !== 'yes') {
        localStorage.clear();
        localStorage.setItem('puzzlefeels-theme', 'light');
        sessionStorage.setItem('__square_jam_e2e_init', 'yes');
      }
    });
  });

  test('Page loads with correct SEO metadata, H1, breadcrumbs, and JSON-LD schemas', async ({ page }) => {
    const response = await page.goto('/square-jam-puzzle/');
    expect(response?.status()).toBe(200);

    // H1 and Title
    await expect(page.locator('main h1')).toHaveText('Square Jam – Free Online Logic Puzzle Game');
    await expect(page).toHaveTitle('Square Jam Puzzle – Play Free Online Logic Game | PuzzleFeels');

    // Canonical
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://puzzlefeels.com/square-jam-puzzle/'
    );

    // Meta description exact length 145-160 chars
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc?.length).toBeGreaterThanOrEqual(145);
    expect(metaDesc?.length).toBeLessThanOrEqual(160);
    expect(metaDesc).toContain('Square Jam');

    // Breadcrumbs
    const breadcrumbs = page.locator('.jam-breadcrumbs a');
    await expect(breadcrumbs.nth(0)).toHaveAttribute('href', '/');
    await expect(breadcrumbs.nth(0)).toHaveText('Home');
    await expect(breadcrumbs.nth(1)).toHaveAttribute('href', '/games/');
    await expect(breadcrumbs.nth(1)).toHaveText('Games');
    await expect(page.locator('.jam-breadcrumbs [aria-current="page"]')).toHaveText(
      'Square Jam – Online Logic Puzzle'
    );

    // JSON-LD Structured Data
    const schemas = await page.locator('script[type="application/ld+json"]').all();
    expect(schemas.length).toBeGreaterThanOrEqual(3);

    const schemaTexts = await Promise.all(schemas.map((s) => s.textContent()));
    const parsedSchemas = schemaTexts.map((txt) => JSON.parse(txt || '{}'));

    const gameSchema = parsedSchemas.find((s) => s['@type'] === 'VideoGame');
    expect(gameSchema).toBeDefined();
    expect(gameSchema?.name).toBe('Square Jam – Online Logic Puzzle');
    expect(gameSchema?.url).toBe('https://puzzlefeels.com/square-jam-puzzle/');

    const breadcrumbSchema = parsedSchemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema?.itemListElement?.length).toBe(3);

    const faqSchema = parsedSchemas.find((s) => s['@type'] === 'FAQPage');
    expect(faqSchema).toBeDefined();
    expect(faqSchema?.mainEntity?.length).toBe(9);
  });

  test('Difficulty selection switches board configurations correctly', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    // Initial default: Easy (5x5 or 6x6)
    const easyBtn = page.locator('.jam-diff-btn[data-difficulty="easy"]');
    await expect(easyBtn).toHaveClass(/is-active/);
    const initialCellCount = await page.locator('.jam-cell').count();
    expect(initialCellCount).toBeGreaterThanOrEqual(25);

    // Switch to Medium
    const medBtn = page.locator('.jam-diff-btn[data-difficulty="medium"]');
    await medBtn.click();
    await expect(medBtn).toHaveClass(/is-active/);
    const medCellCount = await page.locator('.jam-cell').count();
    expect(medCellCount).toBeGreaterThanOrEqual(49);

    // Switch to Hard
    const hardBtn = page.locator('.jam-diff-btn[data-difficulty="hard"]');
    await hardBtn.click();
    await expect(hardBtn).toHaveClass(/is-active/);
    const hardCellCount = await page.locator('.jam-cell').count();
    expect(hardCellCount).toBeGreaterThanOrEqual(81);

    // Switch to Daily
    const dailyBtn = page.locator('.jam-diff-btn[data-difficulty="daily"]');
    await dailyBtn.click();
    await expect(dailyBtn).toHaveClass(/is-active/);
    const dailyCellCount = await page.locator('.jam-cell').count();
    expect(dailyCellCount).toBeGreaterThanOrEqual(25);
  });

  test('Interactive board allows placing squares and updates moves/coverage', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    const coverageEl = page.locator('#jam-coverage');
    const movesEl = page.locator('#jam-moves');

    await expect(coverageEl).toContainText('0 /');
    await expect(movesEl).toHaveText('0');

    // Tap cell (0,0) to select anchor
    const cell00 = page.locator('.jam-cell[data-r="0"][data-c="0"]');
    await cell00.click();
    await expect(cell00).toHaveClass(/is-anchor-start/);

    // Tap cell (1,1) to complete a 2x2 square
    const cell11 = page.locator('.jam-cell[data-r="1"][data-c="1"]');
    await cell11.click();

    // Now moves should be 1 and coverage should be 4 / total
    await expect(movesEl).toHaveText('1');
    await expect(coverageEl).toContainText('4 /');

    // Click Undo
    const undoBtn = page.locator('#jam-undo-btn');
    await undoBtn.click();
    await expect(coverageEl).toContainText('0 /');
  });

  test('ZoomControl operates smoothly on the board', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    const zoomWrapper = page.locator('.zoom-popover-wrapper');
    await expect(zoomWrapper).toBeVisible();

    // Open zoom popover
    await zoomWrapper.locator('.zoom-toggle-btn').click();
    const popover = zoomWrapper.locator('.zoom-popover');
    await expect(popover).toBeVisible();

    // Click Zoom In
    await popover.locator('.btn-zoom-in').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('115%');

    // Reset zoom
    await popover.locator('.btn-zoom-reset').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('100%');
  });

  test('Sound toggle, Pause/Resume, and Reset work properly', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    // Sound toggle
    const soundBtn = page.locator('#jam-sound-toggle');
    const soundLabel = soundBtn.locator('.sound-status-label');
    await expect(soundLabel).toHaveText('Sound On');

    await soundBtn.click();
    await expect(soundLabel).toHaveText('Sound Off');

    await soundBtn.click();
    await expect(soundLabel).toHaveText('Sound On');

    // Pause / Resume
    const pauseBtn = page.locator('#jam-pause-btn');
    await pauseBtn.click();
    const pauseOverlay = page.locator('#jam-paused');
    await expect(pauseOverlay).not.toHaveAttribute('hidden');

    const resumeBtn = page.locator('#jam-resume');
    await resumeBtn.click();
    await expect(pauseOverlay).toHaveAttribute('hidden', '');

    // Reset button
    const restartBtn = page.locator('#jam-restart-btn');
    await restartBtn.click();
    await expect(page.locator('#jam-moves')).toHaveText('0');
  });

  test('Mobile responsive layout has zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 430, height: 932 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/square-jam-puzzle/');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `Overflow detected at ${vp.width}x${vp.height}`).toBe(false);
    }
  });

  test('Explore More section displays exactly 3 related games excluding current game', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    const relatedSection = page.locator('.related-games-section');
    await expect(relatedSection).toBeVisible();
    await expect(relatedSection.locator('h2')).toHaveText('Explore More Puzzle Games');
    await expect(relatedSection.locator('.related-games-head p')).toContainText(
      'Challenge your mind with our curated collection of free, high-focus browser puzzle games.'
    );

    const cards = relatedSection.locator('.related-card');
    await expect(cards).toHaveCount(3);

    const hrefs = await cards.evaluateAll((list) => list.map((c) => c.getAttribute('href')));
    expect(hrefs.length).toBe(3);
    expect(hrefs).not.toContain('/square-jam-puzzle/');
  });

  test('All 9 FAQ accordion items expand and collapse correctly', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');

    const faqItems = page.locator('.faq-list details');
    await expect(faqItems).toHaveCount(9);

    const firstSummary = faqItems.first().locator('summary');
    await expect(faqItems.first()).not.toHaveAttribute('open');

    await firstSummary.click();
    await expect(faqItems.first()).toHaveAttribute('open');

    await firstSummary.click();
    await expect(faqItems.first()).not.toHaveAttribute('open');
  });

  test('Grid lines and cell contrast render correctly in both light and dark modes', async ({ page }) => {
    await page.goto('/square-jam-puzzle/');
    await page.waitForSelector('.jam-cell');

    // 1. Light Mode Verification
    const firstCell = page.locator('.jam-cell').first();
    const lightCellStyles = await firstCell.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        bg: s.backgroundColor,
        borderColor: s.borderColor,
        borderWidth: s.borderWidth,
        borderStyle: s.borderStyle,
        color: s.color,
      };
    });

    expect(lightCellStyles.bg).toBe('rgb(239, 239, 239)');
    expect(lightCellStyles.borderColor).toBe('rgb(118, 118, 118)');
    expect(lightCellStyles.borderWidth).toBe('1px');
    expect(lightCellStyles.borderStyle).toBe('solid');
    expect(lightCellStyles.color).toBe('rgb(15, 23, 42)');

    // Outer grid border in light mode
    const lightGridBorder = await page.locator('.jam-grid').evaluate((el) => {
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
        bg: s.backgroundColor,
        borderColor: s.borderColor,
        borderWidth: s.borderWidth,
        borderStyle: s.borderStyle,
        color: s.color,
      };
    });

    expect(darkCellStyles.bg).toBe('rgb(21, 31, 61)'); // #151f3d
    expect(darkCellStyles.borderColor).toBe('rgb(74, 98, 150)'); // #4a6296 (clearly visible grid lines)
    expect(darkCellStyles.borderWidth).toBe('1px');
    expect(darkCellStyles.borderStyle).toBe('solid');
    expect(darkCellStyles.color).toBe('rgb(241, 245, 255)'); // #f1f5ff (high contrast clue text)

    // Outer grid border in dark mode
    const darkGridBorder = await page.locator('.jam-grid').evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderWidth: s.borderWidth,
        borderColor: s.borderColor,
      };
    });
    expect(darkGridBorder.borderWidth).toBe('3px');
    expect(darkGridBorder.borderColor).toBe('rgb(71, 85, 105)'); // #475569

    // 3. Place a square in Dark Mode and verify region border distinction
    await page.locator('.jam-cell[data-r="0"][data-c="0"]').click();
    await page.locator('.jam-cell[data-r="1"][data-c="1"]').click();

    const placedCellTopLeft = await page.locator('.jam-cell[data-r="0"][data-c="0"]').evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderTopWidth: s.borderTopWidth,
        borderTopColor: s.borderTopColor,
        borderLeftWidth: s.borderLeftWidth,
        borderLeftColor: s.borderLeftColor,
        borderRightWidth: s.borderRightWidth,
        borderRightColor: s.borderRightColor,
        borderBottomWidth: s.borderBottomWidth,
        borderBottomColor: s.borderBottomColor,
      };
    });
    // Outer perimeter has 3px solid #93c5fd
    expect(placedCellTopLeft.borderTopWidth).toBe('3px');
    expect(placedCellTopLeft.borderTopColor).toBe('rgb(147, 197, 253)'); // #93c5fd
    expect(placedCellTopLeft.borderLeftWidth).toBe('3px');
    expect(placedCellTopLeft.borderLeftColor).toBe('rgb(147, 197, 253)');
    // Inner boundaries between cells in the square have 1px solid #4a6296
    expect(placedCellTopLeft.borderRightWidth).toBe('1px');
    expect(placedCellTopLeft.borderRightColor).toBe('rgb(74, 98, 150)');
    expect(placedCellTopLeft.borderBottomWidth).toBe('1px');
    expect(placedCellTopLeft.borderBottomColor).toBe('rgb(74, 98, 150)');

    // 4. Toggle back to Light Mode immediately
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    const toggledLightCell = await firstCell.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        borderTopColor: s.borderTopColor,
        borderRightColor: s.borderRightColor,
      };
    });
    // Outer perimeter changes to #1e40af (rgb(30, 64, 175)), inner grid line returns to #767676 (rgb(118, 118, 118))
    expect(toggledLightCell.borderTopColor).toBe('rgb(30, 64, 175)');
    expect(toggledLightCell.borderRightColor).toBe('rgb(118, 118, 118)');
  });
});
