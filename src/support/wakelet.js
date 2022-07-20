import faker, { internet } from 'faker';
import * as authLocators from '../fixtures/locators/auth.json';
const userFileLocations = './src/fixtures/user.json';


// Authentication ==================================================================================================

Cypress.Commands.add('signup', (snapshotName) => {
  cy.visit('/signup');
  const id = faker.internet.userName();
  const usersFullName = 'Automation Test User';
  const userDetails = {
    name: usersFullName,
    emailAddress: `automation-${id}@wakelet.co.uk`,
    username: 'at' + id.replace(/-|_|\s|\./g, ''),
    password: 'Test@123',
   // password: faker.internet.password(),
    birthday: {
      day: 12,
      month: '09',
      year: 1990,
    },

  };
  cy.writeFile(userFileLocations, userDetails);

  // Step One: Choose SignIn with Email
  cy.wClick(authLocators.signup.signUpWithEmailButton);

  //Assert invalid messages are displayed on the fild

  

  // Step Two: Enter Account Details
  cy.wType(authLocators.signup.nameInput, userDetails.name);
  cy.wType(authLocators.signup.emailInput, userDetails.emailAddress);
  cy.wType(authLocators.signup.passwordInput, userDetails.password);
  cy.wType(authLocators.signup.ageDDInput, userDetails.birthday.day);
  cy.wType(authLocators.signup.ageMMInput, userDetails.birthday.month);
  cy.wType(authLocators.signup.ageYYYYInput, userDetails.birthday.year);

  // Step Three: Agree Terms & Condiations & Submit
  cy.wClick(authLocators.signup.termsAndConditionsCheckbox);
  cy.wClick(authLocators.signup.createYourAccountButton);
 // cy.url().should('eq', `${Cypress.config().baseUrl}/`);

  // Step Four: Getting Started
  cy.wClick(authLocators.signup.getStartedButton);

  // Step Five: Create your username
  cy.wClear(authLocators.signup.usernameInput);
  cy.wType(authLocators.signup.usernameInput, userDetails.username);
  cy.wClick(authLocators.signup.nextButton);

  // Step Six: How would you describe your best
  cy.wClick('div.vertical div.fw--sb:contains("Business")');
  cy.wClick(authLocators.signup.sectorNext);
  cy.wClick(authLocators.signup.sectorOptions);
  cy.wClick(authLocators.signup.doneButton);

});

Cypress.Commands.add('delete', () => {
  cy.visit('/');
  
  // cy.wClick(authLocators.signup.tripleDotButton);
  // cy.wClick(authLocators.signup.accountSettings);
  // cy.wClick(authLocators.signup.deleteAccount);
  // //cy.get('input').parent(authLocators.signup.deleteInputPass)
  // cy.wClick(authLocators.signup.deleteButton);
})

Cypress.Commands.add('newLogin', (snapshotName) => {
  cy.visit('/login')
  .then(() => {
    return ({
      'emailAddress': 'web-automation-2@wakelet.com',
      'username': 'WebAutomation',
      'password': 'Test@123',
      
    })
  }).then((userDetails) => {
    cy.visit('/login');
    cy.wType(authLocators.login.emailAddressInput,userDetails.emailAddress);
    cy.wType(authLocators.login.passwordInput,userDetails.password);
    cy.wClick(authLocators.login.loginButton);
    cy.wAssertDisplayed('wk-view-collection-list');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

Cypress.Commands.add('logout', (snapshotName) => {
  cy.wClick('paper-icon-button');
  cy.wClick('paper-item:contains("Log Out")');
});


let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});



Cypress.Commands.add('deleteCollection',(loc)=>{
    cy.wClick(loc.homeButton);
    cy.get(loc.optionsButton).should('be.visible');
    cy.get(loc.optionsButton).eq(0).click();
    cy.get(loc.options.deleteButton).eq(0).should('be.visible');
    cy.get(loc.options.deleteButton).eq(0).click({multiple: false});
    cy.get(loc.options.delete.deleteButton).should('be.visible');
    cy.get(loc.options.delete.deleteButton).click();
})

// Profile ==================================================================================================

Cypress.Commands.add('navigateToProfile', (method = 'direct') => {
  if (method === 'direct') {
    cy.readFile(userFileLocations).then((userDetails) => {
      cy.visit(`/@${userDetails.username}`);
    });
  } else {
  }
});



Cypress.Commands.add('login', (snapshotName) => {
  cy.readFile(userFileLocations).then((userDetails) => {
    cy.visit('/login');
    cy.wType(authLocators.login.emailAddressInput,userDetails.emailAddress);
    cy.wType(authLocators.login.passwordInput,userDetails.password);
    cy.wClick(authLocators.login.loginButton);
    cy.wAssertDisplayed('wk-view-collection-list');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});


