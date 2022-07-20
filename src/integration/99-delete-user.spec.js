/// <reference types="cypress" />
import * as commonLocators from '../fixtures/locators/common.json';
import * as settingsLocators from '../fixtures/locators/settings.json';
import * as userDetails from '../fixtures/user.json';
const deleteAccountLocators = settingsLocators.manageAccount.deleteAccount;
describe.skip('Delete Account', () => {
  before(() => {
    cy.login('delete-account-login');
  });
  context('Testcases', () => {
    const navigatetoDeleteAccount = (snapshotPrefix) => {
      cy.wClick(commonLocators.header.menuDropdownIconButton);
      cy.wClick(commonLocators.header.menu.settings);
    //  cy.wCompareSnapshots(`${snapshotPrefix}-settings-manage-account-before`);
      cy.wClick(deleteAccountLocators.deleteButton);
      //cy.wCompareSnapshots(`${snapshotPrefix}-settings-manage-account--delete-modal`);
    };
    it('when the user enters a pssword and cancels the modal they are returned to settings > manage account', () => {
      navigatetoDeleteAccount('first');
      cy.wType(deleteAccountLocators.modal.passwordInput, userDetails.password);
      cy.wClick(deleteAccountLocators.modal.cancelButton);
     // cy.wCompareSnapshots('settings-manage-account-after');
    });
    //   TODO: When issue resolved -- https://wakelet.axosoft.com/viewitem?id=2244&type=features&force_use_number=true
    // it('when the user enters the wrong password', () => {
    //   navigatetoDeleteAccount();
    //   cy.wType(deleteAccountLocators.modal.passwordInput, 'AbC123.');
    //   cy.wClick(deleteAccountLocators.modal.deleteButton);
    // });
    it('when the user enters the correct password the account is deleted', () => {
      navigatetoDeleteAccount('second');
      cy.wType(deleteAccountLocators.modal.passwordInput, userDetails.password);
      cy.wClick(deleteAccountLocators.modal.deleteButton);
    
    });
    // Should the user be shown something to now know there account is being deleted in X days
    // it('when the user logs in they should now be shown ....', () => {
    // });
  });
});
