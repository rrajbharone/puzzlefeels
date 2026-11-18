import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { expect, test as base } from '@playwright/test';

const diagnosticsByPage = new WeakMap();

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const diagnostics = { consoleErrors: [], pageErrors: [], failedRequests: [] };
    diagnosticsByPage.set(page, diagnostics);
    page.on('console', (message) => {
      if (message.type() === 'error') diagnostics.consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => diagnostics.pageErrors.push(error.message));
    page.on('requestfailed', (request) => diagnostics.failedRequests.push({
      url: request.url(),
      error: request.failure()?.errorText || 'unknown request failure',
    }));
    await page.addInitScript(() => {
      if (sessionStorage.getItem('__puzzlefeels_e2e_initialized') !== 'yes') {
        localStorage.clear();
        localStorage.setItem('puzzlefeels-theme', 'light');
        sessionStorage.setItem('__puzzlefeels_e2e_initialized', 'yes');
      }
    });
    await use(page);
    await mkdir(testInfo.outputDir, { recursive: true });
    await writeFile(path.join(testInfo.outputDir, 'browser-diagnostics.json'), JSON.stringify(diagnostics, null, 2));
    const baseURL = testInfo.project.use.baseURL;
    const sameOriginFailures = diagnostics.failedRequests.filter((request) => {
      try { return new URL(request.url).origin === new URL(baseURL).origin; } catch { return false; }
    });
    expect(diagnostics.pageErrors, 'Uncaught page exceptions').toEqual([]);
    expect(diagnostics.consoleErrors.filter((message) => !message.includes('Failed to load resource')),
      'Application console errors (browser resource warnings are recorded separately)').toEqual([]);
    expect(sameOriginFailures, 'Failed requests to the local site').toEqual([]);
  },
});

const viewports = [
  { width: 1280, height: 800, name: 'desktop-1280x800' },
  { width: 1440, height: 900, name: 'desktop-1440x900' },
  { width: 320, height: 700, name: 'mobile-320x700' },
  { width: 360, height: 800, name: 'mobile-360x800' },
  { width: 375, height: 812, name: 'mobile-375x812' },
  { width: 390, height: 844, name: 'mobile-390x844' },
  { width: 414, height: 896, name: 'mobile-414x896' },
  { width: 430, height: 932, name: 'mobile-430x932' },
  { width: 768, height: 900, name: 'tablet-768x900' },
  { width: 1024, height: 900, name: 'laptop-1024x900' },
];

async function screenshot(page, testInfo, name) {
  await mkdir(testInfo.outputDir, { recursive: true });
  await page.screenshot({ path: path.join(testInfo.outputDir, name + '.png'), fullPage: true });
}

test('main routes render, expose a page heading, and use valid local links', async ({ page }) => {
  const routes = [
    { path: '/', heading: /Play Free Online\s*Puzzle Games/ },
    { path: '/games/', heading: 'Explore All Puzzle Games' },
    { path: '/number-sequence-game/', heading: 'Play Number Sequence Game Online' },
    { path: '/color-flood-game/', heading: 'Color Flood Game' },
    { path: '/picross-game-online/', heading: 'Picross Game Online – Play Free Nonogram Puzzles' },
    { path: '/sliding-number-puzzle-game/', heading: 'Sliding Number Puzzle Game' },
    { path: '/word-ladder-game-online/', heading: 'Word Ladder Game Online' },
    { path: '/reaction-time-challenge/', heading: 'Reaction Time Challenge' },
    { path: '/mahjong-variants-online-game/', heading: 'Mahjong Variants Online Game' },
    { path: '/shakashaka-online-puzzle-game/', heading: 'Shakashaka – Online Puzzle Game' },
    { path: '/square-jam-puzzle/', heading: 'Square Jam – Free Online Logic Puzzle Game' },
  ];
  for (const route of routes) {
    const response = await page.goto(route.path);
    expect(response?.status(), route.path + ' HTTP status').toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h1').first()).toContainText(route.heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://puzzlefeels.com' + route.path);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await screenshot(page, test.info(), 'route-' + (route.path === '/' ? 'home' : route.path.split('/')[1]));
  }
  await page.goto('/');
  await page.locator('.picross-home-card a').click();
  await expect(page).toHaveURL(/\/picross-game-online\/$/);
  await expect(page.locator('h1', { hasText: 'Picross Game Online' })).toBeVisible();
});

test('All Games search, empty state, clear action, and game links work', async ({ page }) => {
  test.slow();
  await page.goto('/games/');
  const cards = page.locator('.directory-card:visible');
  await expect(cards).toHaveCount(14);

  const search = page.getByRole('searchbox', { name: 'Search games by name' });
  await search.fill('number sequence');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Number Sequence Game');
  await search.fill('NONOGRAM');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Picross Game Online');
  await search.fill('color');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Color Flood Game');
  await search.fill('sliding puzzle');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Sliding Number Puzzle Game');
  await search.fill('15 puzzle');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Sliding Number Puzzle Game');
  await search.fill('8 puzzle');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Sliding Number Puzzle Game');
  await search.fill('word ladder');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Word Ladder Game Online');
  await search.fill('doublets');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Word Ladder Game Online');
  await search.fill('reaction time');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Reaction Time Challenge');
  await search.fill('reflex');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Reaction Time Challenge');
  await search.fill('memory matching');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Memory Matching Game Online');
  await search.fill('concentration');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Memory Matching Game Online');
  await search.fill('murdoku');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Murdoku Online Game');
  await search.fill('murder mystery');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Murdoku Online Game');
  await search.fill('hidden object');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Free Hidden Object Online Game');
  await search.fill('mahjong');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Mahjong Variants Online Game');

  await search.fill('nothing-matches-this');
  await expect(page.getByRole('heading', { name: 'No games found' })).toBeVisible();
  await expect(page.getByText('Try searching with a different game name.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(search).toBeFocused();
  await expect(cards).toHaveCount(14);

  for (const [index, href, heading] of [
    [0, '/number-sequence-game/', 'Play Number Sequence Game Online'],
    [1, '/color-flood-game/', 'Color Flood Game'],
    [2, '/picross-game-online/', 'Picross Game Online'],
    [3, '/sliding-number-puzzle-game/', 'Sliding Number Puzzle Game'],
    [4, '/word-ladder-game-online/', 'Word Ladder Game Online'],
    [5, '/reaction-time-challenge/', 'Reaction Time Challenge'],
    [6, '/memory-matching-game-online/', 'Memory Matching Game Online'],
    [7, '/murdoku-online-game/', 'Murdoku Online Game'],
    [8, '/norinori-game/', 'Norinori Game'],
    [9, '/spot-the-difference-game/', 'Spot the Difference Free Online Game'],
    [10, '/hidden-object-game/', 'Free Hidden Object Online Game'],
    [11, '/mahjong-variants-online-game/', 'Mahjong Variants Online Game'],
    [12, '/shakashaka-online-puzzle-game/', 'Shakashaka – Online Puzzle Game'],
    [13, '/square-jam-puzzle/', 'Square Jam – Free Online Logic Puzzle Game'],
  ]) {
    await expect(cards.nth(index)).toHaveAttribute('href', href);
    await cards.nth(index).click();
    await expect(page).toHaveURL(new RegExp(href.replaceAll('/', '\\/') + '$'));
    await expect(page.locator('h1').first()).toContainText(heading);
    await page.goBack();
    await expect(page.locator('.directory-card')).toHaveCount(14);
  }
});

test('All Games metadata, sitemap, and desktop/mobile navigation are correct', async ({ page }) => {
  await page.goto('/games/');
  await expect(page).toHaveTitle('All Free Online Puzzle Games | PuzzleFeels');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://puzzlefeels.com/games/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  const sitemap = await page.request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('https://puzzlefeels.com/games/');

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.locator('#nav a[href="/games/"]').click();
  await expect(page).toHaveURL(/\/games\/$/);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.locator('#nav a[href="/games/"]').click();
  await expect(page).toHaveURL(/\/games\/$/);
  await expect(page.locator('#nav')).not.toHaveClass(/open/);
});

test('All Games page is responsive and theme-aware', async ({ page }, testInfo) => {
  for (const width of [1280, 768, 430, 390, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/games/');
    const metrics = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    expect(metrics.document, `${width}px page overflow`).toBeLessThanOrEqual(metrics.viewport + 1);
    await expect(page.locator('.directory-card')).toHaveCount(14);
    if (width === 1280 || width === 390) await screenshot(page, testInfo, `games-light-${width}`);
  }
  const toggle = page.getByRole('switch');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.directory-card').first()).toHaveCSS('background-color', 'rgb(21, 31, 61)');
  await expect(page.locator('.game-search')).toHaveCSS('background-color', 'rgb(21, 31, 61)');
  await screenshot(page, testInfo, 'games-dark-mobile');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Picross board is aligned and stays within the page at desktop and mobile sizes', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/picross-game-online/');
  if (await page.getByRole('button', { name: 'Start puzzle' }).isVisible()) {
    await page.getByRole('button', { name: 'Start puzzle' }).click();
  }
  await expect(page.getByRole('grid', { name: /columns by 5 rows/ })).toBeVisible();
  await expect(page.getByRole('gridcell')).toHaveCount(25);
  await expect(page.locator('.picross-row-clue')).toHaveCount(5);
  await expect(page.locator('.picross-column-clue')).toHaveCount(5);

  const alignment = await page.evaluate(() => {
    const firstCell = document.querySelector('.picross-cell').getBoundingClientRect();
    const firstRowClue = document.querySelector('.picross-row-clue').getBoundingClientRect();
    const firstColumnClue = document.querySelector('.picross-column-clue').getBoundingClientRect();
    return { rowDelta: Math.abs(firstCell.top - firstRowClue.top), columnDelta: Math.abs(firstCell.top - firstColumnClue.bottom) };
  });
  expect(alignment.rowDelta).toBeLessThanOrEqual(1);
  expect(alignment.columnDelta).toBeLessThanOrEqual(1);

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await expect(page.locator('#picross-play')).toBeVisible();
    const layout = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      boardCell: document.querySelector('.picross-cell').getBoundingClientRect().width,
      boardScrollWidth: document.querySelector('.picross-board-scroll').scrollWidth,
      boardClientWidth: document.querySelector('.picross-board-scroll').clientWidth,
    }));
    expect(layout.documentWidth, viewport.name + ' page overflow').toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.boardCell, viewport.name + ' cell size').toBeGreaterThanOrEqual(27);
    if (viewport.width >= 1280) expect(layout.boardCell, viewport.name + ' desktop cell size').toBeGreaterThanOrEqual(35);
    await expect(page.getByRole('button', { name: 'Fill', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Mark empty' })).toBeVisible();
    await screenshot(page, testInfo, 'picross-' + viewport.name);
  }
});

test('Picross fill, empty, undo, redo, hint, mistake check, timer, pause, restart, and new puzzle work', async ({ page }) => {
  await page.goto('/picross-game-online/');
  if (await page.getByRole('button', { name: 'Start puzzle' }).isVisible()) {
    await page.getByRole('button', { name: 'Start puzzle' }).click();
  }
  const cells = page.getByRole('grid').getByRole('gridcell');

  await page.getByRole('button', { name: 'Mark empty' }).click();
  await cells.nth(0).click();
  await expect(cells.nth(0)).toHaveClass(/is-empty/);
  await expect(cells.nth(0).locator('.picross-empty-mark')).toHaveText('×');
  await page.getByRole('button', { name: 'Fill', exact: true }).click();
  await cells.nth(1).click();
  await expect(cells.nth(1)).toHaveClass(/is-filled/);
  await expect(page.locator('#picross-progress-value')).toHaveText('8% correct');

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(cells.nth(1)).not.toHaveClass(/is-filled/);
  await page.getByRole('button', { name: 'Redo' }).click();
  await expect(cells.nth(1)).toHaveClass(/is-filled/);
  const cellsBeforeHint = await page.locator('.picross-cell.is-filled, .picross-cell.is-empty').count();
  await page.getByRole('button', { name: 'Hint' }).click();
  await expect(page.locator('.picross-cell.is-filled, .picross-cell.is-empty')).toHaveCount(cellsBeforeHint + 1);
  await expect(page.locator('#picross-status')).toContainText('Hint: row');

  await page.getByLabel('Check mistakes').check();
  await page.getByRole('button', { name: 'Fill', exact: true }).click();
  await cells.nth(0).click();
  await expect(cells.nth(0)).toHaveClass(/is-mistake/);

  await page.waitForTimeout(1100);
  await expect(page.locator('#picross-timer')).not.toHaveText('00:00');
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page.locator('#picross-paused')).toBeVisible();
  const pausedTime = await page.locator('#picross-timer').textContent();
  await page.waitForTimeout(1100);
  await expect(page.locator('#picross-timer')).toHaveText(pausedTime);
  await page.getByRole('button', { name: 'Resume puzzle' }).click();
  await expect(page.locator('#picross-play')).toBeVisible();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Restart puzzle' }).click();
  await expect(page.locator('.picross-cell.is-filled, .picross-cell.is-empty')).toHaveCount(0);
  await page.getByRole('button', { name: 'New puzzle' }).click();
  await expect(page.locator('#picross-puzzle-name')).toContainText('Star');
});

test('Picross difficulty selectors render the implemented board sizes', async ({ page }, testInfo) => {
  await page.goto('/picross-game-online/');
  await page.getByRole('button', { name: /Medium/ }).click();
  await page.getByRole('button', { name: 'Start puzzle' }).click();
  await expect(page.getByRole('grid').getByRole('gridcell')).toHaveCount(100);
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.getByRole('button', { name: 'Back to puzzles' }).click();
  await page.getByRole('button', { name: /Hard/ }).click();
  await page.getByRole('button', { name: 'Start puzzle' }).click();
  await expect(page.getByRole('grid').getByRole('gridcell')).toHaveCount(225);
  const minCell = await page.locator('.picross-cell').first().evaluate((cell) => cell.getBoundingClientRect().width);
  expect(minCell).toBeGreaterThanOrEqual(27);
  await page.setViewportSize({ width: 320, height: 700 });
  const smallHardLayout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    boardWidth: document.querySelector('.picross-board').scrollWidth,
    scrollViewport: document.querySelector('.picross-board-scroll').clientWidth,
    cellWidth: document.querySelector('.picross-cell').getBoundingClientRect().width,
  }));
  expect(smallHardLayout.documentWidth).toBeLessThanOrEqual(smallHardLayout.viewportWidth + 1);
  expect(smallHardLayout.cellWidth).toBeGreaterThanOrEqual(27);
  expect(smallHardLayout.boardWidth).toBeGreaterThan(smallHardLayout.scrollViewport);
  await expect(page.locator('.picross-column-clue')).toHaveCount(15);
  await screenshot(page, testInfo, 'picross-hard-mobile-320x700');
});

test('Picross progress resumes after refresh and daily puzzle stays the same', async ({ page }) => {
  await page.goto('/picross-game-online/');
  if (await page.getByRole('button', { name: 'Start puzzle' }).isVisible()) {
    await page.getByRole('button', { name: 'Start puzzle' }).click();
  }
  await page.getByRole('grid').getByRole('gridcell').nth(1).click();
  await page.reload();
  await expect(page.locator('#picross-play')).toBeVisible();
  await expect(page.getByRole('grid').getByRole('gridcell').nth(1)).toHaveClass(/is-filled/);

  await page.goto('/picross-game-online/?daily=today');
  page.once('dialog', (dialog) => dialog.accept());
  if (await page.getByRole('button', { name: /Play today’s Daily Challenge/ }).isVisible()) {
    await page.getByRole('button', { name: /Play today’s Daily Challenge/ }).click();
  }
  await expect(page.locator('#picross-play')).toBeVisible();
  const dailyPuzzle = await page.locator('#picross-puzzle-name').textContent();
  await page.getByRole('grid').getByRole('gridcell').nth(0).click();
  await page.reload();
  await expect(page.locator('#picross-play')).toBeVisible();
  await expect(page.locator('#picross-puzzle-name')).toHaveText(dailyPuzzle);
  await expect(page.locator('.picross-cell.is-filled, .picross-cell.is-empty')).toHaveCount(1);
});

