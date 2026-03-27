// @ts-check
import { test, expect } from '@playwright/test';

let app = 'http://localhost:3000';

test('Title: Contact Manager', async ({ page }) => {
  await page.goto(app);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact Manager/);
});

test('Botón contacts', async ({ page }) => {
  await page.goto(app);

  await page.getByRole('link', { name: 'Contacts' }).click();

});

test('Title: Contacts', async ({ page }) => {
  await page.goto(app + '/contacts');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact List/);
});

test('Contacts list shows contacts', async ({ page }) => {
  await page.goto(app);
  
  await page.getByRole('link', { name: 'Contacts' }).click();
  
  await expect(page).toHaveTitle(/Contact List/);

  const contactRowsCount = await page.getByTestId('contactRow').count();

  expect(contactRowsCount).toBeGreaterThanOrEqual(0);
});