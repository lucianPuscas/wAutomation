// <reference types="cypress" />

describe('New Homepage', () => {

  context('Navigating to accounts service', () => {

    beforeEach(() => {
      cy.visit('/');
    });

    it('Press SIGN UP in header', function() {
      cy.get('#headerNav li a:contains("Sign up")')
        .should('be.visible')
        .click();
      cy.location('hostname').then((url) => {
        expect(url).to.be.equal('accounts.wakelet.com')
      })
      cy.location('pathname').then((url) => {
        expect(url).to.be.equal('/openid/signup')
      })
    })

    it('Press sign up button in page', function() {
      cy.contains('Sign up for free!')
        .should('be.visible')
        .click();
      cy.location('hostname').then((url) => {
        expect(url).to.be.equal('accounts.wakelet.com')
      })
      cy.location('pathname').then((url) => {
        expect(url).to.be.equal('/openid/signup')
      })
    })
  });
});