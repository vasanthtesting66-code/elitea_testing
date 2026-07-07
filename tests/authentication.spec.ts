import { test, expect } from '../fixtures/base.fixture';
import { authData } from '../test-data/auth.data';

test.describe('Authentication – Login Feature', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('TC_001 – HR Administrator successfully logs in and accesses the Dashboard', async ({
    loginPage,
    page,
  }) => {
    await test.step('Step 1 – Verify Login page is displayed with Username and Password fields', async () => {
      expect(await loginPage.isUsernameFieldVisible()).toBe(true);
      expect(await loginPage.isPasswordFieldVisible()).toBe(true);
    });

    await test.step('Step 2 – Enter valid username into the Username field', async () => {
      await loginPage.enterUsername(authData.validCredentials.username);
      const value = await loginPage.getUsernameFieldValue();
      expect(value).toBe(authData.validCredentials.username);
    });

    await test.step('Step 3 – Enter valid password into the Password field and verify it is masked', async () => {
      await loginPage.enterPassword(authData.validCredentials.password);
      const inputType = await loginPage.getPasswordInputType();
      expect(inputType).toBe('password');
    });

    await test.step('Step 4 – Click the Login button and verify authentication', async () => {
      await loginPage.clickLoginButton();
      await page.waitForURL(`**${authData.expectedUrls.dashboard}**`, { timeout: 15000 });
    });

    await test.step('Step 5 – Verify Dashboard page is displayed and URL is correct', async () => {
      expect(page.url()).toContain(authData.expectedUrls.dashboard);
      const heading = page.getByRole('heading', { name: authData.expectedTitles.dashboard });
      await expect(heading).toBeVisible();
      const pimLink = page.getByRole('link', { name: 'PIM' });
      await expect(pimLink).toBeVisible();
    });
  });

  test('TC_002 – HR Administrator login fails with invalid credentials', async ({
    loginPage,
    page,
  }) => {
    await test.step('Step 1 – Verify Login page is displayed with Username and Password fields', async () => {
      expect(await loginPage.isUsernameFieldVisible()).toBe(true);
      expect(await loginPage.isPasswordFieldVisible()).toBe(true);
    });

    await test.step('Step 2 – Enter invalid username into the Username field', async () => {
      await loginPage.enterUsername(authData.invalidCredentials.username);
    });

    await test.step('Step 3 – Enter invalid password into the Password field', async () => {
      await loginPage.enterPassword(authData.invalidCredentials.password);
      const inputType = await loginPage.getPasswordInputType();
      expect(inputType).toBe('password');
    });

    await test.step('Step 4 – Click the Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5 – Verify error message is displayed and user remains on login page', async () => {
      expect(await loginPage.isErrorMessageVisible()).toBe(true);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(authData.invalidCredentials.expectedErrorMessage);
      expect(page.url()).toContain(authData.expectedUrls.loginPage);
      const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
      await expect(dashboardHeading).not.toBeVisible();
    });
  });
});
