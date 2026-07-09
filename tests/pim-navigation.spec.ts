import { test, expect } from '../fixtures/base.fixture';

test.describe('TC_003 - PIM Module - Navigation Feature', () => {
  test.beforeEach(async ({ authenticatedPage: page }) => {
    await expect(page).toHaveURL(/\/dashboard\/index/);
  });

  test('TC_003 - Authenticated HR Administrator navigates to Add Employee form via PIM module', async ({
    authenticatedPage: page,
  }) => {
    const expectedUrl = '/pim/addEmployee';
    const expectedTitle = 'Add Employee';

    await test.step('Step 1: Click on PIM menu item in the left navigation bar', async () => {
      await page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('link', { name: 'PIM' }).click();
      await page.waitForLoadState('networkidle');
      const topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
      await expect(topbarMenu.getByRole('link', { name: 'Add Employee' })).toBeVisible();
    });

    await test.step('Step 2: Click on Add Employee from the PIM submenu', async () => {
      await page.getByRole('navigation', { name: 'Topbar Menu' }).getByRole('link', { name: 'Add Employee' }).click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Step 3: Assert the current URL contains /pim/addEmployee', async () => {
      await expect(page).toHaveURL(new RegExp(expectedUrl));
    });

    await test.step('Step 4: Assert the page heading displays Add Employee', async () => {
      await expect(page.getByRole('heading', { name: expectedTitle, level: 6 })).toBeVisible();
    });

    await test.step('Step 5: Assert First Name, Middle Name, Last Name, and Employee ID fields are visible', async () => {
      await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Middle Name' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
      await expect(page.locator('input.oxd-input').nth(4)).toBeVisible();
    });
  });
});
