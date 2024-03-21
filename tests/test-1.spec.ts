import { test, expect } from '@playwright/test';

test('Authorization page (Welcome back!)', async ({ page }) => {
  // Open the homepage
  await page.goto('https://www.sbzend.ssls.com/');

  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('Cheap SSL Certificates—Buy SSL Certs $3.75 | 30-day trial');

  // Click on the "LOG IN" text
  await page.getByRole('button', { name: ' Log in' }).click();

  await page.waitForURL('https://www.sbzend.ssls.com/authorize')
  await page.waitForTimeout(1000);
  const pageTitle = await page.title();
  expect(pageTitle).toMatch('Sign In | SSLs.com');

  // Enter valid email and password
  await page.getByPlaceholder('Email').fill('ssls.automation+666@gmail.com');
  await page.getByPlaceholder('Enter password').fill('123456');
  
  //Clack an eye icon 
  await page.getByRole('button', { name: '' }).click();
  
  //Verify that password is visible
  await expect(page.getByPlaceholder('Enter password')).toHaveAttribute('type', 'text');

  //Click Login button 
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://www.sbzend.ssls.com/user/bundles');

  await expect(page.title()).resolves.toMatch('My SSL');

  //Verify that button with "User@email" is present on the page. 
  await expect(page.getByRole('banner')).toContainText('ssls.automation+666@gmail.com');
});

test('Login with invalid credentials (not registered user)', async ({ page }) => {
  // Open the homepage
  await page.goto('https://www.sbzend.ssls.com/');

  // Click on the "LOG IN" text
  await page.getByRole('button', { name: ' Log in' }).click();

  // Enter invalid email and any password

  await page.getByPlaceholder('Email').fill('invalid@example.com');
  await page.getByPlaceholder('Enter password').fill('password123');

  // Click the "Login" button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify expected results
  const pageTitle = await page.title();
  expect(pageTitle).toMatch('Sign In | SSLs.com');

  const errorMessage = await page.textContent('text=Uh oh! Email or password is incorrect');
  expect(errorMessage).toBeDefined();
});

test('Login with invalid email', async ({ page }) => {
  // Open the homepage
  await page.goto('https://www.sbzend.ssls.com/');

  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('Cheap SSL Certificates—Buy SSL Certs $3.75 | 30-day trial');

  // Click on the "LOG IN" text
  await page.getByRole('button', { name: ' Log in' }).click();

  await page.waitForURL('https://www.sbzend.ssls.com/authorize')
  await page.waitForTimeout(1000);
  const pageTitle = await page.title();
  expect(pageTitle).toMatch('Sign In | SSLs.com');

  // Enter valid email and password
  await page.getByPlaceholder('Email').fill('test@@test.com');
  await page.getByPlaceholder('Enter password').fill('123456');

  // Click the "Login" button
  await page.getByRole('button', { name: 'Login' }).click();

  //Verify error message such as: “Uh oh! This isn’t an email” should be displayed
  await expect(page.locator('form[name="authForm"]')).toContainText('Uh oh! Thisisn’t an email');
});

test('View Profile Page', async ({ page }) => {
  /**
   * Arrange
   */

  // Open the homepage
  await page.goto('https://www.sbzend.ssls.com/');

  await page.waitForTimeout(1000);
  await expect(page.title()).resolves.toMatch('Cheap SSL Certificates—Buy SSL Certs $3.75 | 30-day trial');

  // Click on the "LOG IN" text
  await page.getByRole('button', { name: ' Log in' }).click();

  await page.waitForURL('https://www.sbzend.ssls.com/authorize')
  await page.waitForTimeout(1000);
  const pageTitle = await page.title();
  expect(pageTitle).toMatch('Sign In | SSLs.com');

  // Enter valid email and password
  await page.getByPlaceholder('Email').fill('ssls.automation+666@gmail.com');
  await page.getByPlaceholder('Enter password').fill('123456');
  
  //Clack an eye icon 
  await page.getByRole('button', { name: '' }).click();
  
  //Verify that password is visible
  await expect(page.getByPlaceholder('Enter password')).toHaveAttribute('type', 'text');

  //Click Login button 
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://www.sbzend.ssls.com/user/bundles');

  await page.getByRole('button', { name: ' ssls.automation+666@gmail.' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();

  //Store all fields to variables
  const name = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span').textContent())?.trim();
  const email = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/span').textContent())?.trim();
  const password = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[3]/div[2]/span').textContent())?.trim();
  const phone = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/span').textContent())?.trim();
  const address = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/span').textContent())?.trim();
  const supportPin = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[6]/div[2]/span').textContent())?.trim();


  //const newsletterToggle = (await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[7]/div[2]/span').textContent())?.trim();
  const newsletterTogglePromice = (page.locator('form[name="form"] div').filter({ hasText: 'Newsletter Include in mailing' }).getByRole('button')).getAttribute('class');  
  const newsletterToggle = (await newsletterTogglePromice)?.trim();

  //Log Out 
  await page.getByRole('button', { name: ' ssls.automation+666@gmail.' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.waitForTimeout(1000);

  // Log in back
  await page.goto('https://www.sbzend.ssls.com/authorize')
  await page.waitForTimeout(1000);
  const pageTitle2 = await page.title();
  expect(pageTitle2).toMatch('Sign In | SSLs.com');

  // Enter valid email and password
  await page.getByPlaceholder('Email').fill('ssls.automation+666@gmail.com');
  await page.getByPlaceholder('Enter password').fill('123456');

  //Click Login button 
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://www.sbzend.ssls.com/user/bundles');

  await page.getByRole('button', { name: ' ssls.automation+666@gmail.' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();

  //Accert
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span')).toContainText((name !== undefined)? name : '');
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/span')).toContainText((email !== undefined)? email : '');
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[3]/div[2]/span')).toContainText((password !== undefined)? password : '');
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/span')).toContainText((phone !== undefined)? phone : '');
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/span')).toContainText((address !== undefined)? address : '');
  await expect(page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[6]/div[2]/span')).toContainText((supportPin !== undefined)? supportPin : '');
  await expect(page.locator('form[name="form"] div').filter({ hasText: 'Newsletter Include in mailing' }).getByRole('button')).toHaveClass((newsletterToggle !== undefined)? newsletterToggle : '');
  await page.locator('xpath=//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span')
});
