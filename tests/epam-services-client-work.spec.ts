import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: EPAM Website – Services → Client Work Navigation
 *
 * Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Hover over "Services" in the header menu to reveal the dropdown
 *   3. Click the "Explore Our Client Work" link inside the dropdown
 *   4. Verify that the "Client Work" text is visible on the resulting page
 *
 * Author  : Playwright Web Automation Agent – EliteA
 * Created : 2025
 */

test.describe('EPAM Services – Explore Our Client Work Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // Set a reasonable timeout for navigation
    page.setDefaultTimeout(30_000);
  });

  test('Should navigate to Client Work page via Services menu', async ({ page }: { page: Page }) => {

    // ── Step 1: Navigate to the EPAM homepage ──────────────────────────────
    await test.step('Navigate to https://www.epam.com/', async () => {
      await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/epam\.com/);
      console.log('✅ Step 1 Passed: Successfully navigated to https://www.epam.com/');
    });

    // ── Step 2: Hover over "Services" in the header navigation ────────────
    await test.step('Hover over "Services" menu item in the header', async () => {
      const servicesMenuLink = page.locator('header nav').getByRole('link', { name: /^Services$/i }).first();

      // Wait for the element to be visible before hovering
      await servicesMenuLink.waitFor({ state: 'visible' });
      await servicesMenuLink.hover();

      // Give the dropdown animation time to complete
      await page.waitForTimeout(800);
      console.log('✅ Step 2 Passed: Hovered over "Services" menu item');
    });

    // ── Step 3: Click "Explore Our Client Work" link ──────────────────────
    await test.step('Click the "Explore Our Client Work" link', async () => {
      const exploreClientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i });

      // Ensure the link is visible in the expanded dropdown
      await exploreClientWorkLink.waitFor({ state: 'visible' });
      await exploreClientWorkLink.click();

      // Wait for the navigation to complete
      await page.waitForLoadState('domcontentloaded');
      console.log('✅ Step 3 Passed: Clicked "Explore Our Client Work" link');
    });

    // ── Step 4: Verify "Client Work" text is visible on the page ─────────
    await test.step('Verify "Client Work" text is visible on the page', async () => {
      // Assert the heading / prominent text "Client Work" is present on the page
      const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i }).first();

      await expect(clientWorkHeading).toBeVisible({ timeout: 15_000 });
      console.log('✅ Step 4 Passed: "Client Work" text is visible on the page');

      // Additional URL assertion to confirm correct page
      await expect(page).toHaveURL(/case-studies|client-work|our-work/i);
      console.log('✅ URL Assertion Passed: Current URL confirms Client Work page');
    });

  });

});
