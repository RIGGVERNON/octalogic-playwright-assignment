import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://minimals.cc/auth/amplify/sign-in?returnTo=%2Fdashboard');

  // Try basic input types as fallback
  await page.locator('input[name="email"]').first().fill('demo@minimals.cc');
  await page.locator('input[name="password"]').first().fill('@2Minimal');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Send Chat Message to Deja Brady', async ({ page }) => {
  await page.click('text=Chat');

  // Open chat with Deja Brady
  await page.click('text=Deja Brady');

  const message = 'Hello, how are you?';

  const input = page.getByPlaceholder('Type a message');
  await input.fill(message);
  await page.keyboard.press('Enter');

  // Validate message appears
  await expect(page.locator(`text=${message}`)).toBeVisible();
});
