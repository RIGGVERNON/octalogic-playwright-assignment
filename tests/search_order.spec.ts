import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
  await page.goto('https://minimals.cc/auth/amplify/sign-in?returnTo=%2Fdashboard');

  // Try basic input types as fallback
  await page.locator('input[name="email"]').first().fill('demo@minimals.cc');
  await page.locator('input[name="password"]').first().fill('@2Minimal');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Search Order', async ({ page }) => {
  await page.click('text=Order');
  await page.click('text=List');

  await page.fill('input[placeholder="Search customer or order number..."]', 'cor');
  await page.press('input[placeholder="Search customer or order number..."]', 'Enter');

  // Validate only 1 result with user "Cortez Herring"
  const row = page.locator('table tbody tr:has-text("Cortez Herring")');
  await expect(row).toHaveCount(1);

  await expect(row.getByText('Cortez Herring')).toBeVisible();

});
