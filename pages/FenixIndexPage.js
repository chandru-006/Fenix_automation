const { BasePage } = require('./BasePage');

class FenixIndexPage extends BasePage {
  constructor(page) {
    super(page);
    this.connectBtn = '#connectBtn';
  }

  async open() {
    await this.navigate('/oauth/index');
  }

  async isConnectVisible() {
    return this.page.isVisible(this.connectBtn);
  }

  async isConnectEnabled() {
    return this.page.isEnabled(this.connectBtn);
  }

  async clickConnect() {
    await this.page.click(this.connectBtn);
  }
}

module.exports = { FenixIndexPage };
