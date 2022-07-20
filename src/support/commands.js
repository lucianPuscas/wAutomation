import faker from 'faker';
const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

// Clickable =====================================================================================

Cypress.Commands.add('wClick', (locator) => {
  cy.get(locator, {
    includeShadowDom: true,
  }).click({ force: true, multiple: true }).then(()=>{
    //cy.wait(2000);
  });
});

Cypress.Commands.add('wClickRandomOption', (locator, potentialValues) => {
  cy.get(locator, { includeShadowDom: true })
    .contains(faker.random.arrayElement(potentialValues))
    .click({ force: true, multiple: true });
});

Cypress.Commands.add('wPaperMenu', (paperMenuLocator, optionLocator) => {
  cy.wClick(paperMenuLocator);
  cy.wClick(optionLocator);
});

// Inputs =====================================================================================

Cypress.Commands.add('wType', (locator, text) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  // cy.wait(1000);
  cy.get(locator, {
    includeShadowDom: true,
  })
    .type(text, { force: true })
    .trigger('input');
});

Cypress.Commands.add('wTypeTextarea', (locator, text) => {
  // eslint-disable-next-line cypress/no-assigning-return-values
  const input = cy.get(locator, {
    includeShadowDom: true,
  });
  input.type(text, { force: true, delay: 100 });
  input.then((el) => {
    cy.window().then((win) => {
      el[0].dispatchEvent(new win.Event('input'));
    });
  });
});

Cypress.Commands.add('wClear', (locator, text) => {
  cy.get(locator, {
    includeShadowDom: true,
  }).clear({ force: true });
});

// Asserts =====================================================================================

Cypress.Commands.add('wAssertDisplayed', (locator) => {
  cy.get(locator).should('be.visible');
});

Cypress.Commands.add('wAssertContainsAndDisplayed', (locator, containsText) => {
  cy.get(`${locator}:contains(${containsText})`, {
    includeShadowDom: true,
    timeout: 5000,
  })
    .contains(containsText)
    .should('be.visible');
});

Cypress.Commands.add('wNotExist', (locator, containsText) => {
  cy.get(`${locator}:contains(${containsText})`, {
    includeShadowDom: true,
    timeout: 5000,
  }).should('not.exist');
});



// Visual Snapshots =====================================================================================

compareSnapshotCommand({
  //capture: 'fullPage'
  capture: 'viewport',
})

//Waiting 1 sec before the screenshot  

Cypress.Commands.add('wCompareSnapshot',($name,$capture,$treshold)=>{
  // Should be comented on git push 
  //cy.wait(1500)
	cy.compareSnapshot($name,{capture:$capture,errorThreshold:$treshold})
	});

// Hide cypress reporter page on screenshot

Cypress.Commands.add('wScreenshot',(screenshotName)=>{
  var reporter = window.parent.document.getElementsByClassName('reporter')[0],
	display = reporter.style.display;
	reporter.style.display = 'none';
	return cy.compareSnapshot(screenshotName,{capture: 'runner' , errorThreshold: 0.2}).then(() => {
		reporter.style.display = display;
	})
})

// Removing the page background before the screenshot

Cypress.Commands.add('wScreenshotDialog',($name,$capture,$treshold)=>{
   cy.get('div#__next main').invoke('hide')
  // Should be comented on git push
  //cy.wait(1500)
  cy.compareSnapshot($name,{capture:$capture,errorThreshold:$treshold})	
})



// Helping functions for login collection page ==================================================================



    //to be removed on git push - should wait for the iframe to load 

    Cypress.Commands.add('getNewWeb', () => {
      // cy.wait(300)
       return cy.get('iframe#iframe',{timeout:60000})
       .its('0.contentDocument.body')
       .should('not.be.empty')
       .then(cy.wrap)
     })
 
     Cypress.Commands.add('loginAutomation', (email, password) => {
       cy.session([email,password],()=>{
         cy.visit('/login')
         cy.wType('input#email',email)
         cy.wType('input#password',password);
         cy.wClick('form button.btn--primary.gt--s')
         cy.url().should('eq', `${Cypress.config().baseUrl}/`);
       })
     })
