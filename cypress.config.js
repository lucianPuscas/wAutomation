const { defineConfig } = require('cypress')

module.exports = defineConfig({
  numTestsKeptInMemory: 5,
  viewportWidth: 1000,
  viewportHeight: 660,
  defaultCommandTimeout: 10000,
  execTimeout: 60000,
  taskTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  responseTimeout: 50000,
  animationDistanceThreshold: 10,
  fixturesFolder: 'src/fixtures',
  screenshotsFolder: 'cypress/snapshots/actual',
  videosFolder: 'src/videos',
  video: false,
  videoUploadOnPasses: false,
  modifyObstructiveCode: false,
  trashAssetsBeforeRuns: true,
  screenshotOnRunFailure: false,
  includeShadowDom: true,
  watchForFileChanges: false,
  waitForAnimations: true,
  experimentalFetchPolyfill: true,
  chromeWebSecurity: false,
  projectId: 'bo8v15',
  retries: 0,
  env: {
    failSilently: true,
    type: 'actual',
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    // We've imported your old cypress plugins here.

    setupNodeEvents(on, config) {
      return require('./src/plugins/index.js')(on, config)
    },
    baseUrl: 'https://staging.wakelet.com',
    specPattern: 'src/integration/**/*.spec.*',
    supportFile: 'src/support/index.js',
  },
})
