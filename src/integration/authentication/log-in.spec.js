// <reference types="cypress" />

describe('Sign up flow', () => {

  context('Navigating to accounts service', () => {

    beforeEach(() => {
      cy.visit('/');
    });

    it('Press SIGN UP in header', function() {
      cy.get('a.signup-btn:contains("Sign up")')
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

    it('Press Sign up button on web-mobile', function(){
      cy.viewport(375,812)

      cy.get('#menuIcon')
        .should('be.visible')
        .click();
      // cy.wait(2000)

      cy.get('a.signup-btn:contains("Sign up")')
        .should('be.visible')
        .click();
      // cy.wait(3000)

    cy.location('hostname').then((url) => {
      expect(url).to.be.equal('accounts.wakelet.com')
    })
      

    })
  });
});