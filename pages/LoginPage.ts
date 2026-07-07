import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginHeading: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/auth/login');
    await this.waitForVisible(this.usernameInput);
  }

  async enterUsername(username: string): Promise<void> {
    await this.waitForVisible(this.usernameInput);
    await this.clearAndFill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.waitForVisible(this.passwordInput);
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

  async isLoginPageDisplayed(): Promise<boolean> {
    try {
      await this.waitForVisible(this.usernameInput, 5000);
      return true;
    } catch {
      return false;
    }
  }

  async isUsernameFieldVisible(): Promise<boolean> {
    return this.usernameInput.isVisible();
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage);
    return (await this.errorMessage.textContent()) || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getPasswordInputType(): Promise<string | null> {
    return this.passwordInput.getAttribute('type');
  }

  async getUsernameFieldValue(): Promise<string> {
    return this.usernameInput.inputValue();
  }

  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }

  getUsernameInputLocator(): Locator {
    return this.usernameInput;
  }

  getPasswordInputLocator(): Locator {
    return this.passwordInput;
  }

  getLoginButtonLocator(): Locator {
    return this.loginButton;
  }
}
