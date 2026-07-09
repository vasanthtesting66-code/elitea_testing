import { test, expect } from '../fixtures/base.fixture';
import authData from '../test-data/auth.json';

test.describe('TC_001 | TC_002 - Authentication Module - Login Feature', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC_001 - HR Administrator logs in successfully and accesses the Dashboard', async ({
    page,
    loginPage,
  }) => {
    const testData = authData.TC_001;

    await test.step('Step 1: Navigate to OrangeHRM login page', async () => {
      await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
      await expect(loginPage.getUsernameInput()).toBeVisible();
      await expect(loginPage.getPasswordInput()).toBeVisible();
    });

    await test.step(`Step 2: Enter valid username '${testData.username}'`, async () => {
      await loginPage.enterUsername(testData.username);
      await expect(loginPage.getUsernameInput()).toHaveValue(testData.username);
    });

    await test.step(`Step 3: Enter valid password '${testData.password}'`, async () => {
      await loginPage.enterPassword(testData.password);
      await expect(loginPage.getPasswordInput()).toHaveValue(testData.password);
    });

    await test.step('Step 4: Click the Login button and verify redirection to Dashboard', async () => {
      await loginPage.clickLoginButton();
      await page.waitForURL(/\/dashboard\/index/, { timeout: 15000 });
    });

    await test.step('Step 5: Assert the current URL contains /dashboard/index', async () => {
      await expect(page).toHaveURL(new RegExp(testData.expectedUrl));
    });

    await test.step('Step 6: Assert the Dashboard heading is visible', async () => {
      const dashboardHeading = page.getByRole('heading', { name: testData.expectedPageTitle, level: 6 });
      await expect(dashboardHeading).toBeVisible();
    });
  });

  test('TC_002 - Login attempt with invalid username and password is rejected', async ({
    page,
    loginPage,
  }) => {
    const testData = authData.TC_002;

    await test.step('Step 1: Navigate to the OrangeHRM login page', async () => {
      await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
    });

    await test.step(`Step 2: Enter invalid username '${testData.username}'`, async () => {
      await loginPage.enterUsername(testData.username);
      await expect(loginPage.getUsernameInput()).toHaveValue(testData.username);
    });

    await test.step(`Step 3: Enter invalid password '${testData.password}'`, async () => {
      await loginPage.enterPassword(testData.password);
    });

    await test.step('Step 4: Click the Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Assert user remains on the login page (NOT redirected to Dashboard)', async () => {
      await expect(page).toHaveURL(/\/auth\/login/);
      await expect(page).not.toHaveURL(/\/dashboard\/index/);
    });

    await test.step(`Step 6: Assert error message '${testData.expectedErrorMessage}' is displayed`, async () => {
      await expect(loginPage.getErrorAlertLocator()).toBeVisible();
      await expect(loginPage.getErrorAlertLocator()).toContainText(testData.expectedErrorMessage);
    });
  });
});
