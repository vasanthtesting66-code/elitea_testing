import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UrlHelper } from '../utils/UrlHelper';

export class LoginPage extends BasePage {
  // ─── Locators ────────────────────────────────────────────────────────────────
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginHeading: Locator;
  readonly forgotPasswordLink: Locator;
  readonly companyBrandingImage: Locator;
  readonly orangehrmLogoImage: Locator;
  readonly errorAlert: Locator;
  readonly usernameRequiredMsg: Locator;
  readonly passwordRequiredMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput        = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput        = page.getByRole('textbox', { name: 'Password' });
    this.loginButton          = page.getByRole('button',  { name: 'Login' });
    this.loginHeading         = page.getByRole('heading', { name: 'Login' });
    this.forgotPasswordLink   = page.getByText('Forgot your password?');
    this.companyBrandingImage = page.getByAltText('company-branding');
    this.orangehrmLogoImage   = page.getByAltText('orangehrm-logo');
    this.errorAlert           = page.getByRole('alert');
    // Required validation messages are generic siblings of inputs
    this.usernameRequiredMsg  = page.locator('input[name="username"] ~ span, input[name="username"] + div, .oxd-input-group:has(input[name="username"]) .oxd-text--span');
    this.passwordRequiredMsg  = page.locator('input[name="password"] ~ span, input[name="password"] + div, .oxd-input-group:has(input[name="password"]) .oxd-text--span');
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  /**
   * Navigate directly to the OrangeHRM login page
   */
  async goto(): Promise<void> {
    await this.navigateTo(UrlHelper.getLoginUrl());
    await this.waitForPageLoad();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  /**
   * Fill in the username field
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /**
   * Fill in the password field
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  /**
   * Click the Login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform a full login action (fill credentials + submit)
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Submit with empty fields (no fill – just click login)
   */
  async submitEmptyForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
    await this.clickLoginButton();
  }

  // ─── Validation Helpers ───────────────────────────────────────────────────────

  /**
   * Returns the text content of the error alert
   */
  async getErrorAlertText(): Promise<string> {
    return