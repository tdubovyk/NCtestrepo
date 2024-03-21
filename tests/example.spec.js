// @ts-check
const { test, expect } = require('@playwright/test');

test('Login with valid credentials', async ({ page }) => {
    // Open the homepage
    await page.goto('https://www.sbzend.ssls.com/');

    // Click on the "LOG IN" text
    await page.click('text=LOG IN');

    // Enter valid email and password
    await page.fill('#user_email', 'ssls.automation+666@gmail.com');
    await page.fill('#user_password', '123456');

    // Click the "Login" button
    await page.click('button:has-text("Log in")');

    // Verify expected results
    await expect(page.title()).resolves.toMatch('Your Account');
    await expect(page.isVisible('text=ssls.automation+666@gmail.com')).resolves.toBe(true);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
