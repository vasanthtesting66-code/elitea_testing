import { test, expect } from '../fixtures/authenticated.fixture';
import { securityData } from '../test-data';

test.describe('Authentication – Session Management and Security', () => {
  test('TC_009 – Logged-out user cannot access PIM module or Employee pages', async ({
    authenticatedPage,
    dashboardPage,
  }) => {
    await test.step('Step 1 – Click on the user profile dropdown menu', async () => {
      await dashboardPage.openUserProfileDropdown();
      const logoutMenuItem = authenticatedPage.getByRole('menuitem', { name: 'Logout' });
      await expect(logoutMenuItem).toBeVisible();
    });

    await test.step('Step 2 – Click the Logout option and verify session is terminated', async () => {
      await dashboardPage.clickLogout();
      await authenticatedPage.waitForURL(`**${securityData.expectedRedirectUrl}**`, { timeout: 15000 });
    });

    await test.step('Step 3 – Verify the current URL contains /auth/login', async () => {
      expect(authenticatedPage.url()).toContain(securityData.expectedRedirectUrl);
    });

    await test.step('Step 4 – Attempt to directly navigate to Employee List page', async () => {
      const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php';
      await authenticatedPage.goto(`${baseUrl}${securityData.protectedUrls.employeeList}`);
    });

    await test.step('Step 5 – Verify user is redirected back to Login page', async () => {
      await authenticatedPage.waitForURL(`**${securityData.expectedRedirectUrl}**`, { timeout: 15000 });
      expect(authenticatedPage.url()).toContain(securityData.expectedRedirectUrl);
      const usernameInput = authenticatedPage.getByRole('textbox', { name: 'Username' });
      await expect(usernameInput).toBeVisible();
    });

    await test.step('Step 6 – Attempt to directly navigate to Add Employee page and verify redirect to Login', async () => {
      const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php';
      await authenticatedPage.goto(`${baseUrl}${securityData.protectedUrls.addEmployee}`);
      await authenticatedPage.waitForURL(`**${securityData.expectedRedirectUrl}**`, { timeout: 15000 });
      expect(authenticatedPage.url()).toContain(securityData.expectedRedirectUrl);
      const usernameInput = authenticatedPage.getByRole('textbox', { name: 'Username' });
      await expect(usernameInput).toBeVisible();
    });
  });
});
