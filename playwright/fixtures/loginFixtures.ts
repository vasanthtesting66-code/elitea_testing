/**
 * loginFixtures.ts
 * Custom Playwright fixtures providing pre-constructed Page Objects
 * for login-related test suites.
 *
 * Usage:
 *   import { test, expect } from '../fixtures/loginFixtures';
 *
 * The loginPage fixture automatically navigates to the login URL
 * before each test and tears down afterwards.
 */
import { test as base } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage';

type LoginFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
    // No teardown required for the login page
  },
});

export { expect } from '@playwright/test';
