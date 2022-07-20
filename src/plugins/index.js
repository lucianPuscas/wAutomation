/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
const dotenvPlugin = require('cypress-dotenv');


module.exports = (on, config) => {
 
  getCompareSnapshotsPlugin(on, config);
  config = dotenvPlugin(config);
  return config;
};
