import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://minimals.cc/auth/amplify/sign-in?returnTo=%2Fdashboard');

  // Try basic input types as fallback
  await page.locator('input[name="email"]').first().fill('demo@minimals.cc');
  await page.locator('input[name="password"]').first().fill('@2Minimal');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Filter Jobs by On Demand Employment', async ({ page }) => {
  await page.click('text=Job');
  await page.click('text=List');

  await page.click('text=Filters');

  // Select "On Demand"
  await page.check('label:has-text("On Demand") input[type="checkbox"]');


  // Validate only 'On Demand' jobs shown
  const jobRows = page.locator('table tbody tr');
  const count = await jobRows.count();

  for (let i = 0; i < count; i++) {
    await expect(jobRows.nth(i)).toContainText('On Demand');
  }
});
