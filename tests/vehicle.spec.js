const { test, expect } = require('../base/baseTest');
const { VehiclePage } = require('../pages/VehiclePage');

test('Vehicle page', async ({ page,loginPage }) => {
  const vehiclePage = new VehiclePage(page);
  await vehiclePage.goto();
  await vehiclePage.create();
});
