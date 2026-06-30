/**
 * Test Suite : Authentication – Account Lockout
 * Test Case  : TC_014
 * Requirement: US-101
 * Priority   : Critical
 * Type       : Functional / Negative
 *
 * Objective:
 *   Verify that after three consecutive failed login attempts with invalid
 *   credentials, the user account is temporarily locked and an appropriate
 *   lockout message is displayed. Subsequent login attempts, even with
 *   valid credentials, are rejected until the lockout period expires.
 *
 * Preconditions:
 *   1. User has a registered and activated account that is NOT currently locked.
 *   2. Application is accessible via HTTPS.
 *   3. Cloudflare Turnstile CAPTCHA is operational (bypass token recommended).
 *   4. Environment variables TEST_USER_EMAIL, TEST_USER_VALID_PASSWORD,
 *      TEST_USER_WRONG_PASSWORD are set in .env.
 */

import { test, expect } from '../fixtures/authFixtures';
import { config } from '../config/config';
import { MessageMatcher } from '../utils/MessageMatcher';
import authData from '../test-data/auth.json';

const td = authData['TC_014'];
const { expectedMessages, maxFailedAttempts } = td.lockout;

// ─── Suite ──────────────────────────────────────────────────────────────────

test.describe('TC_014 | Authentication – Account Lockout After Three Failed Attempts', () => {
  /**
   * beforeEach: The `loginPage` fixture already navigates to the login page
   * and verifies it has loaded. No additional setup required here.
   */
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Precondition: Verify Login page is displayed', async () => {
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test(
    'TC_014 – Account is temporarily locked after three consecutive failed login attempts',
    async ({ loginPage, credentials }) => {
      for (let attempt = 1; attempt <= maxFailedAttempts; attempt++) {
        await test.step(`Step ${attempt + 1}: Failed login attempt ${attempt} of ${maxFailedAttempts}`, async () => {
          await loginPage.attemptLogin(credentials.email, credentials.wrongPassword);

          if (attempt < maxFailedAttempts) {
            await test.step(`Assert: Invalid-credentials error displayed (attempt ${attempt})`, async () => {
              await expect
                .soft(loginPage.errorAlert, `Expected error alert to be visible after attempt ${attempt}`)
                .toBeVisible();

              const errorText = await loginPage.getErrorMessage();

              expect
                .soft(
                  MessageMatcher.containsAny(errorText, expectedMessages.invalidCredentials),
                  MessageMatcher.buildMismatchMessage(errorText, expectedMessages.invalidCredentials)
                )
                .toBeTruthy();

              await expect(loginPage.emailInput).toBeVisible();
            });
          } else {
            await test.step('Step 4 – Assert: Account lockout message displayed after third failed attempt', async () => {
              await expect(
                loginPage.errorAlert,
                'Lockout alert must be visible after the third failed login attempt'
              ).toBeVisible({ timeout: config.timeouts.lockout });

              const lockoutText = await loginPage.getErrorMessage();

              expect(
                MessageMatcher.containsAny(lockoutText, expectedMessages.accountLocked),
                MessageMatcher.buildMismatchMessage(lockoutText, expectedMessages.accountLocked)
              ).toBeTruthy();
            });
          }
        });
      }

      await test.step('Step 5: Attempt login with valid password while account is locked', async () => {
        await loginPage.attemptLogin(credentials.email, credentials.validPassword);

        await test.step('Step 5 – Assert: Login rejected despite valid credentials (lockout persists)', async () => {
          await expect(
            loginPage.errorAlert,
            'Lockout message must persist even when valid credentials are submitted'
          ).toBeVisible({ timeout: config.timeouts.lockout });

          const lockoutText = await loginPage.getErrorMessage();

          expect(
            MessageMatcher.containsAny(lockoutText, expectedMessages.accountLocked),
            MessageMatcher.buildMismatchMessage(lockoutText, expectedMessages.accountLocked)
          ).toBeTruthy();

          const currentUrl = await loginPage.currentUrl();
          expect(
            currentUrl,
            'User must NOT be redirected to dashboard while account is locked'
          ).not.toContain(config.routes.dashboard);
        });
      });
    }
  );

  test(
    'TC_014-A – Login page remains visible after each failed attempt (no premature redirect)',
    async ({ loginPage, credentials }) => {
      for (let attempt = 1; attempt <= maxFailedAttempts; attempt++) {
        await test.step(`Failed attempt ${attempt}: Verify page remains on login route`, async () => {
          await loginPage.attemptLogin(credentials.email, credentials.wrongPassword);

          await expect(
            loginPage.errorAlert,
            `Error alert must be visible after attempt ${attempt}`
          ).toBeVisible();

          const currentUrl = await loginPage.currentUrl();
          expect(
            currentUrl,
            `Must remain on the login page after failed attempt ${attempt}`
          ).not.toContain(config.routes.dashboard);
        });
      }
    }
  );

  test(
    'TC_014-B – Error message is visible and non-empty after each failed login attempt',
    async ({ loginPage, credentials }) => {
      for (let attempt = 1; attempt <= maxFailedAttempts; attempt++) {
        await test.step(`Attempt ${attempt}: Verify error message is non-empty`, async () => {
          await loginPage.attemptLogin(credentials.email, credentials.wrongPassword);

          const errorText = await loginPage.getErrorMessage();

          expect(
            errorText.length,
            `Error message must not be empty after attempt ${attempt}`
          ).toBeGreaterThan(0);

          if (attempt === maxFailedAttempts) {
            expect(
              MessageMatcher.containsAny(errorText, expectedMessages.accountLocked),
              `After attempt ${attempt}: ` +
                MessageMatcher.buildMismatchMessage(errorText, expectedMessages.accountLocked)
            ).toBeTruthy();
          } else {
            expect(
              MessageMatcher.containsAny(errorText, expectedMessages.invalidCredentials),
              `After attempt ${attempt}: ` +
                MessageMatcher.buildMismatchMessage(errorText, expectedMessages.invalidCredentials)
            ).toBeTruthy();
          }
        });
      }
    }
  );
});
