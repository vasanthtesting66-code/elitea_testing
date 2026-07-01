/**
 * playwright.config.ts
 * Root Playwright configuration for the OrangeHRM automation suite.
 */
import { defineConfig, devices } from '@playwright/test';
import { config as appConfig }   from './config/config';

export default defineConfig({
  testDir: './tests',

  /** Run tests in parallel across workers */
  fullyParallel: true,

  /** Fail the build on accidental test.only() in CI */
  forbidOnly: !!process.env.CI,

  /** Retry failed tests twice in CI, none locally */
  retries: process.env.CI ? 2 : 0,

  /** Limit parallelism in CI to avoid resource contention */
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['html',  { outputFolder: '../playwright-report', open: 'never' }],
    ['list'],
    ['junit', { outputFile: '../test-results/junit.xml' }],
  ],

  use: {
    baseURL:           appConfig.baseUrl,
    navigationTimeout: appConfig.navigationTimeout,
    actionTimeout:     appConfig.actionTimeout,

    /** Collect a trace on the first retry to aid debugging */
    trace:      'on-first-retry',

    /** Capture screenshots only on failure */
    screenshot: 'only-on-failure',

    /** Record video on the first retry */
    video:      'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use:  { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use:  { ...devices['Desktop Safari'] },
    },
  ],
});
