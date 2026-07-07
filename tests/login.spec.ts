import { test, expect } from '../fixtures/auth.fixtures';
import { ENV } from '../config/environment';
import { AUTH_MESSAGES } from '../test-data/auth.data';

test.describe('Authentication – Login Feature', () => {
  test('TC_001 – Verify successful login with valid username and password', async ({
    loginPage,
    dashboardPage,
  }) => {
    await test.step('Step 1 – Navigate to the OrangeHRM login page', async () => {
      await expect(loginPage.loginHeading).toBeVisible();
    });

    await test.step('Step 2 – Verify presence of Username, Password fields, and Login button', async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.usernameInput).toBeEnabled();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeEnabled();
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    });

    await test.step('Step 3 – Enter valid username', async () => {
      await loginPage.enterUsername(ENV.CREDENTIALS.VALID.username);
      await expect(loginPage.usernameInput).toHaveValue(ENV.CREDENTIALS.VALID.username);
    });

    await test.step('Step 4 – Enter valid password and verify masking', async () => {
      await loginPage.enterPassword(ENV.CREDENTIALS.VALID.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 5 – Click the Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 6 – Verify redirect to Dashboard URL', async () => {
      await dashboardPage.waitForDashboardLoad();
      const currentUrl = await dashboardPage.getCurrentUrl();
      expect(currentUrl).toContain('/dashboard');
    });

    await test.step('Step 7 – Verify Dashboard content is displayed', async () => {
      await expect(dashboardPage.dashboardHeading).toBeVisible();
     