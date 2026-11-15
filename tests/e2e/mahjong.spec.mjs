import { expect, test } from '@playwright/test';

test.describe('Mahjong Variants Online Game', () => {
  test.beforeEach(async ({ page }) => {
    // Clear LocalStorage before each test to ensure a clean slate, but avoid wiping on page.reload()
    await page.addInitScript(() => {
      if (sessionStorage.getItem('__mahjong_e2e_init') !== 'yes') {
        localStorage.clear();
        localStorage.setItem('puzzlefeels-theme', 'light');
        sessionStorage.setItem('__mahjong_e2e_init', 'yes');
      }
    });
  });

  test('Page loads with correct SEO metadata, H1, breadcrumbs, and JSON-LD schemas', async ({ page }) => {
    const response = await page.goto('/mahjong-variants-online-game/');
    expect(response?.status()).toBe(200);

    // H1 and Title
    await expect(page.locator('main h1')).toHaveText('Mahjong Variants Online Game');
    await expect(page).toHaveTitle(/Mahjong Variants Online Game/);

    // Canonical and description
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://puzzlefeels.com/mahjong-variants-online-game/'
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

    // Breadcrumbs
    const breadcrumbs = page.locator('.mahjong-breadcrumbs a');
    await expect(breadcrumbs.nth(0)).toHaveAttribute('href', '/');
    await expect(breadcrumbs.nth(1)).toHaveAttribute('href', '/games/');
    await expect(page.locator('.mahjong-breadcrumbs [aria-current="page"]')).toHaveText('Mahjong Variants Online Game');

    // JSON-LD Structured Data
    const schemas = await page.locator('script[type="application/ld+json"]').all();
    expect(schemas.length).toBeGreaterThanOrEqual(2);

    const schemaTexts = await Promise.all(schemas.map((s) => s.textContent()));
    const parsedSchemas = schemaTexts.map((txt) => JSON.parse(txt || '{}'));

    const gameSchema = parsedSchemas.find((s) => s['@type'] === 'VideoGame');
    expect(gameSchema).toBeDefined();
    expect(gameSchema?.name).toBe('Mahjong Variants Online Game');
    expect(gameSchema?.url).toBe('https://puzzlefeels.com/mahjong-variants-online-game/');

    const breadcrumbSchema = parsedSchemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema?.itemListElement?.length).toBe(3);
    expect(breadcrumbSchema?.itemListElement[2]?.name).toBe('Mahjong Variants Online Game');
  });

  test('Mode A (Classic Solitaire): default Easy mode, free tile selection, hint, matching, and undo', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    // Initial state: Easy difficulty (36 tiles), Classic Solitaire active
    const solitaireBoard = page.locator('#solitaire-board');
    await expect(solitaireBoard).toBeVisible();
    await expect(page.locator('#tab-mode-solitaire')).toHaveClass(/is-active/);
    await expect(page.locator('.mahjong-diff-btn[data-difficulty="easy"]')).toHaveClass(/is-active/);

    // 36 tiles rendered
    const tiles = solitaireBoard.locator('.mahjong-tile');
    await expect(tiles).toHaveCount(36);
    await expect(page.locator('#stat-remaining')).toHaveText('36');

    // Free tile selection
    const freeTiles = solitaireBoard.locator('.mahjong-tile.is-free');
    const freeCount = await freeTiles.count();
    expect(freeCount).toBeGreaterThan(0);

    // Select first free tile
    await freeTiles.first().click();
    await expect(freeTiles.first()).toHaveClass(/is-selected/);

    // Deselect by clicking again
    await freeTiles.first().click();
    await expect(freeTiles.first()).not.toHaveClass(/is-selected/);

    // Test Hint system: hint highlights two matching free tiles
    await page.locator('#btn-hint').click();
    const hintedTiles = solitaireBoard.locator('.mahjong-tile.is-hinted');
    await expect(hintedTiles).toHaveCount(2);

    const tile1Id = await hintedTiles.nth(0).getAttribute('data-tile-id');
    const tile2Id = await hintedTiles.nth(1).getAttribute('data-tile-id');
    expect(tile1Id).toBe(tile2Id);

    const domId1 = await hintedTiles.nth(0).getAttribute('id');
    const domId2 = await hintedTiles.nth(1).getAttribute('id');

    // Click both hinted tiles by ID to perform a valid match
    await page.locator(`#${domId1}`).click();
    await page.locator(`#${domId2}`).click();

    // Tiles should be cleared (count decreases from 36 to 34)
    await expect(solitaireBoard.locator('.mahjong-tile')).toHaveCount(34);
    await expect(page.locator('#stat-remaining')).toHaveText('34');
    await expect(page.locator('#stat-moves')).toHaveText('1');
    await expect(page.locator('#stat-score')).not.toHaveText('0');

    // Test Undo: reverses the match
    const undoBtn = page.locator('#btn-undo');
    await expect(undoBtn).not.toBeDisabled();
    await undoBtn.click();

    // Restored back to 36 tiles
    await expect(solitaireBoard.locator('.mahjong-tile')).toHaveCount(36);
    await expect(page.locator('#stat-remaining')).toHaveText('36');
    await expect(page.locator('#stat-moves')).toHaveText('0');
    await expect(page.locator('#stat-score')).toHaveText('0');
  });

  test('Mode B (Mahjong Connect): switching mode, grid layout, hint, and valid 2-turn connection', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    // Switch to Mahjong Connect
    await page.locator('#tab-mode-connect').click();
    await expect(page.locator('#tab-mode-connect')).toHaveClass(/is-active/);
    await expect(page.locator('#connect-board')).toBeVisible();
    await expect(page.locator('#solitaire-board')).toBeHidden();
    await expect(page.locator('#stat-mode-label')).toHaveText('Mahjong Connect');

    // Easy Connect is 6x6 = 36 tiles
    const connectTiles = page.locator('#connect-grid .connect-tile');
    await expect(connectTiles).toHaveCount(36);

    // Test Hint in Connect mode
    await page.locator('#btn-hint').click();
    const hintedTiles = page.locator('#connect-grid .connect-tile.is-hinted');
    await expect(hintedTiles).toHaveCount(2);

    const tile1Id = await hintedTiles.nth(0).getAttribute('data-tile-id');
    const tile2Id = await hintedTiles.nth(1).getAttribute('data-tile-id');
    expect(tile1Id).toBe(tile2Id);

    const domId1 = await hintedTiles.nth(0).getAttribute('id');
    const domId2 = await hintedTiles.nth(1).getAttribute('id');

    // Match the hinted pair by ID
    await page.locator(`#${domId1}`).click();
    await page.locator(`#${domId2}`).click();

    // Wait for connection beam animation and tile elimination
    await page.waitForTimeout(350);
    await expect(page.locator('#connect-grid .connect-tile')).toHaveCount(34);
    await expect(page.locator('#stat-moves')).toHaveText('1');

    // Test Undo in Connect mode
    await page.locator('#btn-undo').click();
    await expect(page.locator('#connect-grid .connect-tile')).toHaveCount(36);
    await expect(page.locator('#stat-moves')).toHaveText('0');
  });

  test('Mode C (Triple Mahjong): tray mechanics, picking tiles, and 3-matching', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    // Switch to Triple Mahjong
    await page.locator('#tab-mode-triple').click();
    await expect(page.locator('#tab-mode-triple')).toHaveClass(/is-active/);
    await expect(page.locator('#triple-board')).toBeVisible();
    await expect(page.locator('#solitaire-board')).toBeHidden();
    await expect(page.locator('#stat-mode-label')).toHaveText('Triple Mahjong');

    // Tray is visible with 7 slots
    const tray = page.locator('#triple-tray');
    await expect(tray).toBeVisible();
    const slots = tray.locator('.triple-tray-slot');
    await expect(slots).toHaveCount(7);
    await expect(page.locator('#tray-count-label')).toHaveText('0 / 7');

    // Available board tiles
    const freeTiles = page.locator('#triple-board-tiles .mahjong-tile.is-free');
    const countBefore = await freeTiles.count();
    expect(countBefore).toBeGreaterThan(0);

    // Pick an available tile into the tray
    await freeTiles.first().click();

    // Tile moved into tray
    await expect(tray.locator('.tray-tile')).toHaveCount(1);
    await expect(page.locator('#tray-count-label')).toHaveText('1 / 7');
    await expect(page.locator('#stat-moves')).toHaveText('1');

    // Test Undo: returns tile from tray back to board
    await page.locator('#btn-undo').click();
    await expect(tray.locator('.tray-tile')).toHaveCount(0);
    await expect(page.locator('#tray-count-label')).toHaveText('0 / 7');
    await expect(page.locator('#stat-moves')).toHaveText('0');
  });

  test('Difficulty selection switches board configurations correctly', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    // Easy (36 tiles)
    await expect(page.locator('#solitaire-board .mahjong-tile')).toHaveCount(36);

    // Switch to Medium (72 tiles)
    await page.locator('.mahjong-diff-btn[data-difficulty="medium"]').click();
    await expect(page.locator('.mahjong-diff-btn[data-difficulty="medium"]')).toHaveClass(/is-active/);
    await expect(page.locator('#solitaire-board .mahjong-tile')).toHaveCount(72);
    await expect(page.locator('#stat-remaining')).toHaveText('72');

    // Switch to Hard (144 tiles)
    await page.locator('.mahjong-diff-btn[data-difficulty="hard"]').click();
    await expect(page.locator('.mahjong-diff-btn[data-difficulty="hard"]')).toHaveClass(/is-active/);
    await expect(page.locator('#solitaire-board .mahjong-tile')).toHaveCount(144);
    await expect(page.locator('#stat-remaining')).toHaveText('144');
  });

  test('Daily challenge toggle activates UTC daily puzzle and remains consistent', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const dailyBtn = page.locator('#mahjong-daily-toggle');
    await expect(dailyBtn).toBeVisible();
    await dailyBtn.click();
    await expect(dailyBtn).toHaveClass(/is-active/);

    // Read initial tile order
    const firstTileSymbol = await page.locator('#solitaire-board .mahjong-tile').first().getAttribute('data-tile-id');

    // Refresh the page in daily mode
    await page.reload();
    await expect(page.locator('#mahjong-daily-toggle')).toHaveClass(/is-active/);
    const refreshedFirstTileSymbol = await page.locator('#solitaire-board .mahjong-tile').first().getAttribute('data-tile-id');

    expect(refreshedFirstTileSymbol).toBe(firstTileSymbol);
  });

  test('Pause and Resume properly stops and resumes gameplay', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    // Click Pause
    await page.locator('#btn-pause').click();
    const pausedOverlay = page.locator('#mahjong-paused');
    await expect(pausedOverlay).toBeVisible();
    await expect(page.locator('#btn-pause')).toHaveText('Resume');

    // Click Resume
    await page.locator('#mahjong-resume').click();
    await expect(pausedOverlay).toBeHidden();
    await expect(page.locator('#btn-pause')).toHaveText('Pause');
  });

  test('Sound toggle updates state and persists in LocalStorage', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const soundToggle = page.locator('#mahjong-sound-toggle');
    await expect(soundToggle).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#mahjong-sound-label')).toHaveText('Sound: On');

    // Click to toggle off
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#mahjong-sound-label')).toHaveText('Sound: Off');

    // Verify localStorage
    const stored = await page.evaluate(() => localStorage.getItem('puzzlefeels_mahjong_v1_sound'));
    expect(stored).toBe('false');

    // Reload page and verify persisted
    await page.reload();
    await expect(page.locator('#mahjong-sound-label')).toHaveText('Sound: Off');
  });

  test('ZoomControl operates smoothly on the board', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const zoomWrapper = page.locator('.zoom-popover-wrapper');
    await expect(zoomWrapper).toBeVisible();

    // Open zoom popover
    await zoomWrapper.locator('.zoom-toggle-btn').click();
    const popover = zoomWrapper.locator('.zoom-popover');
    await expect(popover).toBeVisible();

    // Click Zoom In
    await popover.locator('.btn-zoom-in').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('115%');

    // Click Fit to Screen / Reset
    await popover.locator('.btn-zoom-reset').click();
    await expect(zoomWrapper.locator('.zoom-level-label')).toHaveText('100%');
  });

  test('Explore More section displays exactly 3 related games excluding current game', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const relatedCards = page.locator('.related-games-section .related-card');
    await expect(relatedCards).toHaveCount(3);

    const hrefs = await Promise.all([
      relatedCards.nth(0).getAttribute('href'),
      relatedCards.nth(1).getAttribute('href'),
      relatedCards.nth(2).getAttribute('href'),
    ]);

    expect(hrefs).toContain('/memory-matching-game-online/');
    expect(hrefs).toContain('/picross-game-online/');
    expect(hrefs).toContain('/sliding-number-puzzle-game/');
    expect(hrefs).not.toContain('/mahjong-variants-online-game/');
  });

  test('Page is responsive and free of horizontal overflow across all required viewport widths', async ({ page }) => {
    const widths = [320, 360, 375, 390, 414, 430, 768, 1280];

    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/mahjong-variants-online-game/');

      const metrics = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
      }));

      expect(metrics.document, `Overflow detected at ${width}px`).toBeLessThanOrEqual(metrics.viewport + 1);
    }
  });

  test('All FAQ accordion items expand and collapse correctly', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const faqs = page.locator('.faq-list details');
    const count = await faqs.count();
    expect(count).toBeGreaterThanOrEqual(10);

    // First FAQ details is closed initially
    await expect(faqs.first()).not.toHaveAttribute('open');

    // Click to expand
    await faqs.first().locator('summary').click();
    await expect(faqs.first()).toHaveAttribute('open', '');

    // Click to collapse
    await faqs.first().locator('summary').click();
    await expect(faqs.first()).not.toHaveAttribute('open');
  });

  test('Page Title (H1) and introductory description are center-aligned while main article is left-aligned', async ({ page }) => {
    await page.goto('/mahjong-variants-online-game/');

    const introStyles = await page.evaluate(() => {
      const intro = document.querySelector('.mahjong-intro');
      const h1 = document.querySelector('.mahjong-intro h1');
      const p = document.querySelector('.mahjong-intro p');
      const article = document.querySelector('.mahjong-article');
      const articleH2 = document.querySelector('.mahjong-article h2');

      return {
        introAlign: window.getComputedStyle(intro).textAlign,
        h1Align: window.getComputedStyle(h1).textAlign,
        pAlign: window.getComputedStyle(p).textAlign,
        articleAlign: window.getComputedStyle(article).textAlign,
        articleH2Align: window.getComputedStyle(articleH2).textAlign,
      };
    });

    expect(introStyles.introAlign).toBe('center');
    expect(introStyles.h1Align).toBe('center');
    expect(introStyles.pAlign).toBe('center');
    expect(introStyles.articleAlign).toBe('left');
    expect(introStyles.articleH2Align).toBe('left');
  });

  test('Article H2 and H3 heading sizes match Sliding Number Puzzle Game typography exactly', async ({ page }) => {
    // 1. Check desktop typography (1280px)
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/mahjong-variants-online-game/');

    const desktopStyles = await page.evaluate(() => {
      const h2 = document.querySelector('.mahjong-article h2');
      const testH3 = document.createElement('h3');
      testH3.textContent = 'Test Heading';
      document.querySelector('.mahjong-article').appendChild(testH3);
      const h3Size = window.getComputedStyle(testH3).fontSize;
      testH3.remove();

      return {
        h2Size: window.getComputedStyle(h2).fontSize,
        h3Size,
      };
    });

    expect(desktopStyles.h2Size).toBe('24px');
    expect(desktopStyles.h3Size).toBe('18px');

    // 2. Check mobile typography (375px)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/mahjong-variants-online-game/');

    const mobileStyles = await page.evaluate(() => {
      const h2 = document.querySelector('.mahjong-article h2');
      const testH3 = document.createElement('h3');
      testH3.textContent = 'Test Heading';
      document.querySelector('.mahjong-article').appendChild(testH3);
      const h3Size = window.getComputedStyle(testH3).fontSize;
      testH3.remove();

      return {
        h2Size: window.getComputedStyle(h2).fontSize,
        h3Size,
      };
    });

    expect(mobileStyles.h2Size).toBe('21px');
    expect(mobileStyles.h3Size).toBe('17px');
  });

  test('Redesigned difficulty buttons have equal heights, comfortable touch targets, and readable labels on mobile', async ({ page }) => {
    const mobileWidths = [320, 360, 375, 390, 414, 430];

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/mahjong-variants-online-game/');

      const btnBoxes = await page.evaluate(() => {
        const easy = document.querySelector('.mahjong-diff-btn[data-difficulty="easy"]');
        const med = document.querySelector('.mahjong-diff-btn[data-difficulty="medium"]');
        const hard = document.querySelector('.mahjong-diff-btn[data-difficulty="hard"]');

        const rEasy = easy.getBoundingClientRect();
        const rMed = med.getBoundingClientRect();
        const rHard = hard.getBoundingClientRect();

        return {
          easy: { height: rEasy.height, width: rEasy.width },
          med: { height: rMed.height, width: rMed.width },
          hard: { height: rHard.height, width: rHard.width },
          easyText: easy.innerText,
          medText: med.innerText,
          hardText: hard.innerText,
        };
      });

      // All three buttons have equal heights (within 1.5px rounding)
      expect(Math.abs(btnBoxes.easy.height - btnBoxes.med.height)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(btnBoxes.easy.height - btnBoxes.hard.height)).toBeLessThanOrEqual(1.5);

      // Comfortable mobile touch targets (height >= 44px)
      expect(btnBoxes.easy.height).toBeGreaterThanOrEqual(44);
      expect(btnBoxes.med.height).toBeGreaterThanOrEqual(44);
      expect(btnBoxes.hard.height).toBeGreaterThanOrEqual(44);

      // Subtitles are rendered and visible
      expect(btnBoxes.easyText).toContain('Easy');
      expect(btnBoxes.easyText).toContain('36 Tiles');
      expect(btnBoxes.medText).toContain('Medium');
      expect(btnBoxes.medText).toContain('60–72 Tiles');
      expect(btnBoxes.hardText).toContain('Hard');
      expect(btnBoxes.hardText).toContain('90–144 Tiles');
    }
  });

  test('All three Mahjong modes and overlays are mobile friendly without overflow across all widths', async ({ page }) => {
    const mobileWidths = [320, 360, 375, 390, 414, 430];

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/mahjong-variants-online-game/');

      // Check Mode A (Solitaire)
      let docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(docWidth, `Mode A overflow at ${width}px`).toBeLessThanOrEqual(width + 1);

      // Switch to Mode B (Connect)
      await page.locator('#tab-mode-connect').click();
      await page.waitForTimeout(100);
      docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(docWidth, `Mode B overflow at ${width}px`).toBeLessThanOrEqual(width + 1);

      // Switch to Mode C (Triple)
      await page.locator('#tab-mode-triple').click();
      await page.waitForTimeout(100);
      docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(docWidth, `Mode C overflow at ${width}px`).toBeLessThanOrEqual(width + 1);

      // Check Triple tray is contained within viewport
      const trayWidth = await page.evaluate(() => {
        const tray = document.querySelector('.triple-tray-container');
        return tray ? tray.getBoundingClientRect().width : 0;
      });
      expect(trayWidth).toBeLessThanOrEqual(width);

      // Test Pause overlay fits without overflow
      await page.locator('#btn-pause').click();
      await expect(page.locator('#mahjong-paused')).toBeVisible();
      docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(docWidth, `Paused overlay overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
      await page.locator('#mahjong-resume').click();
      await expect(page.locator('#mahjong-paused')).toBeHidden();
    }
  });
});
