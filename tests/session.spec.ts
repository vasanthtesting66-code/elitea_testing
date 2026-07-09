import { test, expect } from '../fixtures/base.fixture';
import { NavigationPage } from '../pages/NavigationPage';
import authData from '../test-data/auth.json';

test.describe('TC_010 - Authentication Module - Session Management', () => {
  test('TC_010 - Verify PIM module is inaccessible after user logs out', async ({
    authenticatedPage: page,
  }) => {
    const testData = authData.TC_010;
    const navigation = new NavigationPage(page);
    const baseUrl = process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php';

    await test.step('Precondition: Verify user is on the Dashboard page', async () => {
      await expect(page).toHaveURL(/\/dashboard\/index/);
    });

    await test.step('Step 1: Click the user avatar/account menu in the top-right corner', async () => {
      await page.locator('.oxd-userdropdown-tab').click();
      await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    });

    await test.step('Step 2: Click the Logout option to terminate the session', async () => {
      await page.getByRole('menuitem', { name: 'Logout' }).click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Step 3: Assert the current URL contains /auth/login', async () => {
      await expect(page).toHaveURL(new RegExp(testData.expectedRedirectUrl));
    });

    await test.step(`Step 4: Directly navigate to protected URL '${testData.protectedUrl}'`, async () => {
      await page.goto(`${baseUrl}${testData.protectedUrl}`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Step 5: Assert user is redirected to Login page and NOT shown the Employee List', async () => {
      await expect(page).toHaveURL(new RegExp(testData.expectedRedirectUrl));
      await expect(page).not.toHaveURL(/\/pim\/viewEmployeeList/);
      await expect(page.getByRole('heading', { name: testData.expectedPageTitle, level: 5 })).toBeVisible();
    });

    await test.step(`Step 6: Directly navigate to protected URL '${testData.addEmployeeUrl}'`, async () => {
      await page.goto(`${baseUrl}${testData.addEmployeeUrl}`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Step 7: Assert user is redirected to Login page and NOT shown the Add Employee form', async () => {
      await expect(page).toHaveURL(new RegExp(testData.expectedRedirectUrl));
      await expect(page).not.toHaveURL(/\/pim\/addEmployee/);
      await expect(page.getByRole('heading', { name: testData.expectedPageTitle, level: 5 })).toBeVisible();
    });
  });
});
