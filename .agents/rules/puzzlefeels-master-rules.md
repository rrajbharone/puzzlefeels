---
name: PuzzleFeels Master Rules
trigger: always_on
description: Permanent master development, design, and architecture rules for PuzzleFeels.com
---

# PUZZLEFEELS.COM — PERMANENT MASTER PROJECT RULEBOOK

These rules guide all development work on PuzzleFeels.com, including:
- Creating new puzzle games.
- Updating existing games.
- Designing new website sections.
- Improving UI and UX.
- SEO implementation.
- Technical architecture.
- Shared components.
- Responsive design.
- Performance optimization.
- Content creation and internal linking.

These are permanent project-level instructions, not temporary instructions for a single conversation.

---

## 1. Project Identity and Technical Foundation

- **Project**: PuzzleFeels.com
- **Website**: https://puzzlefeels.com
- **Target Audience**: United States
- **Purpose**: A collection of free, browser-based online puzzle games.

### Existing Technology
- Astro 5.x.
- Static Site Generation (SSG).
- HTML, CSS, JavaScript, and Astro components.
- Static-first architecture.
- Existing Cloudflare Pages deployment workflow.

### Core Project Priorities
1. Mobile-first user experience.
2. Fast loading and excellent performance.
3. Consistent design across all games.
4. Reliable and enjoyable gameplay.
5. High-quality SEO and useful content.
6. Reusable and maintainable code.

Always inspect the existing project architecture before making implementation decisions.  
Do not introduce unnecessary frameworks, backends, databases, dependencies, or third-party services.

---

## 2. Existing Website Is the Design Standard

PuzzleFeels already has 12 existing games. These games establish the website's approved design identity.  
Use the existing games as the primary reference for every future development task.

### Important Visual References
- **Sliding Number Puzzle Game**: Reference for typography, title alignment, content width, spacing, responsive design, difficulty selectors, and stats panels.
- **Mahjong Variants Online Game**: Reference for game container layouts, board centering, toolbar controls, modals, and zoom behavior.
- **Spot the Difference Free Online Game**: Reference for the standardized Explore More Puzzle Games section and visual aesthetics.

Use the appropriate reference depending on the component being developed.  
Never treat a new game as an independent website with its own unrelated design. All new games must look like natural additions to PuzzleFeels.com.

### Existing Game Protection
Do not unnecessarily redesign the existing 12 games. Preserve their approved layouts, colors, typography, game boards, controls, and visual hierarchy.  
Only make changes when:
- Explicitly requested by the user.
- A genuine functional or technical issue requires correction.
- A clearly identified inconsistency needs to be fixed.

Do not make unrelated changes just because a new design looks different.

---

## 3. Design Consistency — Mandatory for Every New Game

Before creating any new game:
1. Inspect existing game pages.
2. Study their visual structure.
3. Inspect shared Astro components.
4. Review existing CSS variables and theme styles.
5. Identify reusable UI patterns.
6. Follow the established design system.

Maintain strict consistency in:
- Page width and alignment (`max-width: 1040px`, centered container `.wrap`).
- Section spacing.
- Card dimensions.
- Border radius (`border-radius: 18px`–`20px` for cards, `12px`–`14px` for buttons).
- Borders and subtle box shadows.
- Button design (padding, active states, focus outlines).
- Control placement.
- Game introduction section.
- Game board positioning.
- Difficulty selectors.
- Statistics and toolbars.
- Result and victory overlays.
- Content sections.
- FAQ presentation.
- Related game cards.

Game-specific functionality may require unique controls, but those controls must visually match the existing website.  
Do not independently invent a new visual style for every game.

---

## 4. Typography Standards

Typography consistency is mandatory. Use the existing **Inter font** throughout the entire website.

Maintain consistency in:
- H1, H2, and H3 sizes and weights.
- Font weights (400 for body, 600 for subtitles/labels, 700–800 for headings/emphasis).
- Line heights (1.5–1.65 for paragraphs, 1.2–1.3 for headings).
- Paragraph sizes (15px–16px desktop, 14px–15px mobile).
- Text colors (`var(--ink)` for body, `var(--muted)` for secondary text).
- Button labels.
- Game statistics.
- Form labels.
- Card titles.
- Descriptions.

Avoid:
- Oversized headings.
- Random font sizes.
- Inconsistent font weights.
- Excessive letter spacing.
- Cramped paragraphs.
- Poor mobile readability.
- Unnecessary typography variations.

New games must follow the existing typography hierarchy. Do not introduce additional fonts without explicit approval.

---

## 5. Color System and Theme Consistency

Preserve the approved PuzzleFeels color identity.

### Light Mode
- Keep the established light-mode appearance.
- Do not change approved light-mode colors unnecessarily.
- Reuse existing design tokens (`var(--ink)`, `var(--bg)`, `var(--card)`, `var(--line)`, `var(--blue)`).

