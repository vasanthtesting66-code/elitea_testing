import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_URLS } from '../test-data/auth.data';

/**
 * LoginPage – Page Object for the OrangeHRM Login page.
 * URL: /web/index.php/auth/login
 *
 * Encapsulates all locators and interactions on the login page.
 * NO assertions live here – assertions belong in test scripts.
 */
export class LoginPage extends BasePage {
  // ─── Locators ────────────────────────────────────────────────────────────

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginHeading: Locator;
  readonly errorAlert: Locator;
  readonly companyBrandingImage: Locator;
  readonly orangehrmLogo: Locator;

  // Validation error locators (appear below each field on empty submit)
  readonly usernameRequiredError: Locator;
  readonly passwordRequiredError: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput       = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput       = page.getByRole('textbox', { name: 'Password' });
    this.loginButton         = page.getByRole('button',  { name: 'Login' });
    this.forgotPasswordLink  = page.getByText('Forgot your password?');
    this.loginHeading        = page.getByRole('heading', { name: 'Login' });
    this.errorAlert          = page.getByRole('alert');
    this.companyBrandingImage = page.getByAltText('company-branding');
    this.orangehrmLogo       = page.getByAltText('orangehrm-logo');

    // Validation error spans rendered directly after the input containers
    this.usernameRequiredError = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('.oxd-text--span');

    this.passwordRequiredError = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Password' })
      .locator('.oxd-text--span');
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  /**
   * Navigate directly to the login page.
   */
  async goto(): Promise<void> {
    await this.navigateTo(APP_URLS.login);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────

  /**
   * Enters a value in the Username field.
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /**
   * Enters a value in the Password field.
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  /**
