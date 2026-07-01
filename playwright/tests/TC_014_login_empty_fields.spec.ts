/**
 * TC_014_login_empty_fields.spec.ts
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Requirement   : US-OHR-001                                             │
 * │  Test Case ID  : TC_014                                                 │
 * │  Title         : Verify Login Fails When Both Username and Password     │
 * │                  Fields are Empty                                       │
 * │  Module        : Authentication                                         │
 * │  Feature       : User Login – Validation                                │
 * │  Priority      : High                                                   │
 * │  Type          : Validation / Negative Testing                          │
 * │  Business Rule : BR-AUTH-001 – Both fields are mandatory                │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  Acceptance Criteria                                                    │
 * │  AC-001 – 'Required' messages appear below BOTH fields simultaneously  │
 * │  AC-002 – User is NOT redirected away from the login page              │
 * │  AC-003 – No authentication request is sent to the server              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Tags: Login · Authentication · Validation · EmptyFields
 *       NegativeTesting · Regression · HighPriority
 *       ClientSideValidation · UI
 */

import { test, expect } from '../fixtures/loginFixtures';
import { TC_014_DATA }  from '../test-data/loginTestData';
import { Routes }       from '../utils/urlHelper';
import { assertAllVisible, assertAllHidden } from '../utils/common';

// ─────────────────────────────────────────────────────────────────────────────

test.describe('TC_014 | Authentication | Login Validation – Both Fields Empty', () => {

  // ══════════════════════════════════════════════════════════════════════════
  // PRIMARY TEST – covers all 7 original steps + all 3 acceptance criteria
  // ══════════════════════════════════════════════════════════════════════════

  test(
    'TC_014 – Verify login fails and "Required" messages appear when both Username and Password are empty',
    async ({ loginPage, page }) => {

      // ── AC-003 sentinel: track whether an auth POST was fired ──────────────
      // OrangeHRM's real auth endpoint is /auth/validate (POST).
      // Client-side validation must block the request entirely.
      let authRequestFired = false;
      page.on('request', (req) => {
        if (
          req.url().includes('/auth/validate') &&
          req.method() === 'POST'
        ) {
          authRequestFired = true;
        }
      });

      // ── Step 1 – Verify the Login page is loaded ───────────────────────────
      await test.step('Step 1 – Verify Login page is displayed with Username and Password fields visible', async () => {
        await expect(loginPage.loginHeading,  'Login heading should be visible').toBeVisible();
        await expect(loginPage.usernameInput, 'Username field should be visible').toBeVisible();
        await expect(loginPage.passwordInput, 'Password field should be visible').toBeVisible();
        await expect(loginPage.loginButton,   'Login button should be visible' ).toBeVisible();
      });

      // ── Step 2 – Confirm Username field is empty ───────────────────────────
      await test.step('Step 2 – Confirm Username field remains empty', async () => {
        await expect(
          loginPage.usernameInput,
          'Username field should have no value',
        ).toHaveValue(TC_014_DATA.input.username);
      });

      // ── Step 3 – Confirm Password field is empty ───────────────────────────
      await test.step('Step 3 – Confirm Password field remains empty', async () => {
        await expect(
          loginPage.passwordInput,
          'Password field should have no value',
        ).toHaveValue(TC_014_DATA.input.password);
      });

      // ── Step 4 – Click Login without entering any credentials ──────────────
      await test.step('Step 4 – Click the Login button with both fields empty', async () => {
        await loginPage.clickLoginButton();
      });

      // ── Step 5 – Validate Username "Required" message (AC-001 partial) ──────
      await test.step('Step 5 – Verify "Required" validation message appears below the Username field', async () => {
        await expect(
          loginPage.usernameValidationMessage,
          'Username validation message should be visible',
        ).toBeVisible();
        await expect(
          loginPage.usernameValidationMessage,
          `Username validation message should read "${TC_014_DATA.expectedValidationMessages.username}"`,
        ).toHaveText(TC_014_DATA.expectedValidationMessages.username);
      });

      // ── Step 6 – Validate Password "Required" message (AC-001 partial) ──────
      await test.step('Step 6 – Verify "Required" validation message appears below the Password field', async () => {
        await expect(
          loginPage.passwordValidationMessage,
          'Password validation message should be visible',
        ).toBeVisible();
        await expect(
          loginPage.passwordValidationMessage,
          `Password validation message should read "${TC_014_DATA.expectedValidationMessages.password}"`,
        ).toHaveText(TC_014_DATA.expectedValidationMessages.password);
      });

      // ── Step 7 (AC-001) – Both messages visible SIMULTANEOUSLY ────────────
      await test.step('Step 7 – Verify both "Required" messages are visible at the same time (AC-001)', async () => {
        await assertAllVisible(
          [loginPage.usernameValidationMessage, loginPage.passwordValidationMessage],
          '"Required" validation message',
        );
      });

      // ── Step 8 (AC-002) – User remains on the login page ──────────────────
      await test.step('Step 8 – Verify user is NOT redirected away from the login page (AC-002)', async () => {
        expect(
          loginPage.getUrl(),
          'Current URL should still contain the login route',
        ).toContain(Routes.login);
      });

      // ── Step 9 (AC-003) – No authentication request sent ──────────────────
      await test.step('Step 9 – Verify no authentication POST request was sent to the server (AC-003)', async () => {
        expect(
          authRequestFired,
          'No POST /auth/validate request should have been fired; client-side validation must block the submission',
        ).toBe(false);
      });

      // ── Step 10 – Both inputs rendered in error state ─────────────────────
      await test.step('Step 10 – Verify both input fields carry the error CSS modifier', async () => {
        expect(
          await loginPage.isUsernameInputInErrorState(),
          'Username input should have class oxd-input--error',
        ).toBe(true);
        expect(
          await loginPage.isPasswordInputInErrorState(),
          'Password input should have class oxd-input--error',
        ).toBe(true);
      });
    },
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TC_014-A – Regression guard: exact text of Username validation message
  // ══════════════════════════════════════════════════════════════════════════

  test(
    'TC_014-A – Username validation message text is exactly "Required" (regression guard)',
    async ({ loginPage }) => {

      await test.step('Click Login without credentials', async () => {
        await loginPage.clickLoginButton();
      });

      await test.step('Assert exact text of Username validation message', async () => {
        await expect(loginPage.usernameValidationMessage)
          .toHaveText(TC_014_DATA.expectedValidationMessages.username);
      });
    },
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TC_014-B – Regression guard: exact text of Password validation message
  // ══════════════════════════════════════════════════════════════════════════

  test(
    'TC_014-B – Password validation message text is exactly "Required" (regression guard)',
    async ({ loginPage }) => {

      await test.step('Click Login without credentials', async () => {
        await loginPage.clickLoginButton();
      });

      await test.step('Assert exact text of Password validation message', async () => {
        await expect(loginPage.passwordValidationMessage)
          .toHaveText(TC_014_DATA.expectedValidationMessages.password);
      });
    },
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TC_014-C – Verify validation messages are NOT shown on initial page load
  // ══════════════════════════════════════════════════════════════════════════

  test(
    'TC_014-C – Validation messages are absent before the Login button is clicked',
    async ({ loginPage }) => {

      await test.step('On initial page load, no validation messages should be visible', async () => {
        await assertAllHidden(
          [loginPage.usernameValidationMessage, loginPage.passwordValidationMessage],
        );
      });
    },
  );

});
