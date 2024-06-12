// cypress/config.js
const { defineConfig } = require("cypress");
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationintesting.online',
    setupNodeEvents(on, config) {
      const environment = process.env.NODE_ENV || 'development';
      const envFile = environment === 'production' ? '.env.production' : '.env';

      const envConfig = dotenv.parse(fs.readFileSync(envFile));
      config.env = { ...config.env, ...envConfig };

  return config;
    },
  },
});