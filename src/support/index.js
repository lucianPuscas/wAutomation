import './commands';
import './wakelet';
import './collections';
import './search';
import './wakeletSupport/loginCollection';
import './wakeletSupport/logoutCollection';
import './wakeletSupport/logoutProfilePage';

// Ignores any uncaught exceptions from our frontend:
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Cypress.Cookies.defaults({
//   preserve: 'WAKELET_ID',             
// });

beforeEach(() => {
  cy.restoreLocalStorage();
  //cy.visit('/');
});

afterEach(() => {
  cy.saveLocalStorage();
});