### Dark Mode
- Maintain the approved dark background color: `#0B132B`.
- Do not use pure black (`#000000`) as the default dark background.
- Maintain readable text contrast (`#f1f5ff` for headings/primary text, `#a9bcff` or `#8ea8ff` for muted/accents).
- Keep borders (`#27375a`), cards (`#141f3d`), controls, and accents visually distinct.
- Ensure colorful game graphics remain colorful.

### Theme Rules
- Use existing CSS variables and `:global(html[data-theme="dark"])` selectors wherever possible.
- Avoid random hardcoded colors.
- Avoid separate conflicting theme systems.
- Check inherited styles and CSS filters.
- Test every new section in both light and dark modes.

Dark mode must look professionally designed, not like a grayscale or black-and-white version of light mode.

---

## 6. Mobile-First Responsive Design

Mobile usability is one of the highest project priorities. Every new game and feature must work properly on:
- Small smartphones (320px–360px).
- Standard smartphones (375px–390px).
- Large smartphones (414px–430px).
- Tablets (768px–1024px).
- Desktop screens (1200px+).

Requirements:
- No horizontal overflow under any circumstance.
- No clipped game boards.
- No overlapping controls or buttons.
- Touch-friendly buttons (minimum 44px tap targets).
- Responsive game boards that scale or adapt dynamically.
- Properly scaled game elements.
- Readable typography at all screen widths.
- Correctly positioned dialogs and overlays.
- Appropriate spacing and touch margins.
- Responsive navigation.

Always test mobile layouts rather than assuming desktop CSS will automatically work on mobile.

---

## 7. Shared Components and Code Reusability

Always inspect existing reusable components before creating new ones.

### Existing Shared Components
- `Header.astro`: Shared website header navigation.
- `Footer.astro`: Shared website footer.
- `FaqList.astro`: Shared accordion for FAQ lists.
- `ZoomControl.astro`: Shared zoom in/out/fit toolbar for large boards.
- `ExploreMore.astro`: Shared 3-card related games section.

Inspect their actual implementation before reuse.

### Potential Shared Game Components
- `GameBreadcrumbs`
- `GameDifficultySelector`
- `GameStatsBar`
- `GameToolbar`
- `GameOverlayModal`
- `ExploreMorePuzzleGames`

If equivalent components already exist, reuse them.  
Do not create duplicate components with different names for the same purpose.  
Prefer shared components when they genuinely improve consistency and maintainability.  
Keep game-specific gameplay logic separate from reusable UI components.

---

## 8. Standard Game Page Structure

Follow the established page hierarchy for future games:

1. **Website Header** (`<Header />`)
2. **Breadcrumb Navigation** (`<nav aria-label="Breadcrumb">`)
3. **Centered Game Introduction** (Eyebrow, H1, and Short Description)
4. **Game H1** (Primary target keyword)
5. **Short Game Description** (Engaging, concise summary)
6. **Difficulty Selector** (where applicable: Easy · Medium · Hard)
7. **Game Board Container** (`.wrap.game-shell.card`)
8. **Game Controls and Toolbar** (New Game, Restart, Undo, Hint, Sound, Zoom)
9. **Game Statistics and Progress** (Moves, Timer, Best Score, Difficulty)
10. **Result or Victory Interface** (Modal overlay with stats, share, and restart)
11. **Helpful Game-Specific Content** (How to Play, Rules, Strategies, Tips)
12. **FAQ Section** (`<FaqList items={faqs} />`)
13. **Explore More Puzzle Games** (`<ExploreMore currentGameId="..." />`)
14. **Website Footer** (`<Footer />`)

Adapt the structure only when the actual game requires it.

### Breadcrumb Standard
Always use:
`Home › Games › [Current Game Title]`  
Do not skip the `Games` level.

---

## 9. Explore More Puzzle Games — Strict Design Standard

This section has an approved reference design.

**Single source of truth: Explore More Puzzle Games section on Spot the Difference Free Online Game (`src/components/ExploreMore.astro`).**

For every future game:
- Inspect the actual Spot the Difference reference implementation.
- Reuse the same design and shared component (`<ExploreMore currentGameId="..." />`).
- Maintain identical visual hierarchy.
- Use exactly 3 recommendation cards.
- Maintain the same card dimensions and proportions.
- Maintain the same spacing and alignment.
- Maintain the same typography.
- Maintain the same backgrounds, borders, and visual accents.
- Maintain the same hover behavior.
- Maintain the same responsive layout.
- Preserve the colorful appearance in dark mode.

The recommended games can differ depending on the current game, but the section design must remain identical.

### Recommendation Rules
- Exactly 3 cards per page.
- Never recommend the current game.
- Use only games that actually exist.
- Use correct titles and URLs.
- Avoid duplicate recommendations.
- Prefer relevant games.
- Do not link to unfinished or nonexistent routes.

