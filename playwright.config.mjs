import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4321';
const isCI = Boolean(process.env.CI);
const webServerCommand = process.platform === 'win32'
  ? 'npm.cmd run dev'
  : 'npm run dev';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  outputDir: 'test-results',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    browserName: 'chromium',
    screenshot: 'off',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  webServer: {
    command: webServerCommand,
    url: baseURL + '/picross-game-online/',
    timeout: 120_000,
    reuseExistingServer: !isCI,
  },
});
