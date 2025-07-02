const { allure } = require('allure-playwright');

class VehiclePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: /add/i });
  }

  async goto() {
     await this.page.goto(`${process.env.EXIM_BASE_URL}/cm/vehicle`);
    await this.page.waitForLoadState('networkidle');
  }

  async create() {
    await this.addButton.waitFor({ state: 'visible' });
    await this.addButton.click();
    await allure.attachment('Vehicle page - after clicking Add', await this.page.screenshot(), 'image/png');
  }
}

module.exports = { VehiclePage };
