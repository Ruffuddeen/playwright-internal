const { test, expect } = require('../base/baseTest');
const { VehiclePage } = require('../pages/VehiclePage');

test('Vehicle page', async ({ page,loginPage }) => {
  const vehiclePage = new VehiclePage(page);
  await page.waitForTimeout(3000);
  await vehiclePage.goto();
  await vehiclePage.createVehicle();
});
