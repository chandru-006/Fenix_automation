class WalmartAuthorizationPage {
  constructor(page) {
    this.page = page;

    // Top-level content
    this.welcomeText = 'text=Welcome!';

    // iframe-scoped selectors
    this.username = '[data-automation-id="username"]';
    this.password = '[data-automation-id="password"]';
    this.loginBtn = '[data-automation-id="loginBtn"]';
  }

  /* ---------- TC-08 ---------- */
  async isWelcomeVisible() {
    // IMPORTANT: Welcome text is NOT inside iframe
    await this.page.waitForSelector(this.welcomeText, { timeout: 20000 });
    return true;
  }

  /* ---------- iframe helpers ---------- */
  async getAuthFrame() {
    // Find frame that actually contains the login button
    for (const frame of this.page.frames()) {
      try {
        if (await frame.locator(this.loginBtn).count() > 0) {
          return frame;
        }
      } catch {
        // ignore detached frames
      }
    }

    throw new Error('Walmart auth iframe not found');
  }

  async isLoginDisabled() {
    const frame = await this.getAuthFrame();
    await frame.waitForSelector(this.loginBtn, { timeout: 20000 });
    return frame.isDisabled(this.loginBtn);
  }

  async enterUsername(value) {
    const frame = await this.getAuthFrame();
    await frame.fill(this.username, value);
  }

  async enterPassword(value) {
    const frame = await this.getAuthFrame();
    await frame.fill(this.password, value);
  }
}

module.exports = { WalmartAuthorizationPage };
