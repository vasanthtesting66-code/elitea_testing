import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services - Client Work Navigation
 *
 * Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Select "Services" from the header menu
 *   3. Click the "Explore Our Client Work" link
 *   4. Verify that "Client Work" text is visible on the page
 */

test.describe('EPAM Services Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to EPAM homepage and accept cookies
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    // Accept cookie banner if visible
    const acceptCookiesBtn = page.getByRole('button', { name: 'Accept All' });
    if (await acceptCookiesBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptCookiesBtn.click();
    }
  });

  test('Navigate via Services header menu to Client Work page and verify content', async ({ page }) => {

    // ─── Step 1: Verify homepage loaded ───────────────────────────────────────
    await expect(page).toHaveURL('https://www.epam.com/');
    await expect(page).toHaveTitle(/EPAM/);

    // ─── Step 2: Click "Services" from the header menu ────────────────────────
    // The header nav link for "Services" navigates to /services
    const servicesLink = page.locator('nav').getByRole('link', { name: 'Services' }).first();
    await expect(servicesLink).toBeVisible();
    await servicesLink.click();

    // Wait for Services page to load
    await page.waitForURL('**/services', { timeout: 10000 });
    await expect(page).toHaveURL(/\/services$/);
    await expect(page).toHaveTitle(/Services/);

    // ─── Step 3: Click "Explore Our Client Work" link ─────────────────────────
    const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' }).first();
    await expect(exploreClientWorkLink).toBeVisible();
    await exploreClientWorkLink.click();

    // Wait for Client Work page to load
    await page.waitForURL('**/services/client-work', { timeout: 10000 });
    await expect(page).toHaveURL(/\/services\/client-work/);

    // ─── Step 4: Verify "Client Work" text is visible on the page ────────────
    // Assert page title
    await expect(page).toHaveTitle('Client Work');

    // Assert the H1 heading contains "Client Work"
    const heading = page.getByRole('heading', { name: 'Client Work', level: 1 });
    await expect(heading).toBeVisible();

    // Assert the text "Client Work" exists somewhere on the page body
    await expect(page.locator('body')).toContainText('Client Work');
  });

});
