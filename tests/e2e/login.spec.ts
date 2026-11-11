// e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { ROUTES, TEST_USERS } from './e2e.config';

test('login page - successful login redirects to feed', async ({ page }) => {
  await page.goto(ROUTES.login);

  // Remplir le formulaire
  await page.fill('input[name="email"]', TEST_USERS.valid.email);
  await page.fill('input[name="password"]', TEST_USERS.valid.password);

  // Cliquer sur le bouton de soumission
  await page.click('button[type="submit"]');

  // Attendre la redirection vers /feed
  await page.waitForURL(/\/feed/, { timeout: 10000 });

  // Vérifier que nous sommes bien sur la page feed
  await expect(page).toHaveURL(/\/feed/);
});

test('login page - failed login shows error message', async ({ page }) => {
  await page.goto(ROUTES.login);

  // Remplir avec de mauvaises credentials
  await page.fill('input[name="email"]', TEST_USERS.invalid.email);
  await page.fill('input[name="password"]', TEST_USERS.invalid.password);
  await page.click('button[type="submit"]');

  // Attendre et vérifier le message d'erreur
  const errorDiv = page.locator('div.mt-4.text-red-600');
  await expect(errorDiv).toBeVisible({ timeout: 10000 });
  await expect(errorDiv).toContainText('Error:');
});
