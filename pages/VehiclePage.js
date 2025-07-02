const { allure } = require('allure-playwright');

class VehiclePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: /add/i });
    this.name = page.getByPlaceholder('Enter Name');
    this.typeInput = page.locator("(//label[text()='Type']//parent::div//div)[1]//input[@placeholder='Select']");
    this.typeInputValue = page.locator("//div[@aria-hidden='false']/descendant::span[text()='TRUCK']");
    this.fuelTypeInput = page.locator("(//label[text()='Fuel Type']//parent::div//div)[1]//input[@placeholder='Select']");
    this.fuelTypeInputValue = page.locator("//div[@aria-hidden='false']/descendant::span[text()='DIESEL']");
    this.volume = page.getByLabel('Volume').nth(0);
    this.weight = page.getByLabel('Weight').nth(0);
    this.volumeUnit = page.locator("(//label[text()='Volume Unit']//parent::div//div)[1]//input[@placeholder='Select']");
    this.volumeUnitValue = page.locator("//div[@aria-hidden='false']/descendant::span[text()='CFT']");
    this.weightUnit = page.locator("(//label[text()='Weight Unit']//parent::div//div)[1]//input[@placeholder='Select']");
    this.weightUnitValue = page.locator("//div[@aria-hidden='false']/descendant::span[text()='KG']");
    this.status = page.locator("(//label[text()='Status']//parent::div//div)[1]//input[@placeholder='Select' or @placeholder='Status']");
    this.statusValue = page.locator("//div[@aria-hidden='false']/descendant::span[text()='ACTIVE'or text()='Active']");
    this.searchContainerCode = page.getByPlaceholder('Search Container Code');
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.container = page.getByText('22K8').nth(0);
  }

  async goto() {
     await this.page.goto(`${process.env.EXIM_BASE_URL}/cm/vehicle`);
    await this.page.waitForLoadState('networkidle');
  }

  async createVehicle() {
    await this.addButton.waitFor({ state: 'visible' });
    await this.addButton.click();
    await this.name.fill('1234567890');
    await this.typeInput.click();
    await this.typeInputValue.click();
    await this.fuelTypeInput.click();
    await this.fuelTypeInputValue.click();
    await this.volume.fill('12');
    await this.weight.fill('45');
    await this.volumeUnit.click();
    await this.volumeUnitValue.click();
    await this.weightUnit.click();
    await this.weightUnitValue.click();
    await this.status.click();
    await this.statusValue.click();
    await this.searchContainerCode.fill('22K8');
    await this.container.click();
    await this.createButton.click();
    await allure.attachment('Vehicle page - after clicking Add', await this.page.screenshot(), 'image/png');
  }
}

module.exports = { VehiclePage };
