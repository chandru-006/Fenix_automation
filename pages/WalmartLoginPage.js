class WalmartLoginPage {
  constructor(page) {
    this.page = page;

    this.username = '#username';
    this.password = '#password';
    this.loginBtn = '#submitBtn';
    this.forgotLink = '.forgot-link';
  }

  async waitForLoad() {
    // This is the ONLY deterministic signal
    await this.page.waitForSelector(this.username, { timeout: 15000 });
  }
  async isForgotPasswordVisible() {
    await this.waitForLoad();
    return this.page.locator(this.forgotLink).isVisible();
  }
  async isLoaded() {
    await this.waitForLoad();
    return true;
  }

  async areFormFieldsVisible() {
    await this.waitForLoad();
    return Promise.all([
      this.page.locator(this.username).isVisible(),
      this.page.locator(this.password).isVisible(),
      this.page.locator(this.forgotLink).isVisible(),
      this.page.locator(this.loginBtn).isVisible(),
    ]);
  }

  async isLoginEnabled() {
    await this.waitForLoad();
    return this.page.isEnabled(this.loginBtn);
  }

  async enterUsername(value) {
    await this.page.fill(this.username, value);
  }

  async enterPassword(value) {
    await this.page.fill(this.password, value);
  }

  async clearUsername() {
    await this.page.fill(this.username, '');
  }

  async submit() {
    await this.page.click(this.loginBtn);
  }

  async submitWithoutCredentials() {
    await this.page.click(this.loginBtn);
}

  async isUsernameInvalid() {
    return this.page.$eval(this.username, el => !el.checkValidity());
}

}

module.exports = { WalmartLoginPage };
