import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorAlert: Locator;
  private readonly loginHeading: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.loginHeading = page.getByRole('heading', { name: 'Login', level: 5 });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/auth/login');
    await this.waitForVisible(this.loginHeading);
  }

  async enterUsername(username: string): Promise<void> {
    await this.clearAndFill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.clearAndFill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorAlert);
    return await this.getTextContent(this.errorAlert);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.isVisible(this.loginHeading);
  }

  async isErrorAlertVisible(): Promise<boolean> {
    return await this.isVisible(this.errorAlert);
  }

  getUsernameInput(): Locator { return this.usernameInput; }
  getPasswordInput(): Locator { return this.passwordInput; }
  getLoginButtonLocator(): Locator { return this.loginButton; }
  getErrorAlertLocator(): Locator { return this.errorAlert; }
  getLoginHeadingLocator(): Locator { return this.loginHeading; }
}