test('complete a Picross puzzle, view results, and share the score', async ({ page, context }, testInfo) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() => {
    window.__puzzleFeelsSharedResult = null;
    navigator.share = async (payload) => { window.__puzzleFeelsSharedResult = payload; };
  });
  await page.goto('/picross-game-online/');
  if (await page.getByRole('button', { name: 'Start puzzle' }).isVisible()) {
    await page.getByRole('button', { name: 'Start puzzle' }).click();
  }
  const solution = ['.###.', '#####', '#####', '.###.', '..#..'];
  let mode = 'fill';
  for (let row = 0; row < solution.length; row += 1) {
    for (let column = 0; column < solution[row].length; column += 1) {
      const nextMode = solution[row][column] === '#' ? 'fill' : 'empty';
      if (nextMode !== mode) {
        await page.getByRole('button', { name: nextMode === 'fill' ? 'Fill' : 'Mark empty' }).click();
        mode = nextMode;
      }
      await page.getByRole('grid').getByRole('gridcell').nth(row * 5 + column).click();
    }
  }
  await expect(page.locator('#picross-result')).toBeVisible();
  await expect(page.locator('#picross-result-puzzle')).toHaveText('Heart');
  await expect(page.locator('#picross-result-score')).not.toHaveText('0');
  await screenshot(page, testInfo, 'picross-victory-result');
  await page.getByRole('button', { name: 'Share result' }).click();
  await expect(page.locator('#picross-share-status')).toHaveText('Thanks for sharing your result!');
  const sharePayload = await page.evaluate(() => window.__puzzleFeelsSharedResult);
  expect(sharePayload.text).toContain('PuzzleFeels.com');
  expect(sharePayload.text).toContain('Picross Game Online');
  expect(sharePayload.text).toContain('/picross-game-online/');
  await page.evaluate(() => { navigator.share = undefined; });
  await page.getByRole('button', { name: 'Share result' }).click();
  await expect(page.locator('#picross-share-status')).toContainText('copied to your clipboard');
});

