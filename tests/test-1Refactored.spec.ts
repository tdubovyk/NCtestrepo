import { test, expect } from '@playwright/test';

// Function to login with valid credentials
async function login(page) {
  await page.goto('https://www.sbzend.ssls.com/');
  await page.getByRole('button', { name: ' Log in' }).click();
  await page.fill('input[placeholder="Email"]', 'ssls.automation+666@gmail.com');
  await page.fill('input[placeholder="Enter password"]', '123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://www.sbzend.ssls.com/user/bundles');
}

// Function to logout
async function logout(page) {
  await page.click('button:has-text("ssls.automation+666@gmail.")');
  await page.click('button:has-text("Log out")');
  await page.waitForTimeout(1000);
}

test('Authorization page (Welcome back!)', async ({ page }) => {
  await page.goto('https://www.sbzend.ssls.com/');
  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('Cheap SSL Certificates—Buy SSL Certs $3.75 | 30-day trial');
  await page.click('text="Log in"');
  await page.waitForURL('https://www.sbzend.ssls.com/authorize');
  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('Sign In | SSLs.com');
  await page.fill('input[placeholder="Email"]', 'ssls.automation+666@gmail.com');
  await page.fill('input[placeholder="Enter password"]', '123456');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.locator('input[placeholder="Enter password"]')).toHaveAttribute('type', 'text');
  await page.click('button:has-text("Login")');
  await page.waitForURL('https://www.sbzend.ssls.com/user/bundles');
  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('My SSL');
  await expect(page.locator('header')).toContainText('ssls.automation+666@gmail.com');
});

test('Login with invalid credentials (not registered user)', async ({ page }) => {
  await page.goto('https://www.sbzend.ssls.com/');
  await page.click('text="Log in"');
  await page.fill('input[placeholder="Email"]', 'invalid@example.com');
  await page.fill('input[placeholder="Enter password"]', 'password123');
  await page.click('button:has-text("Login")');
  await expect(page.title()).resolves.toMatch('Sign In | SSLs.com');
  expect(await page.textContent('text=Uh oh! Email or password is incorrect')).toBeDefined();
});

test('Login with invalid email', async ({ page }) => {
  await page.goto('https://www.sbzend.ssls.com/');
  await page.click('text="Log in"');
  await page.fill('input[placeholder="Email"]', 'test@@test.com');
  await page.fill('input[placeholder="Enter password"]', '123456');
  await page.click('button:has-text("Login")');
  await expect(page.locator('form[name="authForm"]')).toContainText('Uh oh! Thisisn’t an email');
});

test('View Profile Page', async ({ page }) => {
  await login(page);

  await page.click('button:has-text("ssls.automation+666@gmail.")');
  await page.click('text="Profile"');

  const profileInfo = await page.$$eval('.profile-info span', spans => spans.map(span => span.textContent.trim()));

  const newsletterTogglePromice = (page.locator('form[name="form"] div').filter({ hasText: 'Newsletter Include in mailing' }).getByRole('button')).getAttribute('class');  
  const newsletterToggle = (await newsletterTogglePromice)?.trim();

  await logout(page);

  await login(page);

  await page.click('button:has-text("ssls.automation+666@gmail.")');
  await page.click('text="Profile"');

  const profileInfoAfterLogin = await page.$$eval('.profile-info span', spans => spans.map(span => span.textContent.trim()));
  await expect(page.locator('form[name="form"] div').filter({ hasText: 'Newsletter Include in mailing' }).getByRole('button')).toHaveClass((newsletterToggle !== undefined)? newsletterToggle : '');


  // Asserts
  expect(profileInfo).toEqual(profileInfoAfterLogin);
  await expect(page.locator('form[name="form"] div').filter({ hasText: 'Newsletter Include in mailing' }).getByRole('button')).toHaveClass((newsletterToggle !== undefined)? newsletterToggle : '');
});
