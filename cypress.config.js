const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3003',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