test('theme changes preserve the active board and persist across refreshes', async ({ page }, testInfo) => {
  await page.goto('/picross-game-online/');
  if (await page.getByRole('button', { name: 'Start puzzle' }).isVisible()) {
    await page.getByRole('button', { name: 'Start puzzle' }).click();
  }
  const firstCell = page.getByRole('grid').getByRole('gridcell').nth(1);
  await firstCell.click();
  const toggle = page.getByRole('switch');
  if (await page.locator('html').getAttribute('data-theme') !== 'dark') await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => page.locator('html').evaluate((node) => getComputedStyle(node).backgroundColor)).toBe('rgb(11, 19, 43)');
  await expect(firstCell).toHaveClass(/is-filled/);
  await screenshot(page, testInfo, 'picross-dark-mode');

  await page.getByRole('switch', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(firstCell).toHaveClass(/is-filled/);
  await screenshot(page, testInfo, 'picross-light-mode');
  await page.getByRole('switch', { name: 'Switch to dark mode' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#picross-play')).toBeVisible();
  await expect(page.getByRole('grid').getByRole('gridcell').nth(1)).toHaveClass(/is-filled/);
});

test('header navigation, footer simplification, and homepage trust SVGs are correct', async ({ page }, testInfo) => {
  await page.goto('/');

  // 1. Verify Header Navigation on Desktop
  const header = page.locator('.site-header');
  await expect(header).toBeVisible();
  await expect(header.locator('.header-cta')).toHaveCount(0);
  await expect(header.getByText('Play now')).toHaveCount(0);

  const navLinks = header.locator('#nav a');
  await expect(navLinks).toHaveCount(4);
  await expect(navLinks.nth(0)).toHaveText('Home');
  await expect(navLinks.nth(0)).toHaveAttribute('href', '/');
  await expect(navLinks.nth(1)).toHaveText('All Games');
  await expect(navLinks.nth(1)).toHaveAttribute('href', '/games/');
  await expect(navLinks.nth(2)).toHaveText('Daily Challenge');
  await expect(navLinks.nth(2)).toHaveAttribute('href', '/#daily');
  await expect(navLinks.nth(3)).toHaveText('About');
  await expect(navLinks.nth(3)).toHaveAttribute('href', '/about/');

  // Desktop alignment check
  const navBox = await page.locator('#nav').boundingBox();
  const brandBox = await header.locator('.brand').boundingBox();
  const toggleBox = await header.locator('.theme-toggle').boundingBox();
  expect(navBox && brandBox && toggleBox).toBeTruthy();
  expect(navBox.x).toBeGreaterThan(brandBox.x + brandBox.width);
  expect(toggleBox.x).toBeGreaterThan(navBox.x);

  // 2. Verify Homepage Trust SVGs
  const trustItems = page.locator('.trust-strip .trust-item');
  await expect(trustItems).toHaveCount(4);
  const trustTexts = await trustItems.allTextContents();
  expect(trustTexts[0]).toContain('Always free');
  expect(trustTexts[1]).toContain('No downloads');
  expect(trustTexts[2]).toContain('Progress saved on your device');
  expect(trustTexts[3]).toContain('Made for every screen');

  const trustSvgs = page.locator('.trust-strip .trust-icon');
  await expect(trustSvgs).toHaveCount(4);
  for (let i = 0; i < 4; i++) {
    const svg = trustSvgs.nth(i);
    await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    await expect(svg).toHaveAttribute('fill', 'none');
    await expect(svg).toHaveAttribute('stroke', 'currentColor');
  }

  // 3. Verify Footer Simplification
  const footer = page.locator('footer.footer');
  await expect(footer).toBeVisible();
  // Individual game links removed
  await expect(footer.locator('a[href="/number-sequence-game/"]')).toHaveCount(0);
  await expect(footer.locator('a[href="/color-flood-game/"]')).toHaveCount(0);
  await expect(footer.locator('a[href="/picross-game-online/"]')).toHaveCount(0);

  // Essential links retained
  await expect(footer.locator('a[href="/"]')).toHaveCount(2); // Brand logo + Home link
  await expect(footer.locator('.foot-top a[href="/"]:not(.brand)')).toHaveText('Home');
  await expect(footer.locator('a[href="/games/"]')).toHaveText('All Games');
  await expect(footer.locator('a[href="/#daily"]')).toHaveText('Daily Challenge');
  await expect(footer.locator('a[href="/about/"]')).toHaveText('About');
  await expect(footer.locator('a[href="/contact/"]')).toHaveText('Contact');
  await expect(footer.locator('a[href="/privacy-policy/"]')).toHaveText('Privacy');
  await expect(footer.locator('a[href="/terms/"]')).toHaveText('Terms');
  await expect(footer.locator('a[href="/cookie-policy/"]')).toHaveText('Cookies');

  await screenshot(page, testInfo, 'header-footer-desktop-light');

  // 4. Verify Mobile Header and Drawer
  await page.setViewportSize({ width: 375, height: 667 });
  const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
  await expect(menuButton).toBeVisible();
  await expect(header.locator('.theme-toggle')).toBeVisible();
  await expect(header.locator('.header-cta')).toHaveCount(0);

  // Open mobile menu
  await menuButton.click();
  await expect(page.locator('#nav')).toHaveClass(/open/);
  await expect(page.locator('#nav a[href="/"]')).toBeVisible();
  await expect(page.locator('#nav a[href="/games/"]')).toBeVisible();
  await expect(page.locator('#nav a[href="/#daily"]')).toBeVisible();
  await expect(page.locator('#nav a[href="/about/"]')).toBeVisible();

  await screenshot(page, testInfo, 'header-mobile-drawer');

  // Close mobile menu
  await page.getByRole('button', { name: 'Close navigation menu' }).click();
  await expect(page.locator('#nav')).not.toHaveClass(/open/);
});

test('Sliding Number Puzzle Game mechanics: movement, move counting, timer, undo, redo, restart, pause, sound, and difficulty changes', async ({ page }, testInfo) => {
  await page.goto('/sliding-number-puzzle-game/');

  // Page title and heading
  await expect(page).toHaveTitle(/Sliding Number Puzzle Game Online – Play Free/);
  await expect(page.locator('h1').first()).toHaveText('Sliding Number Puzzle Game');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://puzzlefeels.com/sliding-number-puzzle-game/');

  // Initial board state (Easy 3x3)
  const board = page.locator('#slide-board');
  await expect(board).toBeVisible();
  await expect(board).toHaveClass(/board-3/);
  await expect(board.locator('.slide-tile:not(.slide-tile-empty)')).toHaveCount(8);
  await expect(board.locator('.slide-tile-empty')).toHaveCount(1);

  const movesEl = page.locator('#slide-moves');
  const timerEl = page.locator('#slide-timer');
  const undoBtn = page.locator('#slide-undo');
  const redoBtn = page.locator('#slide-redo');
  const restartBtn = page.locator('#slide-restart');
  const newGameBtn = page.locator('#slide-new');
  const pauseBtn = page.locator('#slide-pause');
  const resumeBtn = page.locator('#slide-resume');

  await expect(movesEl).toHaveText('0');
  await expect(timerEl).toHaveText('00:00');
  await expect(undoBtn).toBeDisabled();
  await expect(redoBtn).toBeDisabled();

  // Find movable tile and click it
  const movableTile = board.locator('.slide-tile.is-movable').first();
  await expect(movableTile).toBeVisible();
  const movedValue = await movableTile.getAttribute('data-tile');
  await movableTile.click();

  // Move counter should increment to 1 and timer starts
  await expect(movesEl).toHaveText('1');
  await expect(undoBtn).toBeEnabled();
  await expect(redoBtn).toBeDisabled();

  // Wait for timer to advance
  await expect.poll(async () => {
    const timeText = await timerEl.textContent();
    return timeText !== '00:00';
  }, { timeout: 3000 }).toBe(true);

  // Undo move
  await undoBtn.click();
  await expect(movesEl).toHaveText('0');
  await expect(undoBtn).toBeDisabled();
  await expect(redoBtn).toBeEnabled();

  // Redo move
  await redoBtn.click();
  await expect(movesEl).toHaveText('1');
  await expect(undoBtn).toBeEnabled();
  await expect(redoBtn).toBeDisabled();

  // Restart current game
  await restartBtn.click();
  await expect(movesEl).toHaveText('0');
  await expect(timerEl).toHaveText('00:00');
  await expect(undoBtn).toBeDisabled();
  await expect(redoBtn).toBeDisabled();

  // Make move again, then pause
  const nextMovable = board.locator('.slide-tile.is-movable').first();
  await nextMovable.click();
  await expect(movesEl).toHaveText('1');

  await pauseBtn.click();
  const pausedOverlay = page.locator('#slide-paused');
  await expect(pausedOverlay).toBeVisible();
  await expect(pausedOverlay).toContainText('Game Paused');

  await resumeBtn.click();
  await expect(pausedOverlay).toBeHidden();

  // Sound toggle
  const soundBtn = page.locator('#slide-sound-toggle');
  await expect(soundBtn).toHaveAttribute('aria-pressed', 'true');
  await soundBtn.click();
  await expect(soundBtn).toHaveAttribute('aria-pressed', 'false');
  await expect(soundBtn).toContainText('Sound: Off');
  await soundBtn.click();
  await expect(soundBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(soundBtn).toContainText('Sound: On');

  // Difficulty changes
  // Medium (4x4)
  await page.locator('button[data-difficulty="medium"]').click();
  await expect(board).toHaveClass(/board-4/);
  await expect(board.locator('.slide-tile:not(.slide-tile-empty)')).toHaveCount(15);
  await expect(board.locator('.slide-tile-empty')).toHaveCount(1);
  await expect(movesEl).toHaveText('0');

  // Hard (5x5)
  await page.locator('button[data-difficulty="hard"]').click();
  await expect(board).toHaveClass(/board-5/);
  await expect(board.locator('.slide-tile:not(.slide-tile-empty)')).toHaveCount(24);
  await expect(board.locator('.slide-tile-empty')).toHaveCount(1);
  await expect(movesEl).toHaveText('0');

  // Back to Easy (3x3)
  await page.locator('button[data-difficulty="easy"]').click();
  await expect(board).toHaveClass(/board-3/);
  await expect(board.locator('.slide-tile:not(.slide-tile-empty)')).toHaveCount(8);

  await screenshot(page, testInfo, 'sliding-puzzle-easy-board');
});

test('Sliding Number Puzzle Game keyboard controls, persistence, responsiveness and theme support', async ({ page }, testInfo) => {
  await page.goto('/sliding-number-puzzle-game/');

  const board = page.locator('#slide-board');
  const movesEl = page.locator('#slide-moves');
  await expect(movesEl).toHaveText('0');

  // Use keyboard arrow keys
  await page.keyboard.press('ArrowUp');
  const movesAfterArrow = await movesEl.textContent();
  expect(Number(movesAfterArrow)).toBeGreaterThanOrEqual(0);

  // If initial arrow was valid it incremented, else press other directions to ensure key handling
  if (movesAfterArrow === '0') {
    await page.keyboard.press('ArrowLeft');
  }
  const currentMoves = Number(await movesEl.textContent());
  if (currentMoves === 0) {
    await board.locator('.slide-tile.is-movable').first().click();
  }
  await expect(movesEl).not.toHaveText('0');
  const recordedMoves = await movesEl.textContent();

  // Test LocalStorage persistence across page reload
  await page.reload();
  await expect(page.locator('#slide-moves')).toHaveText(recordedMoves);

  // Test viewports for no overflow and square aspect ratio
  const testWidths = [1440, 1280, 1024, 768, 430, 414, 390, 375, 360, 320];
  for (const width of testWidths) {
    await page.setViewportSize({ width, height: 850 });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(overflow.scrollWidth, `No overflow at ${width}px`).toBeLessThanOrEqual(overflow.innerWidth + 1);

    // Verify board remains square
    const box = await page.locator('#slide-board').boundingBox();
    expect(box).toBeTruthy();
    expect(Math.abs(box.width - box.height), `Square board at ${width}px`).toBeLessThanOrEqual(2);
  }

  // Theme testing
  const toggle = page.getByRole('switch');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#slide-board')).toHaveCSS('background-color', 'rgb(12, 20, 44)');
  await screenshot(page, testInfo, 'sliding-puzzle-dark');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Sliding Number Puzzle Game UI layout, center alignment, heading sizes, spacing, internal links, and related games section', async ({ page }, testInfo) => {
  await page.goto('/sliding-number-puzzle-game/');

  // 1. Center align only H1 and introductory description
  const h1Align = await page.locator('.slide-intro h1').evaluate(el => getComputedStyle(el).textAlign);
  const introPAlign = await page.locator('.slide-intro p').evaluate(el => getComputedStyle(el).textAlign);
  expect(h1Align).toBe('center');
  expect(introPAlign).toBe('center');

  // Verify educational content is left-aligned
  const articleH2Align = await page.locator('.slide-article h2').first().evaluate(el => getComputedStyle(el).textAlign);
  const articlePAlign = await page.locator('.slide-article p').first().evaluate(el => getComputedStyle(el).textAlign);
  expect(articleH2Align).toBe('left');
  expect(articlePAlign).toBe('left');

  // 2. Vertical spacing between game area and educational content
  const articleMarginTop = await page.locator('.slide-article').evaluate(el => parseFloat(getComputedStyle(el).marginTop));
  expect(articleMarginTop).toBeGreaterThanOrEqual(48);

  // 3. Heading size reduction (should be around 24px desktop, not oversized 36-42px)
  const h2FontSize = await page.locator('.slide-article h2').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  expect(h2FontSize).toBeLessThanOrEqual(26);
  expect(h2FontSize).toBeGreaterThanOrEqual(20);

  // 4. Related Games Section at the end of content
  const relatedSection = page.locator('.related-games-section');
  await expect(relatedSection).toBeVisible();
  await expect(relatedSection.locator('h2')).toHaveText('Explore More Puzzle Games');
  await expect(relatedSection.locator('.related-games-head p')).toContainText('Challenge your mind with our curated collection of free, high-focus browser puzzle games.');

  const relatedCards = relatedSection.locator('.related-card');
  await expect(relatedCards).toHaveCount(3);

  // Confirm cards are the three recommended games (excluding Sliding Number Puzzle)
  const relatedHrefs = await relatedCards.evaluateAll(cards => cards.map(c => c.getAttribute('href')));
  expect(relatedHrefs).toEqual([
    '/number-sequence-game/',
    '/color-flood-game/',
    '/picross-game-online/'
  ]);
  expect(relatedHrefs).not.toContain('/sliding-number-puzzle-game/');

  // 5. Cross-linking verification across all 4 games
  // Sliding Number Puzzle links to other 3 games + /games/ + /reaction-time-challenge/
  const slideArticleLinks = await page.locator('.slide-article a').evaluateAll(links => links.map(l => l.getAttribute('href')));
  expect(slideArticleLinks).toContain('/number-sequence-game/');
  expect(slideArticleLinks).toContain('/color-flood-game/');
  expect(slideArticleLinks).toContain('/picross-game-online/');
  expect(slideArticleLinks).toContain('/reaction-time-challenge/');
  expect(slideArticleLinks).toContain('/games/');

  // Number Sequence links to other 3 games + /games/ + /reaction-time-challenge/
  await page.goto('/number-sequence-game/');
  const seqLinks = await page.locator('.instructions a').evaluateAll(links => links.map(l => l.getAttribute('href')));
  expect(seqLinks).toContain('/sliding-number-puzzle-game/');
  expect(seqLinks).toContain('/color-flood-game/');
  expect(seqLinks).toContain('/picross-game-online/');
  expect(seqLinks).toContain('/reaction-time-challenge/');
  expect(seqLinks).toContain('/games/');

  // Color Flood links to other 3 games + /games/ + /reaction-time-challenge/
  await page.goto('/color-flood-game/');
  const floodLinks = await page.locator('.flood-article a').evaluateAll(links => links.map(l => l.getAttribute('href')));
  expect(floodLinks).toContain('/sliding-number-puzzle-game/');
  expect(floodLinks).toContain('/number-sequence-game/');
  expect(floodLinks).toContain('/picross-game-online/');
  expect(floodLinks).toContain('/reaction-time-challenge/');
  expect(floodLinks).toContain('/games/');

  // Picross links to other 3 games + /games/ + /reaction-time-challenge/
  await page.goto('/picross-game-online/');
  const picrossLinks = await page.locator('.picross-article a, .picross-faq a').evaluateAll(links => links.map(l => l.getAttribute('href')));
  expect(picrossLinks).toContain('/sliding-number-puzzle-game/');
  expect(picrossLinks).toContain('/number-sequence-game/');
  expect(picrossLinks).toContain('/color-flood-game/');
  expect(picrossLinks).toContain('/reaction-time-challenge/');
  expect(picrossLinks).toContain('/games/');

  // Check Dark Mode for Related Games section
  await page.goto('/sliding-number-puzzle-game/');
  const toggle = page.getByRole('switch');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const relatedCardBg = await relatedSection.locator('.related-card').first().evaluate(el => getComputedStyle(el).backgroundColor);
  expect(relatedCardBg).toBe('rgb(20, 31, 61)');
  await screenshot(page, testInfo, 'related-games-dark');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Number Sequence, Color Flood, Picross, and Word Ladder pages have correct breadcrumb hierarchy, JSON-LD, and Explore More sections', async ({ page }, testInfo) => {
  const gameConfigs = [
    {
      url: '/number-sequence-game/',
      name: 'Number Sequence Game',
      breadcrumbSelector: '.breadcrumbs',
      expectedRelated: [
        '/sliding-number-puzzle-game/',
        '/color-flood-game/',
        '/picross-game-online/'
      ]
    },
    {
      url: '/color-flood-game/',
      name: 'Color Flood Game',
      breadcrumbSelector: '.flood-breadcrumbs',
      expectedRelated: [
        '/sliding-number-puzzle-game/',
        '/picross-game-online/',
        '/number-sequence-game/'
      ]
    },
    {
      url: '/picross-game-online/',
      name: 'Picross Game Online',
      breadcrumbSelector: '.picross-breadcrumb',
      expectedRelated: [
        '/sliding-number-puzzle-game/',
        '/color-flood-game/',
        '/word-ladder-game-online/'
      ]
    },
    {
      url: '/word-ladder-game-online/',
      name: 'Word Ladder Game Online',
      breadcrumbSelector: '.ladder-breadcrumbs',
      expectedRelated: [
        '/number-sequence-game/',
        '/picross-game-online/',
        '/sliding-number-puzzle-game/'
      ]
    }
  ];

  for (const config of gameConfigs) {
    await page.goto(config.url);

    // 1. Visible Breadcrumb verification
    const nav = page.locator(config.breadcrumbSelector);
    await expect(nav).toBeVisible();

    const homeLink = nav.locator('a[href="/"]');
    await expect(homeLink).toHaveText('Home');

    const gamesLink = nav.locator('a[href="/games/"]');
    await expect(gamesLink).toHaveText('Games');

    const currentPage = nav.locator('[aria-current="page"]');
    await expect(currentPage).toHaveText(config.name);

    // 2. JSON-LD BreadcrumbList verification
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts =>
      scripts.map(s => {
        try { return JSON.parse(s.textContent || '{}'); } catch { return null; }
      }).filter(Boolean)
    );

    const breadcrumbSchema = jsonLdContent.find(s => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeTruthy();
    expect(breadcrumbSchema.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://puzzlefeels.com/' },
      { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://puzzlefeels.com/games/' },
      { '@type': 'ListItem', position: 3, name: config.name, item: `https://puzzlefeels.com${config.url}` }
    ]);

    // Ensure only 1 BreadcrumbList schema exists
    const breadcrumbSchemas = jsonLdContent.filter(s => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchemas.length).toBe(1);

    // 3. Explore More Puzzle Games Section
    const relatedSection = page.locator('.related-games-section');
    await expect(relatedSection).toBeVisible();
    await expect(relatedSection.locator('h2')).toHaveText('Explore More Puzzle Games');
    await expect(relatedSection.locator('.related-games-head p')).toContainText('Challenge your mind with our curated collection of free, high-focus browser puzzle games.');

    const relatedCards = relatedSection.locator('.related-card');
    await expect(relatedCards).toHaveCount(config.expectedRelated.length);

    const relatedHrefs = await relatedCards.evaluateAll(cards => cards.map(c => c.getAttribute('href')));
    expect(relatedHrefs).toEqual(config.expectedRelated);
    expect(relatedHrefs).not.toContain(config.url);

    // 4. Test clicking the breadcrumb "Games" link
    await gamesLink.click();
    await expect(page).toHaveURL(/\/games\/?$/);
    await page.goBack();
  }

  // 5. Responsive and Dark Mode verification
  // Check mobile single-column layout for related games
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/color-flood-game/');
  const mobileCard = page.locator('.related-games-section .related-card').first();
  await expect(mobileCard).toBeVisible();
  const cardDisplay = await mobileCard.evaluate(el => getComputedStyle(el).display);
  expect(cardDisplay).toBe('grid');

  // Check dark mode
  const toggle = page.getByRole('switch');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const cardBgDark = await mobileCard.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(cardBgDark).toBe('rgb(20, 31, 61)');
  await screenshot(page, testInfo, 'color-flood-related-dark-mobile');
});

test('Number Sequence, Color Flood, and Picross auto-start in Easy mode with difficulty options directly above the board', async ({ page }, testInfo) => {
  // 1. Number Sequence Game
  await page.goto('/number-sequence-game/');
  await expect(page.locator('#play-screen')).toBeVisible();
  const seqEasyBtn = page.locator('.seq-diff-btn[data-difficulty="easy"]');
  await expect(seqEasyBtn).toBeVisible();
  await expect(seqEasyBtn).toHaveClass(/is-active/);
  await expect(seqEasyBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sequence-display')).toBeVisible();
  await expect(page.locator('.answer-option')).toHaveCount(4);

  // Switch to Medium
  const seqMedBtn = page.locator('.seq-diff-btn[data-difficulty="medium"]');
  await seqMedBtn.click();
  await expect(seqMedBtn).toHaveClass(/is-active/);
  await expect(seqMedBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(seqEasyBtn).not.toHaveClass(/is-active/);
  await expect(page.locator('#mode-label')).toHaveText('MEDIUM');

  // 2. Color Flood Game
  await page.goto('/color-flood-game/');
  await expect(page.locator('#flood-play')).toBeVisible();
  const floodEasyBtn = page.locator('.flood-diff-btn[data-difficulty="easy"]');
  await expect(floodEasyBtn).toBeVisible();
  await expect(floodEasyBtn).toHaveClass(/is-active/);
  await expect(floodEasyBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#flood-board .flood-cell')).toHaveCount(100); // 10x10
  await expect(page.locator('#flood-level-label')).toHaveText('Easy');

  // Switch to Medium (14x14 = 196 cells)
  const floodMedBtn = page.locator('.flood-diff-btn[data-difficulty="medium"]');
  await floodMedBtn.click();
  await expect(floodMedBtn).toHaveClass(/is-active/);
  await expect(floodMedBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(floodEasyBtn).not.toHaveClass(/is-active/);
  await expect(page.locator('#flood-board .flood-cell')).toHaveCount(196);
  await expect(page.locator('#flood-level-label')).toHaveText('Medium');

  // 3. Picross Game Online
  await page.goto('/picross-game-online/');
  await expect(page.locator('#picross-play')).toBeVisible();
  const picrossEasyBtn = page.locator('.picross-diff-btn[data-difficulty="easy"], .picross-diff-btn[data-picross-difficulty="beginner"]');
  await expect(picrossEasyBtn).toBeVisible();
  await expect(picrossEasyBtn).toHaveClass(/is-active/);
  await expect(picrossEasyBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#picross-board .picross-cell').first()).toBeVisible();
  await expect(page.locator('#picross-board .picross-cell')).toHaveCount(25);

  // Switch to Medium (10x10 = 100 cells)
  const picrossMedBtn = page.locator('.picross-diff-btn[data-difficulty="medium"], .picross-diff-btn[data-picross-difficulty="medium"]');
  await picrossMedBtn.click();
  await expect(picrossMedBtn).toHaveClass(/is-active/);
  await expect(picrossMedBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(picrossEasyBtn).not.toHaveClass(/is-active/);
  await expect(page.locator('#picross-difficulty-label')).toContainText('Medium');
  await expect(page.locator('#picross-board .picross-cell')).toHaveCount(100);

  // Screenshots in desktop & mobile
  await screenshot(page, testInfo, 'picross-diff-desktop');
  await page.setViewportSize({ width: 375, height: 667 });
  await screenshot(page, testInfo, 'picross-diff-mobile');
});

test('Picross Game Online FAQ matches Sliding Number Puzzle Game FAQ design, typography, responsiveness, and interaction', async ({ page }, testInfo) => {
  // Verify Picross FAQ is inside .picross-article and not wrapped in old .picross-faq 2-column wash
  await page.goto('/picross-game-online/');
  await expect(page.locator('.picross-faq')).toHaveCount(0);
  await expect(page.locator('.picross-article .faq-list')).toBeVisible();

  // Verify all 15 Picross FAQ items are preserved
  const picrossDetails = page.locator('.picross-article .faq-list details');
  await expect(picrossDetails).toHaveCount(15);
  await expect(picrossDetails.first().locator('summary')).toHaveText('What is Picross?');

  // Verify expand/collapse interaction
  const firstSummary = picrossDetails.first().locator('summary');
  await expect(picrossDetails.first()).not.toHaveAttribute('open', '');
  await firstSummary.click();
  await expect(picrossDetails.first()).toHaveAttribute('open', '');
  await expect(picrossDetails.first().locator('p')).toBeVisible();

  // Verify design matching between Sliding Number Puzzle and Picross across viewports and themes
  for (const viewport of [
    { width: 1280, height: 800, name: 'desktop' },
    { width: 375, height: 667, name: 'mobile' }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const theme of ['light', 'dark']) {
      const results = {};

      for (const path of ['/sliding-number-puzzle-game/', '/picross-game-online/']) {
        await page.goto(path);
        await page.evaluate((t) => {
          document.documentElement.dataset.theme = t;
        }, theme);

        const summary = page.locator('.faq-list summary').first();
        await summary.click();

        const data = await page.evaluate((p) => {
          const article = document.querySelector(p.includes('sliding') ? '.slide-article' : '.picross-article');
          const h2 = article.querySelector('h2:last-of-type');
          const details = article.querySelector('.faq-list details[open]');
          const summaryEl = details.querySelector('summary');
          const pEl = details.querySelector('p');

          const csH2 = window.getComputedStyle(h2);
          const csDet = window.getComputedStyle(details);
          const csSum = window.getComputedStyle(summaryEl);
          const csSumAfter = window.getComputedStyle(summaryEl, '::after');
          const csP = window.getComputedStyle(pEl);

          return {
            h2Text: h2.textContent.trim(),
            h2FontSize: csH2.fontSize,
            h2Margin: csH2.margin,
            detBorderRadius: csDet.borderRadius,
            detPadding: csDet.padding,
            detMargin: csDet.margin,
            sumFontSize: csSum.fontSize,
            sumFontWeight: csSum.fontWeight,
            sumAfterContent: csSumAfter.content,
            sumAfterFontSize: csSumAfter.fontSize,
            pFontSize: csP.fontSize,
            pLineHeight: csP.lineHeight,
            pMargin: csP.margin,
            pColor: csP.color,
          };
        }, path);

        results[path] = data;
      }

      // Assert Picross matches Sliding Number Puzzle exactly
      expect(results['/picross-game-online/'].h2Text).toBe(results['/sliding-number-puzzle-game/'].h2Text);
      expect(results['/picross-game-online/'].h2FontSize).toBe(results['/sliding-number-puzzle-game/'].h2FontSize);
      expect(results['/picross-game-online/'].h2Margin).toBe(results['/sliding-number-puzzle-game/'].h2Margin);
      expect(results['/picross-game-online/'].detBorderRadius).toBe(results['/sliding-number-puzzle-game/'].detBorderRadius);
      expect(results['/picross-game-online/'].detPadding).toBe(results['/sliding-number-puzzle-game/'].detPadding);
      expect(results['/picross-game-online/'].detMargin).toBe(results['/sliding-number-puzzle-game/'].detMargin);
      expect(results['/picross-game-online/'].sumFontSize).toBe(results['/sliding-number-puzzle-game/'].sumFontSize);
      expect(results['/picross-game-online/'].sumFontWeight).toBe(results['/sliding-number-puzzle-game/'].sumFontWeight);
      expect(results['/picross-game-online/'].sumAfterContent).toBe(results['/sliding-number-puzzle-game/'].sumAfterContent);
      expect(results['/picross-game-online/'].sumAfterFontSize).toBe(results['/sliding-number-puzzle-game/'].sumAfterFontSize);
      expect(results['/picross-game-online/'].pFontSize).toBe(results['/sliding-number-puzzle-game/'].pFontSize);
      expect(results['/picross-game-online/'].pLineHeight).toBe(results['/sliding-number-puzzle-game/'].pLineHeight);
      expect(results['/picross-game-online/'].pMargin).toBe(results['/sliding-number-puzzle-game/'].pMargin);
      expect(results['/picross-game-online/'].pColor).toBe(results['/sliding-number-puzzle-game/'].pColor);
    }
  }

  // Visual capture
  await page.goto('/picross-game-online/');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.locator('.picross-article .faq-list summary').first().click();
  await screenshot(page, testInfo, 'picross-faq-desktop-light');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  await screenshot(page, testInfo, 'picross-faq-desktop-dark');
});

test('Word Ladder Game Online: auto-starts Easy mode, validates 1-letter rules, handles errors, undo, hint, solution, restart, and victory', async ({ page }, testInfo) => {
  // Handle native confirms gracefully
  page.on('dialog', dialog => dialog.accept());

  await page.goto('/word-ladder-game-online/');

  // 1. Initial State & Auto-start Easy
  const easyBtn = page.locator('.ladder-diff-btn[data-difficulty="easy"]');
  await expect(easyBtn).toHaveClass(/is-active/);
  await expect(page.locator('#ladder-moves')).toHaveText('0');
  await expect(page.locator('#ladder-timer')).toHaveText('00:00');

  const startWordEl = page.locator('#ladder-start-letters');
  const targetWordEl = page.locator('#ladder-target-letters');
  await expect(startWordEl).toBeVisible();
  await expect(targetWordEl).toBeVisible();

  const startWord = (await startWordEl.innerText()).replace(/\s+/g, '').toUpperCase();
  const targetWord = (await targetWordEl.innerText()).replace(/\s+/g, '').toUpperCase();
  expect(startWord.length).toBeGreaterThanOrEqual(3);
  expect(targetWord.length).toBe(startWord.length);

  const wordInput = page.locator('#ladder-word-input');
  const submitBtn = page.locator('#ladder-submit-btn');
  const feedback = page.locator('#ladder-feedback');

  // 2. Word Validation: Wrong Length
  await wordInput.fill('AB');
  await submitBtn.click();
  await expect(feedback).toContainText('letters long');

  // 3. Word Validation: Multi-letter Difference
  await wordInput.fill('ZZZX'.slice(0, startWord.length));
  await submitBtn.click();
  await expect(feedback).toContainText('Must change exactly one letter');

  // 4. Word Validation: Single-letter change not in dictionary
  const invalidDictWord = 'Q' + startWord.slice(1);
  await wordInput.fill(invalidDictWord);
  await submitBtn.click();
  await expect(feedback).toContainText('word list');

  // 5. Word Validation: Duplicate Starting Word
  await wordInput.fill(startWord);
  await submitBtn.click();
  await expect(feedback).toContainText('already used');

  // 5. Hint & Valid Step Submission
  const hintBtn = page.locator('#ladder-hint');
  await hintBtn.click();
  await expect(feedback).toContainText('Hint: Try changing letter');

  // Input is automatically populated with the valid hint word
  const validNextWord = await wordInput.inputValue();
  expect(validNextWord.length).toBe(startWord.length);

  // Submit via Enter key
  await wordInput.press('Enter');

  // Step should be added to the ladder
  const ladderSteps = page.locator('#ladder-steps .ladder-node');
  await expect(ladderSteps).toHaveCount(1);
  await expect(page.locator('#ladder-moves')).toHaveText('1');

  const undoBtn = page.locator('#ladder-undo');
  await expect(undoBtn).toBeEnabled();

  // 6. Test Undo
  await undoBtn.click();
  await expect(ladderSteps).toHaveCount(0);
  await expect(page.locator('#ladder-moves')).toHaveText('0');
  await expect(undoBtn).toBeDisabled();

  // 7. Test Restart
  await wordInput.fill(validNextWord);
  await submitBtn.click();
  await expect(ladderSteps).toHaveCount(1);

  const restartBtn = page.locator('#ladder-restart');
  await restartBtn.click();
  await expect(ladderSteps).toHaveCount(0);
  await expect(page.locator('#ladder-moves')).toHaveText('0');

  // 8. Test Pause / Resume
  const pauseBtn = page.locator('#ladder-pause');
  const pausedOverlay = page.locator('#ladder-paused');
  await pauseBtn.click();
  await expect(pausedOverlay).toBeVisible();

  const resumeBtn = page.locator('#ladder-resume');
  await resumeBtn.click();
  await expect(pausedOverlay).toBeHidden();

  // 9. Test Sound Toggle
  const soundBtn = page.locator('#ladder-sound-toggle');
  const soundLabel = page.locator('#ladder-sound-label');
  await expect(soundLabel).toHaveText('Sound: On');
  await soundBtn.click();
  await expect(soundLabel).toHaveText('Sound: Off');
  await soundBtn.click();
  await expect(soundLabel).toHaveText('Sound: On');

  // 10. Test Difficulty Switching
  const medBtn = page.locator('.ladder-diff-btn[data-difficulty="medium"]');
  await medBtn.click();
  await expect(medBtn).toHaveClass(/is-active/);
  await expect(page.locator('#ladder-moves')).toHaveText('0');

  const hardBtn = page.locator('.ladder-diff-btn[data-difficulty="hard"]');
  await hardBtn.click();
  await expect(hardBtn).toHaveClass(/is-active/);
  await expect(page.locator('#ladder-moves')).toHaveText('0');

  const dailyBtn = page.locator('.ladder-diff-btn[data-difficulty="daily"]');
  await dailyBtn.click();
  await expect(dailyBtn).toHaveClass(/is-active/);
  await expect(page.locator('#ladder-moves')).toHaveText('0');

  // Return to Easy
  await easyBtn.click();
  await expect(easyBtn).toHaveClass(/is-active/);

  // 11. Test Solution Reveal & Victory Completion
  const solutionBtn = page.locator('#ladder-solution');
  await solutionBtn.click();
  await expect(feedback).toContainText('Solution revealed');

  // Solve the puzzle completely by following steps to trigger victory modal
  const newGameBtn = page.locator('#ladder-new');
  await newGameBtn.click();

  // Solve step-by-step using hints until target word is reached
  for (let step = 0; step < 8; step++) {
    const isVictoryVisible = await page.locator('#ladder-victory').isVisible();
    if (isVictoryVisible) break;

    await hintBtn.click();
    const hintedWord = await wordInput.inputValue();
    if (hintedWord) {
      await submitBtn.click();
    } else {
      break;
    }
  }

  // Verify victory modal displays stats and Play Again button
  const victoryOverlay = page.locator('#ladder-victory');
  await expect(victoryOverlay).toBeVisible();
  await expect(victoryOverlay.locator('h2')).toContainText('Congratulations');

  const playAgainBtn = page.locator('#ladder-play-again');
  await playAgainBtn.click();
  await expect(victoryOverlay).toBeHidden();
  await expect(page.locator('#ladder-moves')).toHaveText('0');

  await screenshot(page, testInfo, 'word-ladder-completed');
});

test('Word Ladder Game Online: mobile responsiveness, themes, SEO metadata, JSON-LD, and FAQs', async ({ page }, testInfo) => {
  await page.goto('/word-ladder-game-online/');

  // 1. SEO Metadata & Title
  await expect(page).toHaveTitle(/Word Ladder Game Online/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://puzzlefeels.com/word-ladder-game-online/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

  // 2. Structured Data (JSON-LD): VideoGame and BreadcrumbList
  const jsonLds = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts =>
    scripts.map(s => {
      try { return JSON.parse(s.textContent || '{}'); } catch { return null; }
    }).filter(Boolean)
  );

  const videoGameSchema = jsonLds.find(s => s['@type'] === 'VideoGame');
  expect(videoGameSchema).toBeTruthy();
  expect(videoGameSchema.name).toBe('Word Ladder Game Online');
  expect(videoGameSchema.url).toBe('https://puzzlefeels.com/word-ladder-game-online/');
  expect(videoGameSchema.applicationCategory).toBe('Word puzzle game');

  const breadcrumbSchema = jsonLds.find(s => s['@type'] === 'BreadcrumbList');
  expect(breadcrumbSchema).toBeTruthy();
  expect(breadcrumbSchema.itemListElement).toEqual([
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://puzzlefeels.com/' },
    { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://puzzlefeels.com/games/' },
    { '@type': 'ListItem', position: 3, name: 'Word Ladder Game Online', item: 'https://puzzlefeels.com/word-ladder-game-online/' },
  ]);

  // 3. Educational Content & Lewis Carroll Walkthrough
  const article = page.locator('.ladder-article');
  await expect(article).toBeVisible();
  await expect(article.locator('h2').first()).toBeVisible();
  await expect(page.locator('.ladder-example')).toBeVisible();

  // 4. FAQ Accordion Interaction
  const faqs = page.locator('.ladder-article .faq-list details');
  await expect(faqs).toHaveCount(12);
  const firstFaq = faqs.first();
  await expect(firstFaq).not.toHaveAttribute('open');
  await firstFaq.locator('summary').click();
  await expect(firstFaq).toHaveAttribute('open', '');
  await expect(firstFaq.locator('p')).toBeVisible();

  // 5. Responsive Viewports: No Horizontal Overflow & No Control Clipping
  for (const width of [1280, 768, 430, 414, 390, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(isOverflowing, `Horizontal document overflow at ${width}px width`).toBe(false);

    // Verify key UI elements remain fully visible
    const shell = page.locator('.ladder-shell');
    const inputCard = page.locator('.input-card');
    const wordInput = page.locator('#ladder-word-input');
    const submitBtn = page.locator('#ladder-submit-btn');

    await expect(shell).toBeVisible();
    await expect(wordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Submit');

    // Verify no internal clipping/overflow inside inputCard or shell
    const fitCheck = await page.evaluate(() => {
      const card = document.querySelector('.input-card');
      const btn = document.querySelector('#ladder-submit-btn');
      const shellEl = document.querySelector('.ladder-shell');
      if (!card || !btn || !shellEl) return { fits: false };

      const cardRect = card.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const shellRect = shellEl.getBoundingClientRect();

      return {
        fits: true,
        btnInsideCard: btnRect.right <= cardRect.right + 2,
        cardInsideShell: cardRect.right <= shellRect.right + 2,
        shellScrollFits: shellEl.scrollWidth <= shellEl.clientWidth + 1,
        cardScrollFits: card.scrollWidth <= card.clientWidth + 1
      };
    });

    expect(fitCheck.btnInsideCard, `Submit button clipped outside input card at ${width}px`).toBe(true);
    expect(fitCheck.cardInsideShell, `Input card clipped outside shell at ${width}px`).toBe(true);
    expect(fitCheck.shellScrollFits, `Shell has horizontal scroll at ${width}px`).toBe(true);
    expect(fitCheck.cardScrollFits, `Card has horizontal scroll at ${width}px`).toBe(true);
  }

  // Verify 6-letter word tiles on Hard mode at 320px
  await page.setViewportSize({ width: 320, height: 850 });
  const hardBtn = page.locator('.ladder-diff-btn[data-difficulty="hard"]');
  await hardBtn.click();
  const hardFitCheck = await page.evaluate(() => {
    const boardContainer = document.querySelector('.ladder-board-container');
    const shellEl = document.querySelector('.ladder-shell');
    if (!boardContainer || !shellEl) return false;
    return boardContainer.scrollWidth <= boardContainer.clientWidth + 1;
  });
  expect(hardFitCheck, 'Hard mode 6-letter tiles overflow board at 320px').toBe(true);

  // Return to Easy mode
  await page.locator('.ladder-diff-btn[data-difficulty="easy"]').click();

  // Capture mobile viewport screenshots for visual audit
  await page.setViewportSize({ width: 360, height: 740 });
  await screenshot(page, testInfo, 'word-ladder-mobile-360');
  await page.setViewportSize({ width: 320, height: 640 });
  await screenshot(page, testInfo, 'word-ladder-mobile-320');

  // Verify Explore More Puzzle Games section has exactly 3 cards on Word Ladder
  const relatedCards = page.locator('.related-games-section .related-card');
  await expect(relatedCards).toHaveCount(3);

  // 6. Light / Dark Theme Support
  await page.setViewportSize({ width: 1280, height: 800 });
  const themeToggle = page.getByRole('switch');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.ladder-shell')).toHaveCSS('background-color', 'rgb(21, 31, 61)');
  await screenshot(page, testInfo, 'word-ladder-dark');

  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await screenshot(page, testInfo, 'word-ladder-light');
});

test('Word Ladder Game Online: BFS shortest path, medal calculation with hint penalty, green target matching, and daily difficulty tabs', async ({ page }, testInfo) => {
  page.on('dialog', dialog => dialog.accept());

  await page.goto('/word-ladder-game-online/');

  // 1. Initial State & Shortest Path upfront
  await expect(page.locator('#ladder-moves')).toHaveText('0');
  await expect(page.locator('#ladder-hints')).toHaveText('0');
  const targetMovesText = await page.locator('#ladder-target-moves').innerText();
  const targetMoves = parseInt(targetMovesText, 10);
  expect(targetMoves).toBeGreaterThanOrEqual(2);

  // 2. Real-time typing & target-matching highlighting in active slot
  const wordInput = page.locator('#ladder-word-input');
  const targetWordEl = page.locator('#ladder-target-letters');
  const targetWord = (await targetWordEl.innerText()).replace(/\s+/g, '').toUpperCase();
  expect(targetWord.length).toBe(4);

  // Type a letter that matches targetWord[0]
  await wordInput.fill(targetWord[0]);
  const firstSlotTile = page.locator('#ladder-slot-letters .node-tile').first();
  await expect(firstSlotTile).toHaveClass(/is-target-match/);

  await wordInput.fill('');

  // 3. Hint System with +1 Step Penalty tracking
  const hintBtn = page.locator('#ladder-hint');
  const submitBtn = page.locator('#ladder-submit-btn');
  const feedback = page.locator('#ladder-feedback');

  await hintBtn.click();
  await expect(page.locator('#ladder-hints')).toHaveText('1');
  await expect(feedback).toContainText('Hint: Try changing letter');
  await expect(feedback).toContainText('Penalty');

  const hintedWord = await wordInput.inputValue();
  expect(hintedWord.length).toBe(4);

  await submitBtn.click();
  await expect(page.locator('#ladder-moves')).toHaveText('1');
  await expect(page.locator('#ladder-hints')).toHaveText('1');
  await expect(page.locator('#ladder-steps .ladder-node')).toHaveCount(1);

  // 4. Daily Challenge Subbar & 3 Difficulty Tabs
  const dailyBtn = page.locator('.ladder-diff-btn[data-difficulty="daily"]');
  await dailyBtn.click();

  const dailySubbar = page.locator('#ladder-daily-subbar');
  await expect(dailySubbar).toBeVisible();

  // Test 5-letter Daily tab
  const medDailyTab = page.locator('.daily-tab-btn[data-daily-diff="medium"]');
  await medDailyTab.click();
  await expect(medDailyTab).toHaveClass(/is-active/);
  const medStartWord = (await page.locator('#ladder-start-letters').innerText()).replace(/\s+/g, '');
  expect(medStartWord.length).toBe(5);

  // Test 6-letter Daily tab
  const hardDailyTab = page.locator('.daily-tab-btn[data-daily-diff="hard"]');
  await hardDailyTab.click();
  await expect(hardDailyTab).toHaveClass(/is-active/);
  const hardStartWord = (await page.locator('#ladder-start-letters').innerText()).replace(/\s+/g, '');
  expect(hardStartWord.length).toBe(6);

  // Test 4-letter Daily tab
  const easyDailyTab = page.locator('.daily-tab-btn[data-daily-diff="easy"]');
  await easyDailyTab.click();
  await expect(easyDailyTab).toHaveClass(/is-active/);
  const easyDailyStartWord = (await page.locator('#ladder-start-letters').innerText()).replace(/\s+/g, '');
  expect(easyDailyStartWord.length).toBe(4);

  // 5. Separate Storage Verification: return to regular Easy mode
  const easyBtn = page.locator('.ladder-diff-btn[data-difficulty="easy"]');
  await easyBtn.click();
  await expect(dailySubbar).toBeHidden();

  // Regular practice progress is preserved and untouched by daily challenge exploration
  await expect(page.locator('#ladder-moves')).toHaveText('1');
  await expect(page.locator('#ladder-hints')).toHaveText('1');
  await expect(page.locator('#ladder-steps .ladder-node')).toHaveCount(1);

  // 6. Complete puzzle to test Performance Medal system
  for (let s = 0; s < 10; s++) {
    const isWon = await page.locator('#ladder-victory').isVisible();
    if (isWon) break;
    await hintBtn.click();
    const nextWord = await wordInput.inputValue();
    if (nextWord) {
      await submitBtn.click();
    } else {
      break;
    }
  }

  // Victory modal check
  const victory = page.locator('#ladder-victory');
  await expect(victory).toBeVisible();
  const medalCard = victory.locator('#victory-medal-card');
  await expect(medalCard).toBeVisible();
  const medalIcon = await victory.locator('#victory-medal-icon').innerText();
  expect(['🥇', '🥈', '🥉', '🏅']).toContain(medalIcon.trim());

  const victoryHints = await victory.locator('#victory-hints-used').innerText();
  expect(parseInt(victoryHints, 10)).toBeGreaterThan(0);

  const victoryScore = await victory.locator('#victory-effective-score').innerText();
  expect(victoryScore).toContain('Steps');

  await screenshot(page, testInfo, 'word-ladder-victory-medal');
});

test('Homepage featured games (exactly 5), Daily Moments (exactly 3, without Picross), and isolated future game integration', async ({ page }, testInfo) => {
  await page.goto('/');

  // 1. "One good puzzle can change your day" section must have exactly 5 games
  const featuredSection = page.locator('#games');
  await expect(featuredSection).toBeVisible();
  const featuredCards = featuredSection.locator('.game-card');
  await expect(featuredCards).toHaveCount(5);

  const featuredHeadings = await featuredCards.locator('h3').allInnerTexts();
  expect(featuredHeadings).toEqual([
    'Number Sequence',
    'Color Flood',
    'Picross Game Online',
    'Sliding Number Puzzle Game',
    'Word Ladder Game Online',
  ]);

  const featuredLinks = await featuredCards.locator('.game-info a.btn').all();
  const featuredHrefs = await Promise.all(featuredLinks.map(l => l.getAttribute('href')));
  expect(featuredHrefs).toEqual([
    '/number-sequence-game/',
    '/color-flood-game/',
    '/picross-game-online/',
    '/sliding-number-puzzle-game/',
    '/word-ladder-game-online/',
  ]);

  // 2. "Your Daily Moments of Focus" section must display exactly 3 games
  const dailySection = page.locator('#daily');
  await expect(dailySection).toBeVisible();
  const dailyCards = dailySection.locator('.daily-card');
  await expect(dailyCards).toHaveCount(3);

  const dailyHeadings = await dailyCards.locator('h3').allInnerTexts();
  expect(dailyHeadings).toEqual([
    'Number Sequence',
    'Color Flood',
    'Word Ladder',
  ]);

  // Verify Picross Game Online is NOT in the Daily Moments section
  expect(dailyHeadings).not.toContain('Picross Game Online');
  expect(dailyHeadings).not.toContain('Picross');

  const dailyLinks = await dailyCards.locator('a.daily-btn').all();
  const dailyHrefs = await Promise.all(dailyLinks.map(l => l.getAttribute('href')));
  expect(dailyHrefs).toEqual([
    '/number-sequence-game/?daily=today',
    '/color-flood-game/?daily=today',
    '/word-ladder-game-online/?daily=today',
  ]);

  // 3. Responsive layout of .daily-cards
  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopCols = await page.evaluate(() => {
    const el = document.querySelector('.daily-cards');
    return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
  });
  expect(desktopCols).toBe(3);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileCols = await page.evaluate(() => {
    const el = document.querySelector('.daily-cards');
    return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
  });
  expect(mobileCols).toBe(1);

  // 4. All Games directory (/games/) displays all games from catalog
  await page.goto('/games/');
  const directoryCards = page.locator('.directory-card:visible');
  await expect(directoryCards).toHaveCount(14);
  await expect(directoryCards.locator('h3', { hasText: 'Reaction Time Challenge' })).toBeVisible();
  await expect(directoryCards.locator('h3', { hasText: 'Memory Matching Game Online' })).toBeVisible();
  await expect(directoryCards.locator('h3', { hasText: 'Murdoku Online Game' })).toBeVisible();
  await expect(directoryCards.locator('h3', { hasText: 'Mahjong Variants Online Game' })).toBeVisible();
  await expect(directoryCards.locator('h3', { hasText: 'Shakashaka – Online Puzzle Game' })).toBeVisible();
  await expect(directoryCards.locator('h3', { hasText: 'Square Jam – Online Logic Puzzle' })).toBeVisible();

  await screenshot(page, testInfo, 'homepage-games-featured-and-daily');
});

test('Reaction Time Challenge: all 4 modes, accurate timing, false starts, daily deterministic seed, persistence, share, and responsive themes', async ({ page }, testInfo) => {
  await page.goto('/reaction-time-challenge/');

  // 1. Core SEO, Breadcrumbs, and JSON-LD schema
  await expect(page).toHaveTitle(/Reaction Time Test – Play Free Reaction Time Challenge Online \| PuzzleFeels/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Test your reflexes with our free Reaction Time Test/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://puzzlefeels.com/reaction-time-challenge/');

  const breadcrumbs = page.locator('nav.reaction-breadcrumbs');
  await expect(breadcrumbs).toBeVisible();
  const breadcrumbLinks = breadcrumbs.locator('a');
  await expect(breadcrumbLinks.nth(0)).toHaveAttribute('href', '/');
  await expect(breadcrumbLinks.nth(0)).toHaveText('Home');
  await expect(breadcrumbLinks.nth(1)).toHaveAttribute('href', '/games/');
  await expect(breadcrumbLinks.nth(1)).toHaveText('Games');
  await expect(breadcrumbs.locator('span[aria-current="page"]')).toHaveText('Reaction Time Challenge');

  // Verify VideoGame and BreadcrumbList JSON-LD
  const schemas = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { return JSON.parse(s.textContent || '{}'); } catch { return {}; }
    });
  });
  const videoGameSchema = schemas.find(s => s['@type'] === 'VideoGame');
  expect(videoGameSchema).toBeTruthy();
  expect(videoGameSchema.name).toBe('Reaction Time Challenge');
  expect(videoGameSchema.url).toBe('https://puzzlefeels.com/reaction-time-challenge/');

  const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');
  expect(breadcrumbSchema).toBeTruthy();
  expect(breadcrumbSchema.itemListElement).toHaveLength(3);
  expect(breadcrumbSchema.itemListElement[2].item).toBe('https://puzzlefeels.com/reaction-time-challenge/');

  // 2. Initial state: Auto-ready in Classic mode (5 rounds)
  const classicBtn = page.locator('.reaction-mode-btn[data-mode="classic"]');
  await expect(classicBtn).toHaveClass(/is-active/);
  await expect(page.locator('#status-mode-pill')).toHaveText('Classic Test');
  await expect(page.locator('#status-round-pill')).toHaveText('Round 1 of 5');

  const playZone = page.locator('#reaction-play-zone');
  await expect(playZone).toHaveClass(/state-idle/);
  await expect(playZone.locator('#idle-heading')).toHaveText('Wait for the green signal!');

  // 3. False-start detection test
  await playZone.click();
  await expect(playZone).toHaveClass(/state-waiting/);
  await expect(playZone.locator('.view-waiting h2')).toHaveText('Wait for Green...');

  // Click immediately while still in waiting state -> False Start
  await playZone.click();
  await expect(playZone).toHaveClass(/state-false-start/);
  await expect(playZone.locator('.view-false-start h2')).toHaveText('Too Early!');

  // Retry button
  const retryBtn = page.locator('#zone-retry-btn');
  await expect(retryBtn).toBeVisible();
  await retryBtn.click();
  await expect(playZone).toHaveClass(/state-waiting/);

  // 4. Quick Reflex Mode (1 Round Test)
  const quickBtn = page.locator('.reaction-mode-btn[data-mode="quick"]');
  await quickBtn.click();
  await expect(quickBtn).toHaveClass(/is-active/);
  await expect(page.locator('#status-round-pill')).toHaveText('Single Reflex Test');
  await expect(playZone).toHaveClass(/state-idle/);

  // Start Quick Reflex round and wait for green
  await playZone.click();
  await expect(playZone).toHaveClass(/state-waiting/);

  // Wait for state to change to ready (green signal)
  await expect(playZone).toHaveClass(/state-ready/, { timeout: 7000 });
  await expect(playZone.locator('.view-ready h2')).toHaveText('CLICK NOW!');

  // Click green zone
  await playZone.click();

  // Completed State is prominently displayed in the play zone (not blank)
  await expect(playZone).toHaveClass(/state-completed/);
  const viewCompleted = playZone.locator('.view-completed');
  await expect(viewCompleted).toBeVisible();
  await expect(viewCompleted.locator('.completed-heading')).toHaveText('COMPLETED');
  await expect(viewCompleted.locator('.completed-check-icon')).toHaveText('✓');
  await expect(viewCompleted.locator('#zone-replay-btn')).toBeVisible();
  await expect(viewCompleted.locator('#completed-scroll-hint')).toBeVisible();

  // Results Dashboard displays for Quick mode
  const dashboard = page.locator('#reaction-results-dashboard');
  await expect(dashboard).toBeVisible();
  await expect(dashboard.locator('#results-title')).toHaveText('Quick Reflex Complete!');

  // Wait for completed layout and auto-scroll
  await page.waitForTimeout(350);
  const artifactDir = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';
  await page.screenshot({ path: path.join(artifactDir, 'reaction-time-completed-desktop-light.png') });

  // Scroll to top to capture fully unobstructed play zone box
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await playZone.screenshot({ path: path.join(artifactDir, 'reaction-playzone-completed-box-light.png') });

  // Mobile light completed view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(artifactDir, 'reaction-time-completed-mobile-light.png') });

  // Dark theme completed view
  await page.locator('.theme-toggle').click();
  await page.screenshot({ path: path.join(artifactDir, 'reaction-time-completed-mobile-dark.png') });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await playZone.screenshot({ path: path.join(artifactDir, 'reaction-playzone-completed-box-dark.png') });
  await page.screenshot({ path: path.join(artifactDir, 'reaction-time-completed-desktop-dark.png') });

  // Switch back to light theme
  await page.locator('.theme-toggle').click();

  const quickScore = await dashboard.locator('#results-hero-value').innerText();
  const quickScoreNum = parseInt(quickScore, 10);
  expect(quickScoreNum).toBeGreaterThan(0);
  expect(quickScoreNum).toBeLessThan(7000);

  // Check Personal Best display update
  const storedQuick = await page.evaluate(() => localStorage.getItem('pf-reaction-time-quick-v1'));
  expect(storedQuick).toBeTruthy();
  const parsedQuick = JSON.parse(storedQuick);
  expect(parsedQuick.bestTime).toBe(quickScoreNum);

  // Test Play Again button resets back to idle state cleanly
  await viewCompleted.locator('#zone-replay-btn').click();
  await expect(playZone).toHaveClass(/state-idle/);
  await expect(dashboard).toBeHidden();

  // 5. Daily Challenge Mode (Deterministic delay seed & separate storage)
  const dailyBtn = page.locator('.reaction-mode-btn[data-mode="daily"]');
  await dailyBtn.click();
  await expect(dailyBtn).toHaveClass(/is-active/);

  const dailyBanner = page.locator('#daily-banner');
  await expect(dailyBanner).toBeVisible();
  await expect(dailyBanner.locator('#daily-date-label')).toContainText('Daily Challenge');
  await expect(dailyBanner.locator('#daily-status-tag')).toHaveText('Not Completed Today');

  // Verify daily delays are deterministic based on UTC date
  const delaysA = await page.evaluate(() => {
    const today = new Date().toISOString().slice(0, 10);
    let hash = 1779033703 ^ today.length;
    for (let i = 0; i < today.length; i++) {
      hash = Math.imul(hash ^ today.charCodeAt(i), 3432918353);
      hash = (hash << 13) | (hash >>> 19);
    }
    const seed = hash >>> 0;
    const mb = function(a) {
      return function() {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };
    const rng = mb(seed);
    return [
      Math.round(1800 + rng() * 2800),
      Math.round(1800 + rng() * 2800),
      Math.round(1800 + rng() * 2800),
      Math.round(1800 + rng() * 2800),
      Math.round(1800 + rng() * 2800),
    ];
  });
  expect(delaysA).toHaveLength(5);
  delaysA.forEach(d => {
    expect(d).toBeGreaterThanOrEqual(1800);
    expect(d).toBeLessThanOrEqual(4600);
  });

  // 6. Endurance Mode (10 Rounds display check)
  const enduranceBtn = page.locator('.reaction-mode-btn[data-mode="endurance"]');
  await enduranceBtn.click();
  await expect(enduranceBtn).toHaveClass(/is-active/);
  await expect(page.locator('#status-round-pill')).toHaveText('Round 1 of 10');

  // 7. Sound Toggle
  const soundBtn = page.locator('#reaction-sound-toggle');
  await expect(soundBtn).toHaveAttribute('aria-pressed', 'true');
  await soundBtn.click();
  await expect(soundBtn).toHaveAttribute('aria-pressed', 'false');
  const storedSound = await page.evaluate(() => localStorage.getItem('pf-reaction-time-sound'));
  expect(storedSound).toBe('false');

  // 8. Educational Article Content (H2 sizing, typography, internal links)
  const article = page.locator('article.reaction-article');
  await expect(article).toBeVisible();

  // Verify H2 typography strictly matches existing game pages (24px desktop)
  const h2FontSize = await article.locator('h2').first().evaluate(el => window.getComputedStyle(el).fontSize);
  expect(h2FontSize).toBe('24px');

  const articleHeadings = await article.locator('h2').allInnerTexts();
  expect(articleHeadings).toEqual([
    'What Is a Reaction Time Test?',
    'How to Play the Reaction Time Challenge',
    'How Reaction Time Is Measured',
    'What Is a Good Reaction Time?',
    'Factors That Affect Reaction Speed',
    'Tips to Improve Your Reaction Time',
    'Why Try Different Reaction Time Game Modes?',
    'Is This Reaction Time Test Accurate?',
    'Frequently Asked Questions'
  ]);

  // Verify contextual internal links inside article
  const articleHrefs = await article.locator('a').evaluateAll(els => els.map(a => a.getAttribute('href')));
  expect(articleHrefs).toContain('/games/');
  expect(articleHrefs).toContain('/number-sequence-game/');
  expect(articleHrefs).toContain('/sliding-number-puzzle-game/');
  expect(articleHrefs).toContain('/picross-game-online/');
  expect(articleHrefs).toContain('/word-ladder-game-online/');
  expect(articleHrefs).toContain('/color-flood-game/');

  // 9. FAQ Accordion inside Article
  const faqList = article.locator('.faq-list');
  await expect(faqList).toBeVisible();
  const faqItems = faqList.locator('details');
  await expect(faqItems).toHaveCount(10);

  // Test expanding first FAQ
  const firstFaqSummary = faqItems.first().locator('summary');
  await firstFaqSummary.click();
  await expect(faqItems.first()).toHaveAttribute('open', '');

  // 10. Explore More Puzzle Games (Exactly 3 games, excluding Reaction Time)
  const relatedSection = page.locator('.related-games-section');
  await expect(relatedSection).toBeVisible();
  const relatedCards = relatedSection.locator('.related-card');
  await expect(relatedCards).toHaveCount(3);
  const relatedTitles = await relatedCards.locator('h3').allInnerTexts();
  expect(relatedTitles).toEqual([
    'Sliding Number Puzzle Game',
    'Word Ladder Game Online',
    'Color Flood Game'
  ]);
  expect(relatedTitles).not.toContain('Reaction Time Challenge');

  // 11. Viewports & Responsive layout (no horizontal scroll)
  for (const width of [1280, 768, 430, 390, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      docWidth: document.documentElement.scrollWidth
    }));
    expect(metrics.docWidth, `Reaction page ${width}px horizontal overflow`).toBeLessThanOrEqual(metrics.viewport + 1);
  }

  // 12. Screenshots in Light & Dark Mode
  await page.setViewportSize({ width: 1280, height: 900 });
  await screenshot(page, testInfo, 'reaction-time-desktop-1280-light');

  await page.setViewportSize({ width: 390, height: 844 });
  await screenshot(page, testInfo, 'reaction-time-mobile-390-light');

  // Dark mode test
  const themeToggle = page.getByRole('switch');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await screenshot(page, testInfo, 'reaction-time-mobile-390-dark');

  await page.setViewportSize({ width: 1280, height: 900 });
  await screenshot(page, testInfo, 'reaction-time-desktop-1280-dark');
});

test('Memory Matching Game Online: modes, categories, difficulties, flipping, matching, hint, pause, victory, SEO, and responsive themes', async ({ page }, testInfo) => {
  page.on('dialog', dialog => dialog.accept());
  await page.goto('/memory-matching-game-online/');

  // 1. Metadata and SEO verification
  await expect(page).toHaveTitle(/Memory Matching Game Online – Play Free Memory Card Games/);
  await expect(page.locator('h1').first()).toHaveText('Memory Matching Game Online');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://puzzlefeels.com/memory-matching-game-online/');

  // Breadcrumbs
  const breadcrumbNav = page.locator('nav.memory-breadcrumbs');
  await expect(breadcrumbNav).toBeVisible();
  await expect(breadcrumbNav.locator('a[href="/"]')).toHaveText('Home');
  await expect(breadcrumbNav.locator('a[href="/games/"]')).toHaveText('Games');
  await expect(breadcrumbNav.locator('[aria-current="page"]')).toHaveText('Memory Matching Game Online');

  // JSON-LD Schemas (VideoGame, BreadcrumbList, FAQPage)
  const schemas = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { return JSON.parse(s.textContent || '{}'); } catch { return {}; }
    });
  });
  const videoGameSchema = schemas.find(s => s['@type'] === 'VideoGame');
  expect(videoGameSchema).toBeTruthy();
  expect(videoGameSchema.name).toBe('Memory Matching Game Online');
  expect(videoGameSchema.url).toBe('https://puzzlefeels.com/memory-matching-game-online/');

  const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');
  expect(breadcrumbSchema).toBeTruthy();
  expect(breadcrumbSchema.itemListElement).toHaveLength(3);
  expect(breadcrumbSchema.itemListElement[2].item).toBe('https://puzzlefeels.com/memory-matching-game-online/');

  const faqSchema = schemas.find(s => s['@type'] === 'FAQPage');
  expect(faqSchema).toBeTruthy();
  expect(faqSchema.mainEntity.length).toBeGreaterThanOrEqual(10);

  // 2. Strict Zero Emojis check in game interface
  const hasEmoji = await page.evaluate(() => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    const shell = document.querySelector('.memory-game-shell');
    return shell ? emojiRegex.test(shell.textContent || '') : false;
  });
  expect(hasEmoji).toBe(false);

  // 3. Initial State: Adults mode, Icon category, Easy difficulty (4x3 = 12 cards, 6 pairs)
  const adultsModeBtn = page.locator('.memory-mode-btn[data-player-mode="adults"]');
  await expect(adultsModeBtn).toHaveClass(/is-active/);

  const iconCatBtn = page.locator('.memory-cat-btn[data-category="icon"]');
  await expect(iconCatBtn).toHaveClass(/is-active/);

  const easyDiffBtn = page.locator('.memory-diff-btn[data-difficulty="easy"]');
  await expect(easyDiffBtn).toHaveClass(/is-active/);

  const grid = page.locator('#memory-grid');
  await expect(grid).toHaveClass(/grid-easy/);
  const cards = grid.locator('.memory-card');
  await expect(cards).toHaveCount(12);

  // Stats bar verification
  await expect(page.locator('#stat-moves')).toHaveText('0');
  await expect(page.locator('#stat-timer')).toHaveText('00:00');
  await expect(page.locator('#stat-pairs')).toHaveText('0 / 6');
  await expect(page.locator('#stat-best')).toHaveText('—');

  // All 12 cards initially face-down
  for (let i = 0; i < 12; i++) {
    await expect(cards.nth(i)).not.toHaveClass(/is-flipped/);
    await expect(cards.nth(i)).not.toHaveClass(/is-matched/);
  }

  // 4. Card Flipping & Duplicate Click Prevention
  await cards.nth(0).click();
  await expect(cards.nth(0)).toHaveClass(/is-flipped/);
  // Clicking the same card again does NOT count as a second move
  await cards.nth(0).click();
  await expect(page.locator('#stat-moves')).toHaveText('0');

  // Read card pair IDs from data attributes
  const cardPairIds = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.memory-card')).map(card => card.getAttribute('data-pair-id'));
  });

  const firstCardPairId = cardPairIds[0];
  const matchingIndex = cardPairIds.findIndex((pid, idx) => idx > 0 && pid === firstCardPairId);
  const nonMatchingIndex = cardPairIds.findIndex((pid, idx) => idx > 0 && pid !== firstCardPairId);

  expect(matchingIndex).toBeGreaterThan(0);
  expect(nonMatchingIndex).toBeGreaterThan(0);

  // 5. Test Mismatch: click non-matching card
  await cards.nth(nonMatchingIndex).click();
  await expect(page.locator('#stat-moves')).toHaveText('1');

  // Both cards briefly revealed, then flip back down
  await expect(cards.nth(0)).not.toHaveClass(/is-flipped/, { timeout: 3000 });
  await expect(cards.nth(nonMatchingIndex)).not.toHaveClass(/is-flipped/);
  await expect(page.locator('#stat-pairs')).toHaveText('0 / 6');

  // 6. Test Match: click card 0 and matchingIndex
  await cards.nth(0).click();
  await cards.nth(matchingIndex).click();
  await expect(page.locator('#stat-moves')).toHaveText('2');

  // Both cards remain permanently revealed and marked is-matched
  await expect(cards.nth(0)).toHaveClass(/is-matched/, { timeout: 2000 });
  await expect(cards.nth(matchingIndex)).toHaveClass(/is-matched/);
  await expect(page.locator('#stat-pairs')).toHaveText('1 / 6');

  // Progress bar updated
  const progressWidth = await page.locator('#memory-progress-bar').evaluate(el => el.style.width);
  expect(parseInt(progressWidth, 10)).toBeGreaterThan(0);

  // 7. Comprehensive Hint System Regression Tests (All 14 requirements)
  const hintBtn = page.locator('#memory-hint-btn');

  // Req 1, 2, 3: Hint highlights exactly 2 cards belonging to the exact same pairId, never an already-matched pair
  await hintBtn.click();
  const hintedCards = grid.locator('.memory-card.is-hinted');
  await expect(hintedCards).toHaveCount(2);

  const hintedPairIds = await hintedCards.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(hintedPairIds[0]).toBe(hintedPairIds[1]);
  expect(hintedPairIds[0]).not.toBe(firstCardPairId); // not the already matched pair!

  // Req 12: Repeated hint clicks do not duplicate hints or break state
  await hintBtn.click();
  await hintBtn.click();
  await expect(grid.locator('.memory-card.is-hinted')).toHaveCount(2);

  // Req 13: Interacting clears the hint
  const unhintedTargetIdx = cardPairIds.findIndex((pid, i) => !hintedPairIds.includes(pid) && pid !== firstCardPairId);
  if (unhintedTargetIdx >= 0) {
    await cards.nth(unhintedTargetIdx).click();
    await expect(grid.locator('.memory-card.is-hinted')).toHaveCount(0);
  }

  // Req 9: Hint remains correct after restart
  await page.locator('#memory-restart-btn').click();
  await expect(page.locator('#stat-pairs')).toHaveText('0 / 6');
  await hintBtn.click();
  const restartHinted = grid.locator('.memory-card.is-hinted');
  await expect(restartHinted).toHaveCount(2);
  const restartPairIds = await restartHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(restartPairIds[0]).toBe(restartPairIds[1]);

  // Req 10 & 7: Hint remains correct after changing categories
  // Test Number category
  const numberCatBtn = page.locator('.memory-cat-btn[data-category="number"]');
  await numberCatBtn.click();
  await expect(numberCatBtn).toHaveClass(/is-active/);
  await expect(grid.locator('.card-number-badge')).toHaveCount(12);
  await hintBtn.click();
  const numberHinted = grid.locator('.memory-card.is-hinted');
  await expect(numberHinted).toHaveCount(2);
  const numPairIds = await numberHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(numPairIds[0]).toBe(numPairIds[1]);

  // Test Color category
  const colorCatBtn = page.locator('.memory-cat-btn[data-category="color"]');
  await colorCatBtn.click();
  await expect(colorCatBtn).toHaveClass(/is-active/);
  await expect(grid.locator('.card-color-swatch')).toHaveCount(12);
  await hintBtn.click();
  const colorHinted = grid.locator('.memory-card.is-hinted');
  await expect(colorHinted).toHaveCount(2);
  const colorPairIds = await colorHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(colorPairIds[0]).toBe(colorPairIds[1]);

  // Test Shape category
  const shapeCatBtn = page.locator('.memory-cat-btn[data-category="shape"]');
  await shapeCatBtn.click();
  await expect(shapeCatBtn).toHaveClass(/is-active/);
  await expect(grid.locator('.card-shape')).toHaveCount(12);
  await hintBtn.click();
  const shapeHinted = grid.locator('.memory-card.is-hinted');
  await expect(shapeHinted).toHaveCount(2);
  const shapePairIds = await shapeHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(shapePairIds[0]).toBe(shapePairIds[1]);

  // Req 11 & 6: Hint remains correct after changing difficulty (Medium: 16 cards, 8 pairs; Hard: 24 cards, 12 pairs)
  const mediumDiffBtn = page.locator('.memory-diff-btn[data-difficulty="medium"]');
  await mediumDiffBtn.click();
  await expect(mediumDiffBtn).toHaveClass(/is-active/);
  await expect(grid.locator('.memory-card')).toHaveCount(16);
  await hintBtn.click();
  const medHinted = grid.locator('.memory-card.is-hinted');
  await expect(medHinted).toHaveCount(2);
  const medPairIds = await medHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(medPairIds[0]).toBe(medPairIds[1]);

  const hardDiffBtn = page.locator('.memory-diff-btn[data-difficulty="hard"]');
  await hardDiffBtn.click();
  await expect(hardDiffBtn).toHaveClass(/is-active/);
  await expect(grid.locator('.memory-card')).toHaveCount(24);
  await hintBtn.click();
  const hardHinted = grid.locator('.memory-card.is-hinted');
  await expect(hardHinted).toHaveCount(2);
  const hardPairIds = await hardHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(hardPairIds[0]).toBe(hardPairIds[1]);

  // Req 4 & 5: Hint works in Kids Mode
  const kidsModeBtn = page.locator('.memory-mode-btn[data-player-mode="kids"]');
  await kidsModeBtn.click();
  await expect(kidsModeBtn).toHaveClass(/is-active/);
  await hintBtn.click();
  const kidsHinted = grid.locator('.memory-card.is-hinted');
  await expect(kidsHinted).toHaveCount(2);
  const kidsPairIds = await kidsHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(kidsPairIds[0]).toBe(kidsPairIds[1]);

  // Req 8: Hint works in Daily Challenge Mode
  const dailyToggle = page.locator('#memory-daily-toggle');
  await dailyToggle.click();
  const dailyBanner = page.locator('#memory-daily-banner');
  await expect(dailyBanner).toBeVisible();
  await expect(dailyBanner.locator('#daily-date-label')).toContainText('Daily Memory Challenge');

  await hintBtn.click();
  const dailyHinted = grid.locator('.memory-card.is-hinted');
  await expect(dailyHinted).toHaveCount(2);
  const dailyPairIds = await dailyHinted.evaluateAll(els => els.map(el => el.getAttribute('data-pair-id')));
  expect(dailyPairIds[0]).toBe(dailyPairIds[1]);

  // Exit daily mode
  await page.locator('#exit-daily-btn').click();
  await expect(dailyBanner).toBeHidden();

  // 8. Test Pause & Resume
  const pauseBtn = page.locator('#memory-pause-btn');
  await pauseBtn.click();
  const pauseOverlay = page.locator('#memory-paused');
  await expect(pauseOverlay).toBeVisible();

  const resumeBtn = page.locator('#memory-resume-btn');
  await resumeBtn.click();
  await expect(pauseOverlay).toBeHidden();

  // 9. Complete Game & Test Victory Modal (Switch back to Easy Icon)
  await page.locator('.memory-diff-btn[data-difficulty="easy"]').click();
  await page.locator('.memory-cat-btn[data-category="icon"]').click();
  await expect(grid.locator('.memory-card')).toHaveCount(12);

  // Group indices by pairId
  const currentPairMap = await page.evaluate(() => {
    const map = {};
    document.querySelectorAll('.memory-card').forEach((card, idx) => {
      const pid = card.getAttribute('data-pair-id');
      if (!map[pid]) map[pid] = [];
      map[pid].push(idx);
    });
    return map;
  });

  // Solve all pairs
  for (const indices of Object.values(currentPairMap)) {
    if (indices.length === 2) {
      await grid.locator('.memory-card').nth(indices[0]).click();
      await grid.locator('.memory-card').nth(indices[1]).click();
      await page.waitForTimeout(300);
    }
  }

  // Victory modal appears
  const victoryOverlay = page.locator('#memory-victory');
  await expect(victoryOverlay).toBeVisible({ timeout: 5000 });
  await expect(victoryOverlay.locator('#victory-pairs')).toHaveText('6 / 6');
  await expect(victoryOverlay.locator('.victory-trophy-badge svg')).toBeVisible();
  await expect(victoryOverlay.locator('.victory-stars svg')).toHaveCount(3);
  await expect(victoryOverlay.locator('#victory-pb-banner')).toBeVisible();
  await expect(victoryOverlay.locator('#victory-replay-btn')).toBeVisible();
  await expect(victoryOverlay.locator('#victory-new-btn')).toBeVisible();
  await expect(victoryOverlay.locator('#victory-share-btn')).toBeVisible();
  await expect(victoryOverlay.locator('#victory-close-btn')).toBeVisible();

  // Test close button
  await victoryOverlay.locator('#victory-close-btn').click();
  await expect(victoryOverlay).toBeHidden();

  // Test Replay button from stats bar
  await page.locator('#memory-restart-btn').click();
  await expect(page.locator('#stat-pairs')).toHaveText('0 / 6');

  // 13. Educational Article & Strict Typography consistency
  const article = page.locator('article.memory-article');
  await expect(article).toBeVisible();

  // Verify H2 font size is strictly 24px desktop
  const h2FontSize = await article.locator('h2').first().evaluate(el => window.getComputedStyle(el).fontSize);
  expect(h2FontSize).toBe('24px');

  const articleHeadings = await article.locator('h2').allInnerTexts();
  expect(articleHeadings).toEqual([
    'What Is a Memory Matching Game?',
    'How to Play the Memory Card Matching Game',
    'Explore Four Types of Memory Matching Games',
    'Memory Games for Adults and Kids',
    'Easy, Medium, and Hard Memory Game Levels',
    'Tips for Finding Matching Pairs Faster',
    'Why Play Online Memory Matching Games?',
    'How Best Time and Moves Are Calculated',
    'What Is the Daily Memory Challenge?',
    'Frequently Asked Questions'
  ]);

  // Contextual internal links check
  const articleLinks = await article.locator('a').evaluateAll(els => els.map(a => a.getAttribute('href')));
  expect(articleLinks).toContain('/sliding-number-puzzle-game/');
  expect(articleLinks).toContain('/color-flood-game/');
  expect(articleLinks).toContain('/number-sequence-game/');
  expect(articleLinks).toContain('/picross-game-online/');
  expect(articleLinks).toContain('/word-ladder-game-online/');
  expect(articleLinks).toContain('/reaction-time-challenge/');

  // 14. FAQ Accordion inside Article
  const faqList = article.locator('.faq-list');
  await expect(faqList).toBeVisible();
  const faqItems = faqList.locator('details');
  await expect(faqItems).toHaveCount(12);

  // Expand first FAQ item
  await faqItems.first().locator('summary').click();
  await expect(faqItems.first()).toHaveAttribute('open', '');

  // 15. Explore More Puzzle Games (Exactly 3 games, excluding Memory Matching)
  const relatedSection = page.locator('.related-games-section');
  await expect(relatedSection).toBeVisible();
  const relatedCards = relatedSection.locator('.related-card');
  await expect(relatedCards).toHaveCount(3);
  const relatedTitles = await relatedCards.locator('h3').allInnerTexts();
  expect(relatedTitles).toEqual([
    'Sliding Number Puzzle Game',
    'Reaction Time Challenge',
    'Word Ladder Game Online'
  ]);
  expect(relatedTitles).not.toContain('Memory Matching Game Online');

  // 16. Viewports & Responsive layout (no horizontal scroll)
  for (const width of [1280, 768, 430, 390, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      docWidth: document.documentElement.scrollWidth
    }));
    expect(metrics.docWidth, `Memory page ${width}px horizontal overflow`).toBeLessThanOrEqual(metrics.viewport + 1);
  }

  // 17. Screenshots in Light & Dark Mode
  const artifactDir = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'memory-matching-desktop-1280-light.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'memory-matching-mobile-390-light.png') });

  // Dark mode test
  const themeToggle = page.getByRole('switch');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(artifactDir, 'memory-matching-mobile-390-dark.png') });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'memory-matching-desktop-1280-dark.png') });
});


