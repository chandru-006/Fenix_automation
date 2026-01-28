class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://fenix-wmconnector.sigmainfo.net';
  }

  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async currentUrl() {
    return this.page.url();
  }
}

module.exports = { BasePage };
