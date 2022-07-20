// <reference types="cypress" />
import * as authLocators from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/auth';

describe('Sign up flow', () => {

  beforeEach(() => {
    cy.visit('/signup');
    cy.contains('Sign up with email')
        .should('be.visible')
        .click()
    cy.get('#emailSignUp').should('not.have.attr','hidden')
    cy.get('#emailSignUp').should('be.visible');
    cy.get('.fs--s:contains("Bac")').should('be.visible').click();
  });

  const urls = {
    'Apple': 'https://appleid.apple.com/auth/authorize'
  }
  
  const providerData = [
    {
      name: 'Apple',
      hostname: 'appleid.apple.com',
      pathname: '/auth/authorize'
    },
    {
      name: 'Google',
      hostname: 'accounts.google.com/',
      pathname: '/o/oauth2/v2/auth/oauthchooseaccount'
    },
    {
      name: 'Microsoft',
      hostname: 'login.microsoftonline.com',
      pathname: '/common/oauth2/v2.0/authorize'
    },
    {
      name: 'Facebook',
      hostname: 'facebook.com',
      pathname: '/login.php'
    },
  ]

  providerData.forEach(function(provider) {
      it(`Continue with ${provider.name}`, function() {
        cy.contains(`Continue with ${provider.name}`)
          .then((el) => {
            cy.get(el)
              .should('be.visible')
              .click()
          })
          cy.compareSnapshot(provider.name,{errorThreshold: 0.1});
      }) 
    })

  // providerData.forEach(function(provider) {
  //   it(`Continue with ${provider.name}`, function() {
  //     cy.contains(`Continue with ${provider.name}`)
  //       .then((el) => {
  //         cy.spy(el,'click')
  //       })
  //       .should('be.visible')
  //       .click()
  //       .then((el) => {
  //         expect(el.click).to.be.called
  //       })
  //   }) 
  // })

  // context('sign up with email', function() {
  //   it('sign up form ui', function() {
  //     cy.get('#emailSignUp').should('not.have.attr','hidden');
  //     cy.screenshot();
  //   })
  // })

});