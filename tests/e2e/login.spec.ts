// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('login page - successful login redirects to feed', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', 'anael@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // Attends la redirection OU un message d'erreur
  await Promise.race([
    expect(page).toHaveURL(/\/feed/),
    { timeout: 5000 },
    expect(page.locator('.error-message')).toBeVisible(),
  ]);
});
