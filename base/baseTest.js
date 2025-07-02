// base/baseTest.js
require('dotenv').config();
const { test: baseTest, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.EXIM_USERNAME,
      process.env.EXIM_PASSWORD
    );
    await use(loginPage);
  },
});

module.exports = {
  test,
  expect,
};
