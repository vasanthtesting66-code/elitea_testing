import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly companyBrandingImage: Locator;
  readonly loginHeading: Locator;
  readonly forgotPasswordLink: Locator;
  readonly invalidCredentialsAlert: Locator;
  readonly usernameRequiredError: Locator;
  readonly passwordRequiredError: Locator;
  readonly orangehrmLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.companyBrandingImage = page.locator('img[alt="company-branding"]');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.invalidCredentialsAlert = page.getByRole('alert');
    this.usernameRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-text--span');
    this.passwordRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('.oxd-text--span');
    this.orangehrmLogo = page.locator('img[alt="orangehrm-logo"]');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/web/index.php/auth/login');
    await this.waitForVisible(this.loginButton);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getAlertMessage(): Promise<string> {
    await this.waitForVisible(this.invalidCredentialsAlert);
    return (await this.invalidCredentialsAlert.textContent() || '').trim();
  }

  async getUsernameRequiredError(): Promise<string> {
    await this.waitForVisible(this.usernameRequiredError);
    return (await this.usernameRequiredError.textContent() || '').trim();
  }

  async getPasswordRequiredError(): Promise<string> {
    await this.waitForVisible(this.passwordRequiredError);
    return (await this.passwordRequiredError.textContent() || '').trim();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.passwordInput.getAttribute('type');
  }
}