Do not create a different Explore More design for individual games.  
Do not show 4 cards on one page and 3 on another.  
Do not allow dark mode to turn this section black and white.  
If this section is updated in the future, update the shared component rather than maintaining separate designs across game pages.

---

## 10. Game Thumbnail Standards

All game thumbnails must follow a consistent premium visual style.

Requirements:
- Use professional, clean, and visually meaningful graphics.
- Prefer premium SVG icons or custom vector artwork where appropriate.
- Do not use emojis as substitutes for professional game icons.
- Maintain consistent icon proportions and visual quality.
- Use attractive colors that represent the actual game.
- Ensure icons remain sharp at all sizes (desktop 60px grid, mobile 34px–28px grid).
- Avoid inconsistent illustration styles between games.
- Avoid unnecessary external image or icon dependencies.

### Dark Mode Thumbnail Rules
Thumbnails must retain their intended colorful appearance in both themes.  
Check:
- CSS filters.
- Grayscale properties.
- Opacity.
- Inherited theme styles.
- SVG fill and stroke values.
- Theme-specific selectors (`:global(html[data-theme="dark"])`).

Never allow a colorful thumbnail to become unintentionally black and white in dark mode.  
Use appropriate theme-aware styling without changing the approved global color system.

---

## 11. Game Functionality and Reliability

Working gameplay is more important than decorative changes.  
Before changing any existing game, inspect its implementation.

Preserve:
- Puzzle algorithms.
- Puzzle generation and solvability verification.
- Difficulty calculations.
- Scoring and stats tracking.
- Daily challenge logic and deterministic date seeds.
- `localStorage` persistence.
- Save and resume states.
- Restart and reset behavior.
- Timers and move counters.
- Keyboard interactions (arrows, enter, space, numbers).
- Touch and pointer interactions.
- Sound preferences.
- Win and loss conditions.
- Result overlays.

Do not rewrite working game logic without a clear reason.  
Do not introduce regressions through CSS or shared component changes.

For every new game, test:
- Complete gameplay flow from start to finish.
- Every difficulty level.
- Restart and reset.
- Win and loss conditions.
- Mobile touch controls.
- Refresh behavior.
- Persistence, if applicable.

Never claim a feature was tested if it was not actually tested.

---

## 12. SEO Standards

SEO must be implemented naturally and correctly.

### Metadata
Every indexable page must have:
- Unique `<title>`.
- Unique `<meta name="description">`.
- Correct `<link rel="canonical" href="...">`.
- Appropriate `<meta name="robots">` directives.
- Correct Open Graph and Twitter Card metadata where applicable.

### Project Meta Description Standard
For PuzzleFeels game pages, the target is:
**145–160 characters, including spaces and punctuation.**

This is a project-specific editorial standard.
Requirements:
- Count characters programmatically.
- Never estimate character count manually.
- Include the primary keyword naturally.
- Describe the actual game and its player experience.
- Avoid keyword stuffing.
- Avoid repetitive or generic descriptions.

### Heading Hierarchy
- Exactly one clear H1 per page.
- Logical H2 and H3 hierarchy.
- No unnecessary heading repetition.
- Do not use heading tags purely for visual styling.

### Content Quality
Every game page must contain useful, original, game-specific content. Include relevant topics such as:
- How to play.
- Rules and controls.
- Difficulty levels.
- Strategies and tips.
- Common mistakes.
- Gameplay explanations.
- Relevant player questions.

Avoid generic filler content and unnecessary word-count targets. Content must accurately describe the actual game.

### Internal Linking
- Link related games naturally within article content.
- Use descriptive anchor text.
- Maintain `Home → Games → Current Game` hierarchy.
- Avoid excessive or spammy internal linking.
- Do not create links to nonexistent routes.
- Include the standardized Explore More Puzzle Games section.

### Technical SEO
Maintain:
- Correct `sitemap.xml`.
- Correct `robots.txt`.
- Correct canonical URLs with trailing slashes.
- Clean URL structure (`/[game-name]/`).
- Valid internal links.
- Appropriate indexing directives.
- No accidental duplicate pages.

Do not change approved game URLs or add redirects without explicit approval.

---

## 13. Structured Data and Schema Rules

Use appropriate structured data that accurately represents visible page content.

### Potential Game Page Schemas
- `VideoGame`
- `BreadcrumbList`
- `FAQPage` (where visible FAQs exist)

### Strict Schema Requirements
- Inspect existing schemas before adding anything.
- Never duplicate the same schema entity.
- Avoid duplicate JSON-LD blocks on a single page.
- Do not inject the same schema through both layout and page components.
- Ensure valid JSON-LD syntax.
- Use accurate properties and values.
- FAQ content in schema must exactly match visible FAQs on that page.
- Never add fake or hidden FAQ content just for structured data.
- Preserve existing valid schemas.
- Validate structured data after implementation.

