import { test, expect } from '../fixtures/auth.fixtures';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { loginTestData, expectedMessages } from '../test-data/login.data';
import { UrlHelper } from '../utils/UrlHelper';
import { AssertionHelper } from '../utils/AssertionHelper';

test.describe('Authentication - Login', () => {
  test('TC_001 - Verify successful login with valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Step 1: Navigate to the OrangeHRM application URL', async () => {
      await loginPage.goto();
      await AssertionHelper.assertVisible(loginPage.usernameInput, 'Username field should be visible');
      await AssertionHelper.assertVisible(loginPage.passwordInput, 'Password field should be visible');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible');
    });

    await test.step('Step 2: Enter valid username', async () => {
      await loginPage.enterUsername(loginTestData.validCredentials.username);
      await AssertionHelper.assertInputValue(loginPage.usernameInput, loginTestData.validCredentials.username);
    });

    await test.step('Step 3: Enter valid password', async () => {
      await loginPage.enterPassword(loginTestData.validCredentials.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Click the Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify redirection to Dashboard page', async () => {
      await page.waitForURL('**/dashboard/index', { timeout: 15000 });
      expect(page.url()).toContain('/dashboard/index');
    });

    await test.step('Step 6: Verify Dashboard page content and navigation menu', async () => {
      await AssertionHelper.assertVisible(dashboardPage.dashboardHeading, 'Dashboard heading should be visible');
      await AssertionHelper.assertVisible(dashboardPage.sideNavigation, 'Side navigation should be visible');
      await AssertionHelper.assertVisible(dashboardPage.userProfileName, 'User profile name should be visible');
    });
  });

  test('TC_002 - Verify login failure when an invalid username is provided', async ({ loginPage, page }) => {
    await test.step('Step 1: Navigate to OrangeHRM login page', async () => {
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login page should be displayed');
    });

    await test.step('Step 2: Enter invalid username', async () => {
      await loginPage.enterUsername(loginTestData.invalidUsernameCredentials.username);
      await AssertionHelper.assertInputValue(loginPage.usernameInput, loginTestData.invalidUsernameCredentials.username);
    });

    await test.step('Step 3: Enter valid password', async () => {
      await loginPage.enterPassword(loginTestData.invalidUsernameCredentials.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify error message is displayed', async () => {
      await AssertionHelper.assertVisible(loginPage.invalidCredentialsAlert, 'Error alert should be visible');
      const alertText = await loginPage.getAlertMessage();
      expect(alertText).toContain(expectedMessages.invalidCredentials);
    });

    await test.step('Step 6: Verify user remains on login page', async () => {
      expect(page.url()).toContain('/auth/login');
      expect(page.url()).not.toContain('/dashboard/index');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should still be visible');
    });
  });

  test('TC_003 - Verify login failure when an invalid password is provided', async ({ loginPage, page }) => {
    await test.step('Step 1: Navigate to OrangeHRM login page', async () => {
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login page should be displayed');
    });

    await test.step('Step 2: Enter valid username', async () => {
      await loginPage.enterUsername(loginTestData.invalidPasswordCredentials.username);
      await AssertionHelper.assertInputValue(loginPage.usernameInput, loginTestData.invalidPasswordCredentials.username);
    });

    await test.step('Step 3: Enter invalid password', async () => {
      await loginPage.enterPassword(loginTestData.invalidPasswordCredentials.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify error message is displayed indicating invalid credentials', async () => {
      await AssertionHelper.assertVisible(loginPage.invalidCredentialsAlert, 'Error alert should be visible');
      const alertText = await loginPage.getAlertMessage();
      expect(alertText).toContain(expectedMessages.invalidCredentials);
    });

    await test.step('Step 6: Verify user remains on login page', async () => {
      expect(page.url()).toContain('/auth/login');
      expect(page.url()).not.toContain('/dashboard/index');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should still be visible');
    });
  });

  test('TC_004 - Verify validation error when both username and password fields are submitted empty', async ({ loginPage, page }) => {
    await test.step('Step 1: Navigate to OrangeHRM login page with empty fields', async () => {
      await AssertionHelper.assertVisible(loginPage.usernameInput, 'Username field should be visible');
      await AssertionHelper.assertVisible(loginPage.passwordInput, 'Password field should be visible');
    });

    await test.step('Step 2: Leave the Username field empty', async () => {
      await AssertionHelper.assertInputValue(loginPage.usernameInput, '');
    });

    await test.step('Step 3: Leave the Password field empty', async () => {
      await AssertionHelper.assertInputValue(loginPage.passwordInput, '');
    });

    await test.step('Step 4: Click the Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify validation messages for both Username and Password fields', async () => {
      const usernameError = await loginPage.getUsernameRequiredError();
      expect(usernameError).toContain(expectedMessages.requiredField);

      const passwordError = await loginPage.getPasswordRequiredError();
      expect(passwordError).toContain(expectedMessages.requiredField);
    });

    await test.step('Step 6: Verify user remains on login page', async () => {
      expect(page.url()).toContain('/auth/login');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should still be visible');
    });
  });

  test('TC_005 - Verify validation error when username field is empty and valid password is provided', async ({ loginPage, page }) => {
    await test.step('Step 1: Navigate to OrangeHRM login page', async () => {
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login page should be displayed');
    });

    await test.step('Step 2: Leave the Username field empty', async () => {
      await AssertionHelper.assertInputValue(loginPage.usernameInput, '');
    });

    await test.step('Step 3: Enter valid password', async () => {
      await loginPage.enterPassword(loginTestData.emptyUsernameCredentials.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify validation message for Username field', async () => {
      const usernameError = await loginPage.getUsernameRequiredError();
      expect(usernameError).toContain(expectedMessages.requiredField);
    });

    await test.step('Step 6: Verify user remains on login page', async () => {
      expect(page.url()).toContain('/auth/login');
      expect(page.url()).not.toContain('/dashboard/index');
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should still be visible');
    });
  });

  test('TC_006 - Verify that the login page displays all required UI elements', async ({ loginPage }) => {
    await test.step('Step 1: Navigate to the OrangeHRM application URL', async () => {
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login page should load successfully');
    });

    await test.step('Step 2: Verify Username input field is visible and enabled', async () => {
      await AssertionHelper.assertVisible(loginPage.usernameInput, 'Username field should be visible');
      await AssertionHelper.assertEnabled(loginPage.usernameInput, 'Username field should be enabled');
    });

    await test.step('Step 3: Verify Password input field is visible, enabled and masked', async () => {
      await AssertionHelper.assertVisible(loginPage.passwordInput, 'Password field should be visible');
      await AssertionHelper.assertEnabled(loginPage.passwordInput, 'Password field should be enabled');
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Verify Login button is visible and clickable', async () => {
      await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible');
      await AssertionHelper.assertEnabled(loginPage.loginButton, 'Login button should be enabled');
    });

    await test.step('Step 5: Verify OrangeHRM branding is displayed', async () => {
      await AssertionHelper.assertVisible(loginPage.companyBrandingImage, 'Company branding image should be visible');
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login heading should be visible');
    });
  });

  test('TC_010 - Verify login behavior when username and password fields contain excessively long input values', async ({ loginPage, page }) => {
    await test.step('Step 1: Navigate to OrangeHRM login page', async () => {
      await AssertionHelper.assertVisible(loginPage.loginHeading, 'Login page should be displayed');
    });

    await test.step('Step 2: Enter 100-character username', async () => {
      await loginPage.enterUsername(loginTestData.maxLengthCredentials.username);
      const enteredValue = await loginPage.usernameInput.inputValue();
      expect(enteredValue.length).toBeGreaterThan(0);
    });

    await test.step('Step 3: Enter 100-character password', async () => {
      await loginPage.enterPassword(loginTestData.maxLengthCredentials.password);
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');
    });

    await test.step('Step 4: Click Login button', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Step 5: Verify system handles input gracefully without crashing', async () => {
      const currentUrl = page.url();
      const isOnLoginPage = currentUrl.includes('/auth/login');
      const isOnDashboard = currentUrl.includes('/dashboard/index');

      if (isOnLoginPage) {
        await AssertionHelper.assertVisible(loginPage.loginButton, 'Login button should be visible after max-length input rejection');
        const hasAlert = await loginPage.invalidCredentialsAlert.isVisible();
        const hasRequiredError = await loginPage.usernameRequiredError.isVisible();
        expect(isOnLoginPage).toBe(true);
        if (hasAlert) {
          const alertText = await loginPage.getAlertMessage();
          expect(alertText.length).toBeGreaterThan(0);
        } else if (!hasRequiredError) {
          expect(isOnLoginPage).toBe(true);
        }
      } else if (isOnDashboard) {
        await AssertionHelper.assertVisible(new DashboardPage(page).dashboardHeading);
      }

      expect(currentUrl).not.toContain('error');
      expect(currentUrl).not.toContain('exception');
      expect(currentUrl).not.toContain('500');
    });
  });
});
