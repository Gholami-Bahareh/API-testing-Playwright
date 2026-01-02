const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],                
    ['html', { open: 'on-failure' }], 
    ['allure-playwright']     //  Allure
  ],
  

  use: {
    trace: 'on-first-retry',
    baseURL: 'https://restful-booker.herokuapp.com',
  },
});