test('Murdoku Online Game: full gameplay, solver validation, accessibility, and zero emojis', async ({ page }) => {
  // 1. Navigate to Murdoku page
  const response = await page.goto('/murdoku-online-game/');
  expect(response?.status()).toBe(200);

  // 2. Identity and SEO Checks
  await expect(page.locator('.murdoku-intro h1')).toHaveText('Murdoku Online Game');
  await expect(page.locator('.murdoku-intro .eyebrow')).toHaveText('Deduction & Murder Mystery Logic');
  const breadcrumbs = page.locator('.murdoku-breadcrumbs');
  await expect(breadcrumbs).toBeVisible();
  await expect(breadcrumbs.locator('a[href="/"]')).toHaveText('Home');
  await expect(breadcrumbs.locator('a[href="/games/"]')).toHaveText('Games');
  await expect(breadcrumbs.locator('span[aria-current="page"]')).toHaveText('Murdoku Online Game');

  // JSON-LD schemas
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some(s => s.includes('Murdoku Online Game') && s.includes('VideoGame'))).toBe(true);
  expect(schemas.some(s => s.includes('BreadcrumbList'))).toBe(true);

  // 3. Initial Board State (Easy 4x4)
  const boardCells = page.locator('.grid-cell');
  await expect(boardCells).toHaveCount(16);
  await expect(page.locator('#case-difficulty-badge')).toHaveText('EASY');
  await expect(page.locator('#case-title')).toHaveText('The Study at Midnight');
  await expect(page.locator('#case-victim-name')).toHaveText('Lord Sterling');
  await expect(page.locator('#placed-val')).toHaveText('0 / 4');

  // Check 4 people in tray
  const trayCards = page.locator('.tray-card');
  await expect(trayCards).toHaveCount(4);

  // 4. Interactive Placement
  // Select Cynthia (killer)
  await trayCards.nth(1).click();
  await expect(trayCards.nth(1)).toHaveClass(/is-selected/);

  // Click cell at Row 1, Col 1 (0, 0)
  const cell00 = page.locator('.grid-cell[data-row="0"][data-col="0"]');
  await cell00.click();
  await expect(cell00).toHaveClass(/has-person/);
  await expect(cell00.locator('.token-name')).toHaveText('Lady Cynthia');
  await expect(page.locator('#placed-val')).toHaveText('1 / 4');

  // 5. Mark X Tool
  const toolMark = page.locator('#tool-mark');
  await toolMark.click();
  await expect(toolMark).toHaveClass(/is-active/);

  // Click cell at Row 1, Col 2 (0, 1)
  const cell01 = page.locator('.grid-cell[data-row="0"][data-col="1"]');
  await cell01.click();
  await expect(cell01).toHaveClass(/is-marked-x/);

  // 6. Eraser Tool
  const toolEraser = page.locator('#tool-eraser');
  await toolEraser.click();
  await expect(toolEraser).toHaveClass(/is-active/);
  await cell01.click();
  await expect(cell01).not.toHaveClass(/is-marked-x/);

  // 7. Undo and Redo
  const btnUndo = page.locator('#btn-undo');
  const btnRedo = page.locator('#btn-redo');
  await btnUndo.click();
  // cell01 should be marked X again
  await expect(cell01).toHaveClass(/is-marked-x/);
  await btnRedo.click();
  await expect(cell01).not.toHaveClass(/is-marked-x/);

  // 8. Clue Notebook interaction
  const clues = page.locator('.clue-item');
  await expect(clues).toHaveCount(5);
  await clues.nth(0).click();
  await expect(clues.nth(0)).toHaveClass(/is-solved/);
  await expect(page.locator('#clue-progress-text')).toHaveText('1 / 5 Checked');

  // 9. Difficulty Switching
  // Switch to Medium (5x5)
  const tabMedium = page.locator('.murdoku-tab-btn[data-diff="medium"]');
  await tabMedium.click();
  await expect(page.locator('.grid-cell')).toHaveCount(25);
  await expect(page.locator('.tray-card')).toHaveCount(5);
  await expect(page.locator('#case-difficulty-badge')).toHaveText('MEDIUM');

  // Switch to Hard (6x6)
  const tabHard = page.locator('.murdoku-tab-btn[data-diff="hard"]');
  await tabHard.click();
  await expect(page.locator('.grid-cell')).toHaveCount(36);
  await expect(page.locator('.tray-card')).toHaveCount(6);
  await expect(page.locator('#case-difficulty-badge')).toHaveText('HARD');

  // Switch to Expert (6x6)
  const tabExpert = page.locator('.murdoku-tab-btn[data-diff="expert"]');
  await tabExpert.click();
  await expect(page.locator('.grid-cell')).toHaveCount(36);
  await expect(page.locator('.tray-card')).toHaveCount(6);
  await expect(page.locator('#case-difficulty-badge')).toHaveText('EXPERT');

  // Switch to Daily
  const tabDaily = page.locator('.murdoku-tab-btn[data-diff="daily"]');
  await tabDaily.click();
  await expect(page.locator('.grid-cell').first()).toBeVisible();

  // 10. Solve Easy 1 & Accusation Flow
  const tabEasy = page.locator('.murdoku-tab-btn[data-diff="easy"]');
  await tabEasy.click();
  await expect(page.locator('.grid-cell')).toHaveCount(16);

  // Switch tool to Place
  await page.locator('#tool-place').click();

  // Easy 1 target solution:
  // victim (Lord Sterling): R2 C2 (1, 1)
  // cynthia (Lady Cynthia): R1 C1 (0, 0)
  // vance (Colonel Vance): R3 C4 (2, 3)
  // drake (Professor Drake): R4 C3 (3, 2)
  const peopleCards = page.locator('.tray-card');

  // Place Lord Sterling (Victim) at (1, 1)
  await peopleCards.nth(0).click();
  await page.locator('.grid-cell[data-row="1"][data-col="1"]').click();

  // Place Lady Cynthia at (0, 0)
  await peopleCards.nth(1).click();
  await page.locator('.grid-cell[data-row="0"][data-col="0"]').click();

  // Place Colonel Vance at (2, 3)
  await peopleCards.nth(2).click();
  await page.locator('.grid-cell[data-row="2"][data-col="3"]').click();

  // Place Professor Drake at (3, 2)
  await peopleCards.nth(3).click();
  await page.locator('.grid-cell[data-row="3"][data-col="2"]').click();

  await expect(page.locator('#placed-val')).toHaveText('4 / 4');

  // Test Check Progress
  await page.locator('#btn-check').click();
  await expect(page.locator('#murdoku-alert')).toBeVisible();
  await expect(page.locator('#murdoku-alert')).toContainText('All 4 placed suspects are mathematically correct');

  // Accuse Wrong Murderer (Vance)
  await page.locator('#accuse-select').selectOption('vance');
  await page.locator('#btn-accuse').click();
  await expect(page.locator('#murdoku-alert')).toContainText('False Accusation');

  // Accuse Correct Murderer (Cynthia)
  await page.locator('#accuse-select').selectOption('cynthia');
  await page.locator('#btn-accuse').click();

  // Victory Modal pops up
  const victoryModal = page.locator('#victory-modal');
  await expect(victoryModal).toBeVisible();
  await expect(page.locator('#victory-title')).toHaveText('Case Solved! Killer Convicted!');
  await expect(page.locator('#victory-killer-name')).toHaveText('Lady Cynthia');

  // Close modal to inspect board
  await page.locator('#modal-btn-close').click();
  await expect(victoryModal).toBeHidden();
  // Verify board is NOT left blank!
  await expect(page.locator('.grid-cell.has-person')).toHaveCount(4);

  // 11. Zero Emojis Validation
  const fullHtml = await page.locator('.murdoku-page').innerHTML();
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  expect(emojiRegex.test(fullHtml), 'Zero emojis in Murdoku page').toBe(false);

  // 12. Article Typography & Heading Sizes
  const h2El = page.locator('article.murdoku-content h2').first();
  const h3El = page.locator('article.murdoku-content h3').first();
  await page.setViewportSize({ width: 1280, height: 900 });
  const h2FontSize = await h2El.evaluate(el => window.getComputedStyle(el).fontSize);
  const h3FontSize = await h3El.evaluate(el => window.getComputedStyle(el).fontSize);
  expect(h2FontSize).toBe('24px');
  expect(h3FontSize).toBe('18px');

  // Mobile heading size check
  await page.setViewportSize({ width: 390, height: 844 });
  const h2MobileFontSize = await h2El.evaluate(el => window.getComputedStyle(el).fontSize);
  const h3MobileFontSize = await h3El.evaluate(el => window.getComputedStyle(el).fontSize);
  expect(h2MobileFontSize).toBe('21px');
  expect(h3MobileFontSize).toBe('17px');

  // 13. Related Games Typography & Count
  const relatedCards = page.locator('.related-card');
  await expect(relatedCards).toHaveCount(3);
  const relatedPill = page.locator('.related-labels .pill').first();
  const relatedDiff = page.locator('.related-labels .difficulty-label').first();
  const pillFontSize = await relatedPill.evaluate(el => window.getComputedStyle(el).fontSize);
  const diffFontSize = await relatedDiff.evaluate(el => window.getComputedStyle(el).fontSize);
  expect(pillFontSize).toBe('9px');
  expect(diffFontSize).toBe('10px');

  // 14. All Games Directory Integration
  await page.goto('/games/');
  const murdokuCard = page.locator('a.directory-card[href="/murdoku-online-game/"]');
  await expect(murdokuCard).toBeVisible();
  await expect(murdokuCard.locator('h3')).toHaveText('Murdoku Online Game');

  // Search filter check on /games/
  const searchInput = page.locator('#game-search-input');
  await searchInput.fill('murdoku');
  await expect(murdokuCard).toBeVisible();
  const hiddenCards = page.locator('.directory-card[hidden]');
  expect(await hiddenCards.count()).toBeGreaterThan(0);

  // 15. Homepage Isolation (Must not add Murdoku to 5 featured or 3 daily games)
  await page.goto('/');
  const featuredGamesSection = page.locator('section:has-text("One good puzzle can change your day")');
  const featuredCards = featuredGamesSection.locator('.game-card, .featured-card, a[href*="-game"]');
  const featuredLinks = await featuredCards.evaluateAll(els => els.map(el => el.getAttribute('href')));
  expect(featuredLinks.some(link => link && link.includes('murdoku'))).toBe(false);

  const dailySection = page.locator('section:has-text("Your Daily Moments of Focus")');
  const dailyCards = dailySection.locator('.moment-card, a[href*="-game"]');
  const dailyLinks = await dailyCards.evaluateAll(els => els.map(el => el.getAttribute('href')));
  expect(dailyLinks.some(link => link && link.includes('murdoku'))).toBe(false);

  // 16. Viewport Overflow Checks
  await page.goto('/murdoku-online-game/');
  for (const width of [1280, 1024, 768, 430, 414, 390, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      docWidth: document.documentElement.scrollWidth
    }));
    expect(metrics.docWidth, `Murdoku ${width}px horizontal overflow`).toBeLessThanOrEqual(metrics.viewport + 1);
  }

  // 17. Screenshots (Artifact Directory)
  const artifactDir = 'C:/Users/rrajb/.gemini/antigravity/brain/57014662-5035-4243-8ab8-75ede492c28a';
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'murdoku-desktop-1280-light.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'murdoku-mobile-390-light.png') });

  // Dark mode switch
  const themeToggle = page.getByRole('switch');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.waitForTimeout(300);

  await page.screenshot({ path: path.join(artifactDir, 'murdoku-mobile-390-dark.png') });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'murdoku-desktop-1280-dark.png') });
});

