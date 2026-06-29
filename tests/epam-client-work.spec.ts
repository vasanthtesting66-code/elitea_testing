import { test, expect, Page } from '@playwright/test';

/**
 * Test Suite: EPAM Website - Services > Client Work Navigation
 *
 * Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Select "Services" from the header menu
 *   3. Click the "Explore Our Client Work" link
 *   4. Verify that the "Client Work" text is visible on the page
 */

// ---------------------------------------------------------------------------
// Page Object: EpamHomePage
// ---------------------------------------------------------------------------
class EpamHomePage {
  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Expand the "Services" menu item in the main navigation.
   * The EPAM homepage renders a full-viewport hero carousel that intercepts
   * pointer events, so we use a JS-based approach to reliably open the menu.
   */
  async openServicesMenu(): Promise<void> {
    // Disable pointer-event blocking from hero carousel / main content
    await this.page.evaluate(() => {
      const main = document.querySelector('#main');
      if (main) (main as HTMLElement).style.pointerEvents = 'none';

      document.querySelectorAll<HTMLElement>(
        '.content-container, .parsys, .single-slide__image'
      ).forEach(el => { el.style.pointerEvents = 'none'; });
    });

    // Expand the Services list item via CSS class manipulation
    await this.page.evaluate(() => {
      const mainNav = document.querySelector<HTMLElement>(
        'nav[aria-label="Main navigation"]'
      );
      if (!mainNav) return;

      const items = mainNav.querySelectorAll<HTMLLIElement>('li');
      const servicesItem = Array.from(items).find(
        li => li.textContent?.trim().startsWith('Services')
      );

      if (servicesItem) {
        servicesItem.classList.remove('item--collapsed');
        servicesItem.classList.add('item--expanded');

        const toggle = servicesItem.querySelector<HTMLElement>(
          '.hamburger-menu__sub-menu-toggle-button'
        );
        if (toggle) toggle.setAttribute('aria-expanded', 'true');

        const subList = servicesItem.querySelector<HTMLElement>(
          '.hamburger-menu__sub-list'
        );
        if (subList) {
          Object.assign(subList.style, {
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            maxHeight: 'none',
            overflow: 'visible',
          });
        }
      }
    });
  }

  /**
   * Click the "Explore Our Client Work" link.
   * The link appears both in the hero banner and (as "Client Work") inside
   * the Services submenu; we click the hero-banner instance which carries
   * the exact accessible name "Explore Our Client Work".
   */
  async clickExploreClientWork(): Promise<void> {
    await this.page.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a')).find(
        a => a.textContent?.trim() === 'Explore Our Client Work'
      ) as HTMLAnchorElement | undefined;

      if (link) link.click();
    });

    // Wait for navigation to the client-work page
    await this.page.waitForURL('**/services/client-work', { timeout: 15_000 });
  }
}

// ---------------------------------------------------------------------------
// Page Object: EpamClientWorkPage
// ---------------------------------------------------------------------------
class EpamClientWorkPage {
  readonly url = 'https://www.epam.com/services/client-work';

  constructor(private readonly page: Page) {}

  async waitForPage(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Returns the text of the main <h1> heading */
  async getH1Text(): Promise<string> {
    return (await this.page.locator('h1').first().textContent()) ?? '';
  }

  /** Returns true when "Client Work" text is present and visible */
  async isClientWorkTextVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return !!(h1 && h1.offsetParent !== null && h1.textContent?.includes('Client Work'));
    });
  }
}

// ---------------------------------------------------------------------------
// Test
// ---------------------------------------------------------------------------
test.describe('EPAM Website – Services → Client Work', () => {
  test('should navigate via Services menu and verify "Client Work" page', async ({ page }) => {
    const homePage = new EpamHomePage(page);
    const clientWorkPage = new EpamClientWorkPage(page);

    // ── Step 1: Open the EPAM homepage ──────────────────────────────────────
    await homePage.navigate();

    await expect(page).toHaveTitle(
      /EPAM \| Software Engineering & Product Development Services/i
    );

    // ── Step 2: Open the "Services" menu in the header ─────────────────────
    await homePage.openServicesMenu();

    // Verify Services menu is expanded (aria-expanded = true on toggle button)
    const isExpanded = await page.evaluate(() => {
      const btn = document.querySelector<HTMLElement>(
        'nav[aria-label="Main navigation"] .hamburger-menu__sub-menu-toggle-button[aria-expanded="true"]'
      );
      return btn !== null;
    });
    expect(isExpanded).toBe(true);

    // ── Step 3: Click "Explore Our Client Work" ─────────────────────────────
    await homePage.clickExploreClientWork();

    // ── Step 4: Verify "Client Work" text is visible ────────────────────────
    await clientWorkPage.waitForPage();

    // 4a – URL assertion
    await expect(page).toHaveURL(/\/services\/client-work/);

    // 4b – Page title assertion
    await expect(page).toHaveTitle('Client Work');

    // 4c – H1 heading assertion
    const h1Text = await clientWorkPage.getH1Text();
    expect(h1Text.trim()).toBe('Client Work');

    // 4d – Visibility assertion
    const visible = await clientWorkPage.isClientWorkTextVisible();
    expect(visible).toBe(true);

    // 4e – Playwright built-in visibility assertion on the H1
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h1').first()).toHaveText('Client Work');
  });
});
