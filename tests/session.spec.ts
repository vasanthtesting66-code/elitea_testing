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
      await page.goto(UrlHelper.getDashboardUrl());
    });

    await test.step('Step 3: Verify user is not granted access and is redirected to login page', async () => {
      await page.waitForURL('**/auth/login', { timeout: 15000 });
      expect(page.url()).toContain('/auth/login');
      expect(page.url()).not.toContain('/dashboard/index');
    });

    await test.step('Step 4: Verify login page is rendered confirming protected page is inaccessible', async () => {
      await AssertionHelper.assertVisible(loginPage.usernameInput, 'Username field should be visible on login page');
      await AssertionHelper.assertVisible(loginPage.passwordInput, 'Password field should be visible on login page');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible confirming login page is displayed');
    });
  });

  test('TC_009 - Verify that the user remains logged in during an active session until explicit logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Precondition: Log in with valid credentials', async () => {
      await loginPage.goto();
      await loginPage.login(loginTestData.validCredentials.username, loginTestData.validCredentials.password);
      await page.waitForURL('**/dashboard/index', { timeout: 15000 });
    });

    await test.step('Step 1: Verify the user is on the Dashboard page after successful login', async () => {
      await AssertionHelper.assertVisible(dashboardPage.dashboardHeading, 'Dashboard heading should be visible');
      await AssertionHelper.assertVisible(dashboardPage.sideNavigation, 'Side navigation should be visible');
      await AssertionHelper.assertVisible(dashboardPage.userProfileName, 'User profile name should be visible');
    });

    await test.step('Step 2: Navigate to another protected page (Admin module)', async () => {
      await dashboardPage.navigateToAdmin();
      await page.waitForURL('**/admin/**', { timeout: 15000 });
      expect(page.url()).toContain('/admin/');
      const isLoginVisible = await loginPage.loginButton.isVisible();
      expect(isLoginVisible).toBe(false);
    });

    await test.step('Step 3: Navigate back to the Dashboard page', async () => {
      await dashboardPage.navigateToDashboard();
      await page.waitForURL('**/dashboard/index', { timeout: 15000 });
      expect(page.url()).toContain('/dashboard/index');
    });

    await test.step('Step 4: Verify user information is still displayed confirming session persistence', async () => {
      await AssertionHelper.assertVisible(dashboardPage.dashboardHeading, 'Dashboard heading should still be visible');
      await AssertionHelper.assertVisible(dashboardPage.sideNavigation, 'Side navigation should still be visible');
      await AssertionHelper.assertVisible(dashboardPage.userProfileName, 'User profile name should still be visible confirming session persistence');
    });
  });
});