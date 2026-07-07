import { test, expect } from '../fixtures/auth.fixtures';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { loginTestData } from '../test-data/login.data';
import { UrlHelper } from '../utils/UrlHelper';
import { AssertionHelper } from '../utils/AssertionHelper';

test.describe('Authentication - Session Management', () => {
  test('TC_008 - Verify that protected pages are inaccessible after logout without re-authentication', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Precondition: Log in and then log out', async () => {
      await loginPage.goto();
      await loginPage.login(loginTestData.validCredentials.username, loginTestData.validCredentials.password);
      await page.waitForURL('**/dashboard/index', { timeout: 15000 });
      await dashboardPage.logout();
      await page.waitForURL('**/auth/login', { timeout: 15000 });
    });

    await test.step('Step 1: Confirm the user is logged out and on the login page', async () => {
      expect(page.url()).toContain('/auth/login');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible confirming no active session');
    });

    await test.step('Step 2: Directly navigate to the protected Dashboard URL', async () => {
      await page