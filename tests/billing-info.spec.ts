import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
  await page.goto('https://minimals.cc/auth/amplify/sign-in?returnTo=%2Fdashboard');

  // Try basic input types as fallback
  await page.locator('input[name="email"]').first().fill('demo@minimals.cc');
  await page.locator('input[name="password"]').first().fill('@2Minimal');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Update Billing Information', async ({ page }) => {
  // Navigate to Billing tab
  await page.getByText('User').click();
  await page.getByText('Account').click();
  await page.getByText('Billing').click();
  

  await page.locator('.MuiGrid-root:has-text("basic"):has-text("Free")').first().click();

  // Click dropdown for Billing Name
  await page.getByText('Jayvion Simon', { exact: true }).click();
  await page.getByText('Deja Brady', { exact: true }).click();

// Step 1: Open the payment method dropdown
  await page.locator('button.MuiButton-outlined').click(); // or use getByRole if needed

// Step 2: Select the card ending in 1234
  await page.locator('h6:has-text("1234")').first().click();


  // Save changes
  await page.getByRole('button', { name: 'Upgrade plan' }).click();

  // Validate updated name and card
  await expect(page.getByText('Deja Brady').first()).toBeVisible();
  await expect(page.getByText(/1234/).first()).toBeVisible();
 
});
