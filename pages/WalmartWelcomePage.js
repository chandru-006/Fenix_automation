class WalmartWelcomePage {
  constructor(page) {
    this.page = page;
    this.logo = '.logoBox img';
    this.welcomeText = 'span.page-header span:text("Welcome!")';
  }

  async isLogoVisible() {
    return this.page.isVisible(this.logo);
  }

  async isWelcomeVisible() {
    return this.page.isVisible(this.welcomeText);
  }
}

module.exports = { WalmartWelcomePage };
