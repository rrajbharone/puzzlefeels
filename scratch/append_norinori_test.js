import fs from 'fs';

const testCode = `
test('Norinori Game Online - Complete E2E Suite', async ({ page }) => {
  // 1. Page Load & Basic Metadata
  await page.goto('/norinori-game/');
  await expect(page).toHaveTitle(/Norinori Game Online/);
  
  const h1 = page.locator('h1');
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
  await page.locator('[data-close-modal="victory"]').click();
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
    expect(metrics.docWidth, \`Norinori \${width}px horizontal overflow\`).toBeLessThanOrEqual(metrics.viewport + 1);
  }
});
`;

fs.appendFileSync('tests/e2e/website.spec.mjs', testCode);
console.log('Appended Norinori test to tests/e2e/website.spec.mjs');
