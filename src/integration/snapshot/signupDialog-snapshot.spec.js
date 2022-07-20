import * as locatorsAuth from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/auth.json';


// Test fixed and ready for lounch
// RunUpdateSnapshots:  yarn update-snapshots:dev --spec "src/integration/snapshot/signupDialog-snapshot.spec.js"
// RunTest:   yarn test:snapshot:dev --spec "src/integration/snapshot/signupDialog-snapshot.spec.js"

describe('Sign up flow', () => {

  beforeEach(() => {
    cy.visit('/signup');
    cy.contains('Sign up with email')
        .should('be.visible')
        .click();
  });

  it('Test sign-up dialog', () => {
    cy.get('#emailSignUp').should('not.have.attr','hidden');
    cy.get('#emailSignUp').should('be.visible');  
    cy.compareSnapshot('Snapshot sign-up form');
    
  });
  
  it('Test sign-up translations', ()=>{
    cy.wClick(locatorsAuth.signup.nameInput);
    cy.wClick(locatorsAuth.signup.emailInput);
    cy.wClick(locatorsAuth.signup.passwordInput);
    cy.wClick(locatorsAuth.signup.ageDDInput);
    cy.wClick(locatorsAuth.signup.ageMMInput);
    cy.wClick(locatorsAuth.signup.ageYYYYInput);
    cy.wClick(locatorsAuth.signup.termsAndConditionsCheckbox).then(()=>{
      cy.compareSnapshot('Snapshot sign-up translations',{errorThreshold: 0.1});
    });
  })
});