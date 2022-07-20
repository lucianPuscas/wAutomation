/// <reference types="cypress" />
import * as collectionLocators from '../fixtures/locators/collection.json';
import * as collectionContent from '../fixtures/content/collectionContent.json';



const newCollectionLoc = collectionLocators.collection;
const settingsLocators = collectionLocators.settings;

describe.skip('Collection Basics', () => {
  before(() => {
    cy.newLogin('collections-login');
  });
 it('First collection',()=>{
 // cy.compareSnapshot('No collections created');

  cy.wClick(collectionLocators.createCardTileButton);
  cy.wAssertDisplayed(newCollectionLoc.doneButton);
  cy.wAssertDisplayed(newCollectionLoc.privacyMenuDropdownButton);
  cy.wAssertDisplayed(newCollectionLoc.settingsButton).then(()=>{
   // cy.compareSnapshot('Empty collection',{errorThreshold: 0.1});
  });
  cy.wTypeTextarea(newCollectionLoc.nameTextarea, collectionContent.title).then(()=>{
   
   // cy.compareSnapshot('Title added',{errorThreshold: 0.1});
  });

  cy.wTypeTextarea(newCollectionLoc.descriptionTextarea,collectionContent.description).then(()=>{
  
     // cy.compareSnapshot('Description added',{errorThreshold: 0.1});
    });

    cy.changeCollectionPrivacy(collectionContent.visibility).then(()=>{
   
     // cy.compareSnapshot('Public visibility',{errorThreshold: 0.1});
    });



    if ( collectionContent.sharing === true || collectionContent.collaboration === true ){

        cy.wClick(newCollectionLoc.settingsButton).then(() => {
        //  cy.compareSnapshot('Settings',{errorThreshold: 0.1})
      });

      if (collectionContent.sharing === true) {
        cy.wClick(settingsLocators.sharing.copyToggle).then(() => {
        //  cy.compareSnapshot('Shering',{errorThreshold: 0.1})
        });
      }

      if (collectionContent.collaboration === true) {
        cy.wClick(settingsLocators.collaboration.contributorsEditingToggle).then(() => {
        //  cy.compareSnapshot('Collaboration',{errorThreshold: 0.1})
        });
      }

        cy.wClick(settingsLocators.closeIconButton);

    };


    cy.wClick(newCollectionLoc.doneButton);
    cy.wClick(newCollectionLoc.homeButton);

 });


 it('Delete the collection ',()=>
 {
  cy.wClick(newCollectionLoc.homeButton);
  cy.get(newCollectionLoc.optionsButton).should('be.visible');

  cy.get(newCollectionLoc.optionsButton).eq(0).click({multiple: false});
  cy.get(newCollectionLoc.options.deleteButton).eq(0).should('be.visible').then(()=>{
  //  cy.compareSnapshot('Collection Actions',{errorThreshold: 0.1})
  });
 
  cy.get(newCollectionLoc.options.deleteButton).eq(0).click({multiple: false});
  cy.get(newCollectionLoc.options.delete.deleteButton).should('be.visible');
  cy.get(newCollectionLoc.options.delete.deleteButton).click();
  
  //cy.get(newCollectionLoc.options.deleteButton).should('be.visible');

  //cy.wClick(newCollectionLoc.options.deleteButton);
 });
})
