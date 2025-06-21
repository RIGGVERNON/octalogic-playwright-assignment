import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://minimals.cc/auth/amplify/sign-in?returnTo=%2Fdashboard');

  // Try basic input types as fallback
  await page.locator('input[name="email"]').first().fill('demo@minimals.cc');
  await page.locator('input[name="password"]').first().fill('@2Minimal');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Delete All Files from File Manager', async ({ page }) => {
  await page.click('text=File manager');

  // Select all files
  await page.locator('.MuiCheckbox-root').first().click();
  // Click delete
  await page.getByRole('button', { name: 'Delete' }).click();
  // Confirm deletion in dialog
  // Wait for dialog or container to appear
  await expect(page.getByRole('dialog')).toBeVisible();

  // Wait for and click the confirm button
  const confirmBtn = page.getByRole('button', { name: 'Delete' });
  await confirmBtn.waitFor({ state: 'visible' });
  await confirmBtn.click();
  // Validate all files deleted
  const items = page.locator('table tbody tr');
  await expect(items).toHaveCount(0);
  
});