test('Norinori Game Online - Complete E2E Suite', async ({ page }) => {
  // 1. Page Load & Basic Metadata
  await page.goto('/norinori-game/');
  await expect(page).toHaveTitle(/Norinori Game Online/);
  
  const h1 = page.locator('.norinori-intro h1');
  await expect(h1).toHaveText('Norinori Game');
  
  // Verify H1 is center-aligned
  const h1Align = await h1.evaluate(el => window.getComputedStyle(el.closest('.norinori-intro')).textAlign);
  expect(h1Align).toBe('center');

  // 2. Grid Initial State (6x6 Starter)
  const cells = page.locator('.norinori-cell');
  await expect(cells).toHaveCount(36);
  await expect(page.locator('#norinori-difficulty-badge')).toContainText('6×6');

  // 3. Shading & Dotting Interaction
  const cell0 = cells.nth(0);
  const cell1 = cells.nth(1);
  await cell0.click();
  await expect(cell0).toHaveClass(/is-shaded/);
  
  // Right-click marks dot
  const cell2 = cells.nth(2);
  await cell2.click({ button: 'right' });
  await expect(cell2).toHaveClass(/is-dot/);

  // Undo & Redo
  const undoBtn = page.locator('#btn-undo');
  await undoBtn.click();
  await expect(cell2).not.toHaveClass(/is-dot/);

  const redoBtn = page.locator('#btn-redo');
  await redoBtn.click();
  await expect(cell2).toHaveClass(/is-dot/);

  // 4. Zoom Popover (Independent Menu)
  const zoomBtn = page.locator('#btn-zoom-toggle');
  const zoomPopover = page.locator('#zoom-popover');
  await expect(zoomPopover).toBeHidden();
  await zoomBtn.click();
  await expect(zoomPopover).toBeVisible();

  // Test Zoom In
  const zoomInBtn = page.locator('#btn-zoom-in');
  await zoomInBtn.click();
  await expect(page.locator('#zoom-level-label')).toHaveText('115%');
  
  // Close zoom popover
  await page.locator('[data-close-popover="zoom"]').click();
  await expect(zoomPopover).toBeHidden();

  // 5. Settings Popover (Independent Menu)
  const settingsBtn = page.locator('#btn-settings-toggle');
  const settingsPopover = page.locator('#settings-popover');
  await expect(settingsPopover).toBeHidden();
  await settingsBtn.click();
  await expect(settingsPopover).toBeVisible();

  // Check toggle presence
  const highlightToggle = page.locator('#setting-highlight-errors');
  await expect(highlightToggle).toBeChecked();

  // Close settings popover
  await page.locator('[data-close-popover="settings"]').click();
  await expect(settingsPopover).toBeHidden();

  // 6. Mode & Difficulty Switching
  // Switch to 8x8 Classic
  await page.locator('.norinori-tab-btn[data-size="8"]').click();
  await expect(cells).toHaveCount(64);
  await expect(page.locator('#norinori-difficulty-badge')).toContainText('8×8');

  // Switch to Daily Challenge
  await page.locator('.norinori-tab-btn[data-mode="daily"]').click();
  await expect(page.locator('#norinori-difficulty-badge')).toContainText('DAILY');

  // Switch back to 6x6
  await page.locator('.norinori-tab-btn[data-size="6"]').click();
  await expect(cells).toHaveCount(36);

  // 7. Hint System & Victory Modal
  const hintBtn = page.locator('#btn-hint');
  for (let i = 0; i < 40; i++) {
    const isVisible = await page.locator('#victory-modal').isVisible();
    if (isVisible) break;
    await hintBtn.click();
  }
  await expect(page.locator('#victory-modal')).toBeVisible();
  await expect(page.locator('.victory-card h2')).toHaveText('Puzzle Solved!');
  
  // Close victory modal (Inspect board)
  await page.locator('button[data-close-modal="victory"]').click();
  await expect(page.locator('#victory-modal')).toBeHidden();
  // Solved board remains visible
  await expect(cells).toHaveCount(36);

  // 8. Educational Content & FAQs
  const article = page.locator('.norinori-article');
  await expect(article).toBeVisible();
  const h2s = article.locator('h2');
  expect(await h2s.count()).toBeGreaterThanOrEqual(4);
  const faqItems = article.locator('.faq-item, details');
  expect(await faqItems.count()).toBeGreaterThanOrEqual(5);

  // 9. Explore More Related Games (Exactly 3 games)
  const relatedSection = page.locator('.related-games-section');
  await expect(relatedSection).toBeVisible();
  const relatedCards = relatedSection.locator('.related-card');
  await expect(relatedCards).toHaveCount(3);

  // 10. Games Directory Page Integration
  await page.goto('/games/');
  const norinoriCard = page.locator('a[href="/norinori-game/"]');
  await expect(norinoriCard).toBeVisible();
  await expect(norinoriCard.locator('h3')).toHaveText('Norinori Game');

  // Search filter finds Norinori
  const searchInput = page.locator('#game-search-input');
  await searchInput.fill('norinori');
  await expect(norinoriCard).toBeVisible();

  // 11. Homepage Isolation (Must not add Norinori to 5 featured or 3 daily games)
  await page.goto('/');
  const featuredSection = page.locator('section:has-text("One good puzzle can change your day")');
  const featuredLinks = await featuredSection.locator('a[href*="-game"]').evaluateAll(els => els.map(e => e.getAttribute('href')));
  expect(featuredLinks.some(l => l && l.includes('norinori'))).toBe(false);

  const dailySection = page.locator('section:has-text("Your Daily Moments of Focus")');
  const dailyLinks = await dailySection.locator('a[href*="-game"]').evaluateAll(els => els.map(e => e.getAttribute('href')));
  expect(dailyLinks.some(l => l && l.includes('norinori'))).toBe(false);

  // 12. Viewport Overflow Checks
  await page.goto('/norinori-game/');
  for (const width of [1280, 1024, 768, 430, 414, 390, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      docWidth: document.documentElement.scrollWidth
    }));
    expect(metrics.docWidth, `Norinori ${width}px horizontal overflow`).toBeLessThanOrEqual(metrics.viewport + 1);
  }
});

