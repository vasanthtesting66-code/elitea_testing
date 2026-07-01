/**
 * LoginPage.ts
 * Page Object for the OrangeHRM Login page.
 *
 * Locator priority followed (per framework standard):
 *   1. getByRole()
 *   2. getByLabel()
 *   3. getByPlaceholder()
 *   4. getByText()
 *   5. Stable CSS class (fallback, scoped)
 *
 * Live DOM evidence (captured 2026-07-01):
 *   - Username input  : <input name="username" class="oxd-input ...">
 *   - Password input  : <input name="password" class="oxd-input ...">
 *   - Login button    : <button type="submit" class="oxd-button ...">
 *   - Error messages  : <span class="oxd-text oxd-input-field-error-message">Required</span>
 *                       (one per .oxd-input-group, scoped per field)
 *
 * ⚠️  Assertions belong in spec files only. Page Objects are interaction-only.
 */
import { Page, Locator } from '@playwright/test';
import { BasePage }      from './BasePage';
import { Routes }        from '../utils/urlHelper';

export class LoginPage extends BasePage {

  // ── Locators ────────────────────────────────────────────────────────────────

  /** Username input field */
  readonly usernameInput: Locator;

  /** Password input field */
  readonly passwordInput: Locator;

  /** Login submit button */
  readonly loginButton: Locator;

  /**
   * Validation message scoped to the Username input group.
   * Scoping prevents false-positive matches when both messages show "Required".
   */
  readonly usernameValidationMessage: Locator;

  /**
   * Validation message scoped to the Password input group.
   */
  readonly passwordValidationMessage: Locator;

  /** "Forgot your password?" link */
  readonly forgotPasswordLink: Locator;

  /** Login page heading */
  readonly loginHeading: Locator;

  // ── Constructor ──────────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.usernameInput      = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput      = page.getByRole('textbox', { name: 'Password' });
    this.loginButton        = page.getByRole('button',  { name: 'Login'    });
    this.loginHeading       = page.getByRole('heading', { name: 'Login'    });
    this.forgotPasswordLink = page.getByText('Forgot your password?');

    /**
     * Validation messages are <span class="oxd-input-field-error-message">.
     * Each is scoped inside its .oxd-input-group parent so both "Required"
     * spans are independently addressable.
     */
    this.usernameValidationMessage = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByRole('textbox', { name: 'Username' }) })
      .locator('.oxd-input-field-error-message');

    this.passwordValidationMessage = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByRole('textbox', { name: 'Password' }) })
      .locator('.oxd-input-field-error-message');
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  /** Navigate directly to the login page and wait for it to be ready. */
  async goto(): Promise<void> {
    await this.navigateTo(Routes.login);
    await this.waitForVisible(this.loginHeading);
  }

  // ── Actions ─────────────────────────────────────────────────────────────────

  /**
   * Fill the Username field.
   * Always clears first to avoid leftover values from prior interactions.
   * Passing an empty string leaves the field blank intentionally.
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.clear();
    if (username) await this.usernameInput.fill(username);
  }

  /**
   * Fill the Password field.
   * Always clears first to avoid leftover values from prior interactions.
   * Passing an empty string leaves the field blank intentionally.
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    if (password) await this.passwordInput.fill(password);
  }

  /** Click the Login button. */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * High-level login helper.
   * Passing empty strings replicates the TC_014 empty-field scenario.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // ── State readers (no assertions) ───────────────────────────────────────────

  /** Returns the trimmed text of the Username validation message. */
  async getUsernameValidationText(): Promise<string> {
    return (await this.usernameValidationMessage.textContent())?.trim() ?? '';
  }

  /** Returns the trimmed text of the Password validation message. */
  async getPasswordValidationText(): Promise<string> {
    return (await this.passwordValidationMessage.textContent())?.trim() ?? '';
  }

  /** Returns true when the Username input carries the error CSS modifier. */
  async isUsernameInputInErrorState(): Promise<boolean> {
    const cls = (await this.usernameInput.getAttribute('class')) ?? '';
    return cls.includes('oxd-input--error');
  }

  /** Returns true when the Password input carries the error CSS modifier. */
  async isPasswordInputInErrorState(): Promise<boolean> {
    const cls = (await this.passwordInput.getAttribute('class')) ?? '';
    return cls.includes('oxd-input--error');
  }

  /** Returns the current page URL. */
  getUrl(): string {
    return this.getCurrentUrl();
  }
}
