import fs from 'fs';

const testCode = `
test('Murdoku Online Game: full gameplay, solver validation, accessibility, and zero emojis', async ({ page }) => {
  // 1. Navigate to Murdoku page
  const response = await page.goto('/murdoku-online-game/');
  expect(response?.status()).toBe(200);

  // 2. Identity and SEO Checks
  await expect(page.locator('h1')).toHaveText('Murdoku Online Game');
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
  const fullHtml = await page.content();
  const emojiRegex = /[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]/u;
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
    expect(metrics.docWidth, \`Murdoku \${width}px horizontal overflow\`).toBeLessThanOrEqual(metrics.viewport + 1);
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
`;

const existing = fs.readFileSync('tests/e2e/website.spec.mjs', 'utf-8');
fs.writeFileSync('tests/e2e/website.spec.mjs', existing + '\n' + testCode, 'utf-8');
console.log('Appended Murdoku E2E test to tests/e2e/website.spec.mjs');