Do not promise Google rich results simply because schema exists. Follow current Google Search Central guidelines.

---

## 14. Content and Website Architecture

Maintain the existing project architecture and approved routes:
- Use `/games/` for the game directory/listing page.
- Preserve existing game URLs.
- Maintain the existing navigation structure.
- Reuse the approved `Header` and `Footer`.
- Keep informational and legal pages consistent (`/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/cookie-policy/`).
- Do not add unnecessary footer links.
- Preserve approved contact information.
- Inspect the existing game registry before adding a game.

Every new game must be registered correctly and appear in the appropriate listings and internal links.

---

## 15. Performance and Code Quality

Performance is a core requirement:
- Prefer static rendering (SSG).
- Avoid unnecessary client-side JavaScript.
- Optimize images and assets.
- Avoid layout shifts (CLS = 0).
- Minimize third-party scripts.
- Reuse existing dependencies.
- Avoid unnecessary packages.
- Keep CSS and JavaScript lightweight.
- Maintain clean, readable, and understandable code.
- Avoid large global CSS changes that affect unrelated pages.

Do not sacrifice gameplay or mobile usability for minor performance gains.

---

## 16. Mandatory Workflow for Creating New Games

Whenever a new game is requested, follow this 6-step process:

1. **Step 1 — Inspect**: Inspect existing game pages, design references, shared components, CSS variables, typography, game registry, routing, and SEO conventions.
2. **Step 2 — Plan**: Identify reusable components, game-specific requirements, controls, interactions, difficulty levels, responsive requirements, and SEO content requirements.
3. **Step 3 — Implement**: Build using the existing design system. Reuse shared components. Follow typography, colors, spacing, breadcrumbs, game structure, and Explore More standards.
4. **Step 5 — Integrate**: Add the game to the game registry, relevant listing pages (`/games/`, homepage), natural internal links, 3 relevant Explore More recommendations, metadata, and schema.
5. **Step 5 — Validate**: Test gameplay, mobile responsiveness, light/dark themes, routes, metadata, structured data, internal links, and production build.
6. **Step 6 — Report**: Provide a concise report explaining what was created, files changed, components reused, features tested, build results, and any remaining issues.

Never skip the inspection stage.

---

## 17. Rules for Updating Existing Games

When an improvement is requested:
- Understand the exact requested change.
- Inspect the affected implementation.
- Make the smallest effective modification.
- Preserve the approved design.
- Preserve working gameplay.
- Avoid unrelated changes.
- Avoid redesigning other games.
- Test the affected functionality.

If a requested change may break existing functionality, explain the risk before proceeding.

---

## 18. Development and Testing Environment

This project is developed on Windows. Use the appropriate Windows-compatible commands.

For production builds, always use:
```powershell
npm.cmd run build
```
Do not assume plain `npm` or `npx` commands will work in PowerShell because of execution policy restrictions.

Use existing Playwright tests where available.

Before completing substantial work:
- Run the production build (`npm.cmd run build`).
- Check errors and warnings.
- Verify affected routes.
- Test relevant interactions.
- Check mobile and desktop.
- Validate metadata and schema.
- Check internal links.

Never claim a successful build or test without actually running it.

---

## 19. Change Safety and Approval

These restrictions are mandatory:
- Do not make unrelated changes.
- Do not rewrite working files unnecessarily.
- Do not replace the existing architecture without approval.
- Do not change approved colors or typography.
- Do not change existing game URLs.
- Do not add redirects without approval.
- Do not remove working features without approval.
- Do not introduce paid services or dependencies without approval.
- Inspect important files before modifying them.
- For large architectural changes, provide an implementation plan first.

For small, clearly defined tasks, proceed efficiently without unnecessary questions.  
If an instruction is ambiguous and could cause a breaking change, ask before proceeding.

---

## 20. Final Report After Substantial Tasks

Always provide a concise, honest report containing:
- Work completed.
- Files created or modified.
- Shared components reused.
- Existing functionality preserved.
- Build results.
- Tests performed.
- Remaining issues.

Clearly distinguish completed work from anything that still needs testing.

---

## Final Master Principle

PuzzleFeels.com must grow as **ONE consistent, professional puzzle gaming website**.

Every new game must inherit the established design identity, typography, color system, reusable components, responsive behavior, SEO standards, and content hierarchy.

The 12 existing games are the established design foundation. Protect them from unnecessary redesigns and regressions.  
The Spot the Difference Explore More Puzzle Games section is the mandatory reference for that component.

**Consistency, mobile usability, performance, useful gameplay, SEO quality, and long-term maintainability must guide every development decision.**

These rules remain active for all future PuzzleFeels.com development sessions unless explicitly changed by the user.
