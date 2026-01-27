// playwright.config.js
require('dotenv').config();
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.EXIM_BASE_URL || 'https://eximauto.pandostaging.in',
    trace: 'on-first-retry',
  },

  // Cross-browser configuration
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
});
