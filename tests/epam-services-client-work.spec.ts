import { test, expect } from '@playwright/test';

/**
 * Test Suite  : EPAM Website – Services Navigation
 * Description : Navigate to EPAM homepage, open "Services" from the header menu,
 *               click "Explore Our Client Work", and verify "Client Work" text is visible.
 * Author      : Playwright Automation Agent
 */

test.describe('EPAM Services - Client Work Navigation', () => {

  test('Should navigate to Client Work page via Services menu', async ({ page }) => {

    // ── Step 1: Navigate to EPAM homepage ──────────────────────────────────
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveTitle(/EPAM/i);
    console.log('✅ Step 1 Passed: EPAM homepage loaded successfully.');

    // ── Step 2: Click "Services" in the header navigation ──────────────────
    const servicesMenu = page
      .locator('header nav a, header nav button, header a')
      .filter({ hasText: /^Services$/i });
    await servicesMenu.waitFor({ state: 'visible', timeout: 10_000 });
    await servicesMenu.click();
    console.log('✅ Step 2 Passed: "Services" menu item clicked.');

    // ── Step 3: Click the "Explore Our Client Work" link ───────────────────
    const exploreClientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await exploreClientWorkLink.waitFor({ state: 'visible', timeout: 10_000 });
    await exploreClientWorkLink.click();
    console.log('✅ Step 3 Passed: "Explore Our Client Work" link clicked.');

    // ── Step 4: Verify "Client Work" text is visible on the page ───────────
    await page.waitForLoadState('networkidle');
    const clientWorkHeading = page.getByText(/Client Work/i);
    await expect(clientWorkHeading).toBeVisible();
    console.log('✅ Step 4 Passed: "Client Work" text is visible on the page.');
  });

});
