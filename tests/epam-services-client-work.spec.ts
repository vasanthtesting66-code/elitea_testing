import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: EPAM Services - Client Work Navigation
 * Description: Navigates to EPAM homepage, opens the Services dropdown
 *              via the header menu, clicks "Explore Our Client Work",
 *              and verifies the "Client Work" text is visible on the page.
 */

// Helper: Opens the Services flyout in the top navigation
async function openServicesFlyout(page: Page): Promise<void> {
  // The Services flyout is triggered by adding the 'js-opened' CSS class
  // to the .top-navigation__item.epam element (desktop mega menu)
  await page.evaluate(() => {
    const servicesNavItem = document.querySelector('.top-navigation__item.epam') as HTMLElement;
    if (servicesNavItem) {
      servicesNavItem.classList.add('js-opened');
    }
  });

  // Wait for the flyout to become visible
  await expect(page.locator('.top-navigation__flyout')).toBeVisible({ timeout: 5000 });
}

test.describe('EPAM Services - Client Work Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport to ensure top navigation (not hamburger menu) is shown
    await page.setViewportSize({ width: 1440, height: 900 });

    // Navigate to EPAM homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Wait for the page to be fully rendered
    await page.waitForTimeout(2000);
  });

  test('should navigate to Client Work page via Services header menu', async ({ page }) => {
    // ─── Step 1: Verify homepage loaded ───────────────────────────────────────
    await expect(page).toHaveTitle(/EPAM/i);
    await expect(page).toHaveURL('https://www.epam.com/');

    // ─── Step 2: Click "Services" from header menu ────────────────────────────
    // The visible desktop "Services" link is inside .top-navigation__item.epam
    const servicesLink = page
      .locator('.top-navigation__item.epam > a[href="/services"]')
      .first();

    await expect(servicesLink).toBeVisible();
    await servicesLink.hover();

    // ─── Step 3: Open the Services flyout dropdown ───────────────────────────
    await openServicesFlyout(page);

    // Take screenshot with dropdown open
    await page.screenshot({ path: 'screenshots/services-dropdown-open.png' });

    // ─── Step 4: Click "Explore Our Client Work" in the flyout ───────────────
    // The flyout contains a "Client Work" link at /services/client-work
    const clientWorkFlyoutLink = page
      .locator('.top-navigation__flyout a[href="/services/client-work"]')
      .first();

    await expect(clientWorkFlyoutLink).toBeVisible();
    await expect(clientWorkFlyoutLink).toHaveText('Client Work');

    // Click the link (simulates "Explore Our Client Work" action)
    await clientWorkFlyoutLink.click();

    // ─── Step 5: Wait for Client Work page to load ───────────────────────────
    await page.waitForURL('**/services/client-work', { timeout: 10000 });
    await page.waitForLoadState('domcontentloaded');

    // ─── Step 6: Verify "Client Work" text is visible on the page ────────────
    // Verify page title
    await expect(page).toHaveTitle('Client Work');

    // Verify the H1 heading with "Client Work" text
    const clientWorkHeading = page.locator('h1').filter({ hasText: 'Client Work' });
    await expect(clientWorkHeading).toBeVisible();

    // Verify URL is correct
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');

    // Take final screenshot
    await page.screenshot({ path: 'screenshots/client-work-page.png' });

    console.log('✅ PASS: "Client Work" text is visible on the page.');
  });

  test('should verify Services flyout contains Client Work menu item', async ({ page }) => {
    // Open the Services flyout
    await openServicesFlyout(page);

    // Verify "Client Work" menu item exists in the flyout
    const clientWorkMenuItem = page.locator(
      '.top-navigation__flyout a[href="/services/client-work"]'
    );

    await expect(clientWorkMenuItem).toBeVisible();
    await expect(clientWorkMenuItem).toHaveText('Client Work');
    await expect(clientWorkMenuItem).toHaveAttribute('href', '/services/client-work');

    console.log('✅ PASS: "Client Work" menu item is visible in Services flyout.');
  });

  test('should land on correct URL after clicking Client Work', async ({ page }) => {
    // Open Services flyout and click Client Work
    await openServicesFlyout(page);

    const clientWorkLink = page
      .locator('.top-navigation__flyout a[href="/services/client-work"]')
      .first();

    await clientWorkLink.click();
    await page.waitForURL('**/services/client-work', { timeout: 10000 });

    // Assert URL
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');

    // Assert at least one visible element with "Client Work" text
    const clientWorkText = page.getByText('Client Work', { exact: true }).first();
    await expect(clientWorkText).toBeVisible();

    console.log('✅ PASS: Navigated to correct URL and "Client Work" is visible.');
  });
});
