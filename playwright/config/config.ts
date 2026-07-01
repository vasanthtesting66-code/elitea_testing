/**
 * config.ts
 * Central configuration for the OrangeHRM Playwright automation suite.
 * All environment-specific values are read from process.env so that
 * the suite can run across multiple environments without code changes.
 */

export const config = {
  /** Base URL of the application under test */
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',

  /** Default navigation timeout (ms) */
  navigationTimeout: Number(process.env.NAV_TIMEOUT ?? 30_000),

  /** Default action / assertion timeout (ms) */
  actionTimeout: Number(process.env.ACTION_TIMEOUT ?? 10_000),

  /** Credentials – never hardcoded; override via environment variables */
  credentials: {
    validUsername: process.env.VALID_USERNAME ?? 'Admin',
    validPassword: process.env.VALID_PASSWORD ?? 'admin123',
  },
} as const;
