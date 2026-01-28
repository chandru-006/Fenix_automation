const { test, expect } = require('@playwright/test');
const { FenixIndexPage } = require('../pages/FenixIndexPage');
const { WalmartLoginPage } = require('../pages/WalmartLoginPage');
const { WalmartAuthorizationPage } = require('../pages/WalmartAuthorizationPage');
const { WalmartWelcomePage } = require('../pages/WalmartWelcomePage');
const { walmart } = require('../config/creds');

test.describe.serial('Fenix → Walmart OAuth Login', () => {
/* ---------- TC-01 ---------- */
test('TC-01: Fenix OAuth index loads with Connect button', async ({ page }) => {
  const index = new FenixIndexPage(page);

  await index.open();
  expect(await index.isConnectVisible()).toBe(true);
  expect(await index.isConnectEnabled()).toBe(true);
});

/* ---------- TC-02 ---------- */
test('TC-02: Clicking Connect redirects to OAuth login', async ({ page }) => {
  const index = new FenixIndexPage(page);

  await index.open();
  await index.clickConnect();

  await expect(page).toHaveURL(/\/oauth\/login/);
});

/* ---------- TC-03 ---------- */
test('TC-03: Walmart OAuth login page is displayed', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);

  await index.open();
  await index.clickConnect();

  expect(await login.isLoaded()).toBe(true);
});

/* ---------- TC-04 ---------- */
test('TC-04: Walmart login form elements are available', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);

  await index.open();
  await index.clickConnect();

  const fields = await login.areFormFieldsVisible();
  fields.forEach(v => expect(v).toBe(true));
});

/* ---------- TC-05 ---------- */
test('TC-05: Forgot password link is visible on Walmart login page', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);

  await index.open();
  await index.clickConnect();

  expect(await login.isForgotPasswordVisible()).toBe(true);
});

/* ---------- TC-06 ---------- */
test('TC-06: Form validation prevents login when credentials are empty', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);

  await index.open();
  await index.clickConnect();

  await login.submitWithoutCredentials();

  expect(await login.isUsernameInvalid()).toBe(true);
  await expect(page).toHaveURL(/\/oauth\/login/);
});

/* ---------- TC-07 ---------- */
test('TC-07: Login submission navigates forward', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);

  await index.open();
  await index.clickConnect();

  await login.enterUsername(walmart.username);
  await login.enterPassword(walmart.password);
  await login.submit();
  await expect(page).toHaveURL(/login\.account\.wal-mart\.com\/authorize/);

});

/* ---------- TC-08 ---------- */
test('TC-08: Walmart OAuth authorize page shows Welcome text', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);
  const authorize = new WalmartAuthorizationPage(page);

  await index.open();
  await index.clickConnect();

  await login.enterUsername(walmart.username);
  await login.enterPassword(walmart.password);
  await login.submit();

  expect(await authorize.isWelcomeVisible()).toBe(true);
});


/* ---------- TC-09 ---------- */
test('TC-09: Login button enabled only after username and password are entered', async ({ page }) => {
  const index = new FenixIndexPage(page);
  const login = new WalmartLoginPage(page);
  const authorize = new WalmartAuthorizationPage(page);

  await index.open();
  await index.clickConnect();

  // Reach Walmart authorization page
  await login.enterUsername(walmart.username);
  await login.enterPassword(walmart.password);
  await login.submit();

  // Initially disabled
  expect(await authorize.isLoginDisabled()).toBe(true);

  // Enter only username → still disabled
  await authorize.enterUsername(walmart.username);
  expect(await authorize.isLoginDisabled()).toBe(true);

  // Enter password → enabled
  await authorize.enterPassword(walmart.password);
  expect(await authorize.isLoginDisabled()).toBe(false);
});

});
