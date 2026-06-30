import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

// ─── Type definitions ───────────────────────────────────────────────────────

export type AuthFixtures = {
  /** Pre-constructed LoginPage instance */
  loginPage: LoginPage;

  /** Credentials resolved from environment variables */
  credentials: {
    email: string;
    validPassword: string;
    wrongPassword: string;
  };
};

// ─── Extended test with auth fixtures ───────────────────────────────────────

export const test = base.extend<AuthFixtures>({
  /**
   * Provide a LoginPage instance that has already navigated to the login route.
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  /**
   * Resolve test credentials from environment variables.
   * Throws early with a descriptive message if any required variable is absent.
   */
  credentials: async ({}, use) => {
    const email = process.env.TEST_USER_EMAIL;
    const validPwd = process.env.TEST_USER_VALID_PASSWORD;
    const wrongPwd = process.env.TEST_USER_WRONG_PASSWORD ?? 'WrongPassword999';

    if (!email) throw new Error('Missing env var: TEST_USER_EMAIL');
    if (!validPwd) throw new Error('Missing env var: TEST_USER_VALID_PASSWORD');

    await use({ email, validPassword: validPwd, wrongPassword: wrongPwd });
  },
});

export { expect } from '@playwright/test';
