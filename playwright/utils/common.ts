/**
 * common.ts
 * Shared utility helpers used across the automation suite.
 */
import { Page, expect, Locator } from '@playwright/test';

/**
 * Asserts that a list of locators are all visible simultaneously.
 * Used to verify simultaneous display of multiple validation messages.
 *
 * @param locators - Array of Playwright Locator instances to check
 * @param message  - Optional assertion message prefix
 */
export async function assertAllVisible(
  locators: Locator[],
  message = 'Element',
): Promise<void> {
  await Promise.all(
    locators.map((loc, idx) =>
      expect(loc, `${message}[${idx}] should be visible`).toBeVisible(),
    ),
  );
}

/**
 * Asserts that a list of locators are all hidden simultaneously.
 *
 * @param locators - Array of Playwright Locator instances to check
 */
export async function assertAllHidden(locators: Locator[]): Promise<void> {
  await Promise.all(locators.map((loc) => expect(loc).toBeHidden()));
}

/**
 * Waits until the URL contains the expected path segment.
 *
 * @param page        - Playwright Page instance
 * @param pathSegment - Substring expected in the current URL
 * @param timeoutMs   - Maximum wait time in ms (default 10 s)
 */
export async function waitForUrlContaining(
  page: Page,
  pathSegment: string,
  timeoutMs = 10_000,
): Promise<void> {
  await expect(page).toHaveURL(new RegExp(pathSegment), { timeout: timeoutMs });
}

/**
 * Asserts the current URL contains the given path segment.
 *
 * @param page        - Playwright Page instance
 * @param pathSegment - Expected URL substring
 */
export async function assertUrlContains(
  page: Page,
  pathSegment: string,
): Promise<void> {
  await expect(page).toHaveURL(new RegExp(pathSegment));
}