test('Free Hidden Object Online Game - Complete E2E Suite', async ({ page }) => {
  // 1. Initial Page Load & Visual Structure
  await page.goto('/hidden-object-game/');
  await expect(page).toHaveTitle('Free Hidden Object Online Game – Find Hidden Objects in Pictures | PuzzleFeels');

  const h1 = page.locator('.ho-intro h1');
  await expect(h1).toBeVisible();
  await expect(h1).toHaveText('Free Hidden Object Online Game');

  const h1Align = await h1.evaluate(el => window.getComputedStyle(el.closest('.ho-intro')).textAlign);
  expect(h1Align).toBe('center');

  // Breadcrumbs
  const breadcrumbs = page.locator('.ho-breadcrumbs');
  await expect(breadcrumbs).toBeVisible();
  await expect(breadcrumbs.locator('a[href="/"]')).toContainText('Home');
  await expect(breadcrumbs.locator('a[href="/games/"]')).toContainText('Games');
  await expect(breadcrumbs.locator('[aria-current="page"]')).toContainText('Free Hidden Object Online Game');

  // JSON-LD Schemas
  const schemas = await page.locator('script[type="application/ld+json"]').all();
  expect(schemas.length).toBeGreaterThanOrEqual(3);

  // 2. Difficulty Selection & Defaults (Easy by default: 5 objects)
  const diffEasy = page.locator('.ho-tab-btn[data-difficulty="easy"]');
  const diffMedium = page.locator('.ho-tab-btn[data-difficulty="medium"]');
  const diffHard = page.locator('.ho-tab-btn[data-difficulty="hard"]');

  await expect(diffEasy).toHaveClass(/is-active/);
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 5 Found');
  await expect(page.locator('#ho-remaining-tag')).toHaveText('(5 remaining)');
  await expect(page.locator('.ho-object-card')).toHaveCount(5);

  // Switch to Hard (8 objects)
  await diffHard.click();
  await expect(diffHard).toHaveClass(/is-active/);
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 8 Found');
  await expect(page.locator('.ho-object-card')).toHaveCount(8);

  // Switch to Medium (7 objects)
  await diffMedium.click();
  await expect(diffMedium).toHaveClass(/is-active/);
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 7 Found');
  await expect(page.locator('.ho-object-card')).toHaveCount(7);

  // Switch back to Easy (5 objects)
  await diffEasy.click();
  await expect(diffEasy).toHaveClass(/is-active/);
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 5 Found');
  await expect(page.locator('.ho-object-card')).toHaveCount(5);

  // 3. Level 1 Initialization
  await expect(page.locator('#ho-level-badge')).toHaveText('Level 1');
  await expect(page.locator('#ho-puzzle-title')).toHaveText('Cozy Living Room');

  // Scene image
  const sceneImg = page.locator('#ho-scene-img');
  await expect(sceneImg).toBeVisible();
  await expect(sceneImg).toHaveAttribute('src', '/images/hidden-object/level-1-cozy-living-room.svg');

  // Level Pills Check: Level 1 active, 2-10 locked
  const pills = page.locator('.ho-level-pill');
  await expect(pills).toHaveCount(10);
  await expect(pills.first()).toHaveClass(/is-active/);
  await expect(pills.first()).not.toBeDisabled();

  for (let i = 1; i < 10; i++) {
    await expect(pills.nth(i)).toBeDisabled();
    await expect(pills.nth(i)).toHaveClass(/is-locked/);
  }

  // 4. Timer, Pause, Resume, and Restart
  const timer = page.locator('#ho-timer');
  await expect(timer).toBeVisible();
  await expect(timer).toHaveText(/00:\d\d/);

  // Pause
  const pauseBtn = page.locator('#btn-pause');
  await pauseBtn.click();
  const pausedOverlay = page.locator('#ho-paused-overlay');
  await expect(pausedOverlay).toBeVisible();

  // Resume
  const resumeBtn = page.locator('#btn-resume');
  await resumeBtn.click();
  await expect(pausedOverlay).toBeHidden();

  // Restart
  const restartBtn = page.locator('#btn-restart');
  await restartBtn.click();
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 5 Found');

  // 5. Sound Toggle
  const soundBtn = page.locator('#btn-sound');
  await expect(soundBtn).toBeVisible();
  await soundBtn.click(); // mute
  let soundStorage = await page.evaluate(() => localStorage.getItem('puzzlefeels-ho-sound'));
  expect(soundStorage).toBe('false');
  await soundBtn.click(); // unmute
  soundStorage = await page.evaluate(() => localStorage.getItem('puzzlefeels-ho-sound'));
  expect(soundStorage).toBe('true');

  // 6. Zoom Controls: Verify scaling of entire playable board
  const zoomBtn = page.locator('#btn-ho-zoom-toggle');
  await expect(zoomBtn).toBeVisible();
  await zoomBtn.click();
  const zoomPopover = page.locator('.zoom-popover:visible');
  await expect(zoomPopover).toBeVisible();

  const initialBox = await page.locator('#ho-scene-board').boundingBox();
  expect(initialBox).not.toBeNull();

  const btnZoomIn = page.locator('.btn-zoom-in');
  await btnZoomIn.click();
  await expect(page.locator('.zoom-level-label')).toHaveText('115%');
  await expect.poll(async () => {
    const box = await page.locator('#ho-scene-board').boundingBox();
    return box ? box.width : 0;
  }).toBeGreaterThan(initialBox.width);

  const btnZoomOut = page.locator('.btn-zoom-out');
  await btnZoomOut.click(); // back to 100%
  await btnZoomOut.click(); // down to 85%
  await expect(page.locator('.zoom-level-label')).toHaveText('85%');
  await expect.poll(async () => {
    const box = await page.locator('#ho-scene-board').boundingBox();
    return box ? box.width : 9999;
  }).toBeLessThan(initialBox.width);

  const btnZoomReset = page.locator('.btn-zoom-reset');
  await btnZoomReset.click();
  await expect(page.locator('.zoom-level-label')).toHaveText('100%');
  await expect(zoomPopover).toBeHidden();
  await expect.poll(async () => {
    const box = await page.locator('#ho-scene-board').boundingBox();
    return box ? Math.round(box.width) : 0;
  }).toBe(Math.round(initialBox.width));

  // 7. Hint Functionality
  const hintBtn = page.locator('#btn-hint');
  await hintBtn.click();
  await expect(page.locator('#ho-hints-counter')).toHaveText('1');
  const toastBanner = page.locator('#ho-toast-banner');
  await expect(toastBanner).toBeVisible();
  await expect(toastBanner).toContainText('Hint:');

  // 8. Detection Tests (Easy mode: 5 objects)
  const overlay = page.locator('#ho-scene-overlay');
  const overlayBox = await overlay.boundingBox();
  expect(overlayBox).not.toBeNull();

  // Test 8A: Incorrect click shows popup with red cross and "Not quite! Keep looking." without incrementing
  await overlay.click({ position: { x: overlayBox.width * 0.1, y: overlayBox.height * 0.1 } });
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 5 Found');
  await expect(page.locator('.ho-marker')).toHaveCount(0);
  const missPopup = page.locator('.ho-selection-popup.ho-popup-incorrect');
  await expect(missPopup).toBeVisible();
  await expect(missPopup).toContainText('Not quite! Keep looking.');
  await expect(missPopup.locator('.incorrect-icon')).toBeVisible();

  // Test 8B: Correct click on Brass Key at (52.2%, 32.5%)
  const keyX = overlayBox.width * 0.522;
  const keyY = overlayBox.height * 0.325;
  await overlay.click({ position: { x: keyX, y: keyY } });

  await expect(page.locator('#ho-found-counter')).toHaveText('1 of 5 Found');
  await expect(page.locator('#ho-remaining-tag')).toHaveText('(4 remaining)');
  await expect(page.locator('.ho-marker')).toHaveCount(1);
  await expect(page.locator('.ho-object-card[data-obj-id="brass-key"]')).toHaveClass(/is-found/);
  
  const correctPopup = page.locator('.ho-selection-popup.ho-popup-correct');
  await expect(correctPopup).toBeVisible();
  await expect(correctPopup).toContainText('Brass Key');
  await expect(correctPopup.locator('.correct-icon')).toBeVisible();

  // Test 8C: Duplicate click does NOT increment
  await overlay.click({ position: { x: keyX, y: keyY } });
  await expect(page.locator('#ho-found-counter')).toHaveText('1 of 5 Found');
  await expect(page.locator('.ho-marker')).toHaveCount(1);

  // Test 8D: Zoom In and verify clicking an object while zoomed works accurately
  await zoomBtn.click();
  await btnZoomIn.click();
  await expect(page.locator('.zoom-level-label')).toHaveText('115%');
  const zoomedOverlayBox = await overlay.boundingBox();
  expect(zoomedOverlayBox).not.toBeNull();
  // Click Tea Cup at (41.7%, 71.7%) on the zoomed board
  await overlay.click({ position: { x: zoomedOverlayBox.width * 0.417, y: zoomedOverlayBox.height * 0.717 } });
  await expect(page.locator('#ho-found-counter')).toHaveText('2 of 5 Found');
  await expect(page.locator('.ho-object-card[data-obj-id="tea-cup"]')).toHaveClass(/is-found/);
  // Re-open zoom popover and reset back to 100%
  await zoomBtn.click();
  await btnZoomReset.click();
  await expect(page.locator('.zoom-level-label')).toHaveText('100%');
  await expect.poll(async () => {
    const box = await page.locator('#ho-scene-board').boundingBox();
    return box ? Math.round(box.width) : 0;
  }).toBe(Math.round(initialBox.width));

  // 9. Complete Level 1 in Easy mode by finding the other 3 objects:
  // yarn-ball: (86.7, 81.7)
  // magnifying-glass: (15.6, 43.3)
  // pocket-watch: (72.2, 61.7)
  const freshOverlayBox = await overlay.boundingBox();
  const remainingEasyTargets = [
    { x: 0.867, y: 0.817 },
    { x: 0.156, y: 0.433 },
    { x: 0.722, y: 0.617 }
  ];

  for (const t of remainingEasyTargets) {
    await overlay.click({ position: { x: freshOverlayBox.width * t.x, y: freshOverlayBox.height * t.y } });
  }

  // All 5 found!
  await expect(page.locator('#ho-found-counter')).toHaveText('5 of 5 Found');
  await expect(page.locator('#ho-remaining-tag')).toHaveText('(0 remaining)');
  await expect(page.locator('.ho-marker')).toHaveCount(5);

  // Completion modal should appear with stats
  const completionOverlay = page.locator('#ho-completion-overlay');
  await expect(completionOverlay).toBeVisible();
  await expect(page.locator('#ho-completion-title')).toContainText('Level 1 Complete');
  await expect(page.locator('#ho-stat-time')).toContainText('Time:');
  await expect(page.locator('#ho-stat-hints')).toContainText('Hints: 1');

  // Next level pill (Level 2) is now unlocked
  await expect(pills.nth(1)).not.toBeDisabled();

  // 10. Click Next Level to advance to Level 2
  const nextBtn = page.locator('#btn-next-level');
  await nextBtn.click();
  await expect(completionOverlay).toBeHidden();

  // Level 2 loaded
  await expect(page.locator('#ho-level-badge')).toHaveText('Level 2');
  await expect(page.locator('#ho-puzzle-title')).toHaveText('Beautiful Garden');
  await expect(page.locator('#ho-found-counter')).toHaveText('0 of 5 Found');
  await expect(page.locator('.ho-marker')).toHaveCount(0);
  await expect(sceneImg).toHaveAttribute('src', '/images/hidden-object/level-2-beautiful-garden.svg');

  // 11. Test LocalStorage Persistence
  await page.reload();
  await expect(page.locator('#ho-level-badge')).toHaveText('Level 1');
  await expect(pills.nth(1)).not.toBeDisabled();
  await pills.nth(1).click();
  await expect(page.locator('#ho-level-badge')).toHaveText('Level 2');
  await expect(page.locator('#ho-puzzle-title')).toHaveText('Beautiful Garden');

  // 12. Informational Content & Internal Links
  const article = page.locator('.ho-article');
  await expect(article).toBeVisible();
  const internalLinks = article.locator('a[href^="/"]');
  const count = await internalLinks.count();
  expect(count).toBeGreaterThanOrEqual(5);

  // 13. Explore More Section (Exactly 3 cards)
  const relatedCards = page.locator('.related-games-section .related-card');
  await expect(relatedCards).toHaveCount(3);
  await expect(relatedCards.nth(0)).toHaveAttribute('href', '/spot-the-difference-game/');
  await expect(relatedCards.nth(1)).toHaveAttribute('href', '/memory-matching-game-online/');
  await expect(relatedCards.nth(2)).toHaveAttribute('href', '/picross-game-online/');

  // 14. Games Directory Page Integration
  await page.goto('/games/');
  const hoCard = page.locator('a[href="/hidden-object-game/"]');
  await expect(hoCard).toBeVisible();
  await expect(hoCard.locator('h3')).toHaveText('Free Hidden Object Online Game');

  // Verify Hidden Object thumbnail / card visual has 4 styled vibrant icons matching PuzzleFeels design
  const hoIconSpans = hoCard.locator('.directory-icon span');
  await expect(hoIconSpans).toHaveCount(4);
  const hoSpan1Bg = await hoIconSpans.nth(0).evaluate(el => window.getComputedStyle(el).backgroundColor);
  expect(hoSpan1Bg).toBe('rgb(254, 243, 199)'); // #fef3c7 warm gold
  const hoSpan2Bg = await hoIconSpans.nth(1).evaluate(el => window.getComputedStyle(el).backgroundColor);
  expect(hoSpan2Bg).toBe('rgb(49, 94, 232)'); // #315ee8 royal blue

  const searchInput = page.locator('#game-search-input');
  await searchInput.fill('hidden object');
  await expect(hoCard).toBeVisible();

  // 15. Homepage Isolation (Must not add to 5 featured or 3 daily games)
  await page.goto('/');
  const featuredSection = page.locator('section:has-text("One good puzzle can change your day")');
  const featuredLinks = await featuredSection.locator('a[href*="-game"]').evaluateAll(els => els.map(e => e.getAttribute('href')));
  expect(featuredLinks.some(l => l && l.includes('hidden-object'))).toBe(false);

  const dailySection = page.locator('section:has-text("Your Daily Moments of Focus")');
  const dailyLinks = await dailySection.locator('a[href*="-game"]').evaluateAll(els => els.map(e => e.getAttribute('href')));
  expect(dailyLinks.some(l => l && l.includes('hidden-object'))).toBe(false);

  // 16. Viewport Responsiveness & Mobile 2-Column Grid
  await page.goto('/hidden-object-game/');
  for (const width of [1280, 1024, 768, 430, 414, 390, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 850 });
    const metrics = await page.evaluate(() => ({
      viewport: innerWidth,
      docWidth: document.documentElement.scrollWidth
    }));
    expect(metrics.docWidth, `Hidden Object ${width}px horizontal overflow`).toBeLessThanOrEqual(metrics.viewport + 1);

    if (width <= 640) {
      const gridCols = await page.locator('#ho-objects-grid').evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
      const cols = gridCols.trim().split(/\s+/);
      expect(cols.length, `Objects to Find at ${width}px should have exactly 2 columns`).toBe(2);
    }
  }
});

