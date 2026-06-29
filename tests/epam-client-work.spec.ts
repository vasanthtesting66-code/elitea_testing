import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: EPAM Website - Services > Client Work Navigation
 * Scenario: Navigate to EPAM homepage, open Services menu, click
 *           "Explore Our Client Work" and verify "Client Work" page.
 */

class EpamHomePage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('https://www.epam.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openServicesMenu(): Promise<void> {
    // Click the accessibility "Expand: Services" button to open Services dropdown
    const expandServicesBtn = this.page.locator('button.top-navigation__item-link--a11y', {
      hasText: 'Expand: Services',
    });
    await expandServicesBtn.click();
    await this.page.waitForTimeout(800);
  }

  async clickExploreClientWork(): Promise<void> {
    const exploreLink = this.page.locator('a', { hasText: 'Explore Our Client Work' }).first();
    await exploreLink.waitFor({ state: 'visible' });
    await exploreLink.click();
  }
}

class EpamClientWorkPage {
  constructor(private page: Page) {}

  async verifyClientWorkTextVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/services\/client-work/);
    await expect(this.page).toHaveTitle('Client Work');
    const heading = this.page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Client Work');
  }
}

test.describe('EPAM Website - Services Navigation', () => {
  test('should navigate to Client Work page via Services menu', async ({ page }) => {
    const homePage = new EpamHomePage(page);
    const clientWorkPage = new EpamClientWorkPage(page);

    // Step 1: Navigate to EPAM homepage
    await homePage.navigate();
    await expect(page).toHaveTitle(/EPAM/);

    // Step 2: Open Services menu from header
    await homePage.openServicesMenu();

    // Step 3: Click "Explore Our Client Work" link
    await homePage.clickExploreClientWork();

    // Step 4: Verify "Client Work" text is visible on the page
    await clientWorkPage.verifyClientWorkTextVisible();
  });
});
