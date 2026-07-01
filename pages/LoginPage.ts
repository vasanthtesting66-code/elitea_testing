import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // ─── Locators ────────────────────────────────────────────────────────────────
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly companyLogo: Locator;
  readonly orangehrmLogo: Locator;
  readonly loginHeading: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorAlert: Locator;
  readonly usernameRequiredError: Locator;
  readonly passwordRequiredError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.companyLogo = page.getByRole('img', { name: 'company-branding' });
    this.orangehrmLogo = page.getByRole('img', { name: 'orangehrm-logo' });
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.errorAlert = page.getByRole('alert');
    this.usernameRequiredError = page.locator('.oxd-input-field-bottom-space').filter({ hasText: 'Required' }).first();
    this.passwordRequiredError = page.locator('.oxd-input-field-bottom-space').filter({ hasText: 'Required' }).last();
  }

  getPageUrlSegment(): string {
    return '/auth/login';
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  async goto(baseUrl: string): Promise<void> {
    await this.navigateTo(baseUrl);
    await this.waitForVisible(this.loginButton);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  // ─── Utility / Query Methods ──────────────────────────────────────────────────

  async getErrorAlertText(): Promise<string> {
    await this.waitForVisible(this.errorAlert);
    return (await this.errorAlert.textContent()) ??