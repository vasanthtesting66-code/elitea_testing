import { test, expect } from '../fixtures/auth.fixtures';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { loginTestData } from '../test-data/login.data';
import { AssertionHelper } from '../utils/AssertionHelper';

test.describe('Authentication - Logout', () => {
  test('TC_007 - Verify that the user is successfully logged out and redirected to the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Precondition: Log in with valid credentials', async () => {
      await loginPage.goto();
      await loginPage.login(loginTestData.validCredentials.username, loginTestData.validCredentials.password);
      await page.waitForURL('**/dashboard/index', { timeout: 15000 });
    });

    await test.step('Step 1: Verify the user is on the Dashboard page after login', async () => {
      await AssertionHelper.assertVisible(dashboardPage.dashboardHeading, 'Dashboard heading should be visible');
      expect(page.url()).toContain('/dashboard/index');
    });

    await test.step('Step 2: Locate and click the user profile menu', async () => {
      await dashboardPage.openUserProfileMenu();
      await AssertionHelper.assertVisible(dashboardPage.logoutMenuItem, 'Logout option should be visible in dropdown');
    });

    await test.step('Step 3: Click the Logout option', async () => {
      await dashboardPage.clickLogout();
    });

    await test.step('Step 4: Verify user is redirected to the login page', async () => {
      await page.waitForURL('**/auth/login', { timeout: 15000 });
      expect(page.url()).toContain('/auth/login');
    });

    await test.step('Step 5: Verify the login page is displayed with all elements', async () => {
      await AssertionHelper.assertVisible(loginPage.usernameInput, 'Username field should be visible on login page');
      await AssertionHelper.assertVisible(loginPage.passwordInput, 'Password field should be visible on login page');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible on login page');
    });
  });
});