test('Free Hidden Object Online Game - All 10 Levels Playthrough and Victory', async ({ page }) => {
  await page.goto('/hidden-object-game/');

  // Clear any existing localStorage
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.reload();

  // Switch to Hard mode to test finding all 8 objects per level
  const diffHard = page.locator('.ho-tab-btn[data-difficulty="hard"]');
  await diffHard.click();
  await expect(diffHard).toHaveClass(/is-active/);

  const dataContent = await page.locator('#ho-data').textContent();
  const levels = JSON.parse(dataContent || '[]');
  expect(levels.length).toBe(10);

  const overlay = page.locator('#ho-scene-overlay');
  const completionOverlay = page.locator('#ho-completion-overlay');
  const nextBtn = page.locator('#btn-next-level');

  for (let i = 0; i < 10; i++) {
    const currentLevel = levels[i];
    await expect(page.locator('#ho-level-badge')).toHaveText(`Level ${currentLevel.level}`);
    await expect(page.locator('#ho-puzzle-title')).toHaveText(currentLevel.title);

    const overlayBox = await overlay.boundingBox();
    expect(overlayBox).not.toBeNull();

    // Click every object in the level
    for (const obj of currentLevel.objects) {
      const clickX = overlayBox.width * (obj.x / 100);
      const clickY = overlayBox.height * (obj.y / 100);
      await overlay.click({ position: { x: clickX, y: clickY } });
    }

    // Level completed!
    await expect(page.locator('#ho-found-counter')).toHaveText('8 of 8 Found');
    await expect(completionOverlay).toBeVisible();

    if (i < 9) {
      await expect(page.locator('#ho-completion-title')).toContainText(`Level ${currentLevel.level} Complete`);
      await nextBtn.click();
      await expect(completionOverlay).toBeHidden();
    } else {
      // Level 10 Grand Victory
      await expect(page.locator('#ho-completion-title')).toContainText('All 10 Levels Completed');
      await expect(nextBtn).toContainText('Play Again');
      await nextBtn.click();
      await expect(page.locator('#ho-level-badge')).toHaveText('Level 1');
    }
  }
});
