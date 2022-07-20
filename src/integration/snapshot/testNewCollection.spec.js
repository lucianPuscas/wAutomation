
import * as collectionLocators from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/collection.json';
import * as collectionContent from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/content/collectionContent.json';




const newCollectionLoc = collectionLocators.collection;
const settingsLocators = collectionLocators.settings;

describe.skip('Collection Basics', () => {
  before(() => {
    cy.newLogin('collections-login');
  });
 it('First collection',()=>{

  cy.get(collectionLocators.collection.cookiesBanner).then((cookiesBanner)=>{
    if(cookiesBanner , true){
    cy.wClick(collectionLocators.collection.cookiesBanner);
    }
  });
  
  // cy.compareSnapshot('No collections created',{errorThreshold: 0.1});

  cy.wClick(collectionLocators.createCardTileButton);

  // cy.getCookie('_gaexp').then((cookie) => {
  //   if (cookie.value.slice(cookie.value.length -1) === '1') {
  //     cy.get(collectionLocators.layoutTestButton).should('be.visible').click();    
  //    }
  //   });
  cy.get(collectionLocators.layoutDialogMedia).should('be.visible').click();
  cy.get(collectionLocators.layoutTestButton).should('be.visible').click(); 

  cy.wAssertDisplayed(newCollectionLoc.doneButton);
  cy.wAssertDisplayed(newCollectionLoc.privacyMenuDropdownButton);
  cy.wAssertDisplayed(newCollectionLoc.settingsButton);

  cy.get(collectionLocators.collectionContainer).should('be.visible');
    // cy.compareSnapshot('Empty collection',{errorThreshold: 0.1});
  
  
  cy.wTypeTextarea(newCollectionLoc.nameTextarea, collectionContent.title);
  //cy.compareSnapshot('Title added',{errorThreshold: 0.1});
  
  cy.wTypeTextarea(newCollectionLoc.descriptionTextarea,collectionContent.description);
  // cy.compareSnapshot('Title and Description added',{errorThreshold: 0.1});


  cy.get(newCollectionLoc.privacyMenuDropdownButton).should('be.visible').click();
  
  cy.get(newCollectionLoc.privacyOptions.private).should('be.visible');
  cy.get(newCollectionLoc.privacyOptions.unlisted).should('be.visible');
  cy.get(newCollectionLoc.privacyOptions.public).should('be.visible');

  // cy.compareSnapshot('Visibility dropdown',{errorThreshold: 0.1});
  cy.get(newCollectionLoc.privacyOptions.public).click();
    //   cy.compareSnapshot('Public visibility',{errorThreshold: 0.1});
   

  cy.get(newCollectionLoc.settingsButton).should('be.visible').click();
    
  // cy.compareSnapshot('Settings',{errorThreshold: 0.1});
 
 

  cy.get(settingsLocators.sharing.copyToggle).should('be.visible').click();
    // cy.compareSnapshot('Shering',{errorThreshold: 0.1});
  cy.get(settingsLocators.collaboration.contributorsEditingToggle).should('be.visible').click();
  // cy.compareSnapshot('Shering and Collaboration',{errorThreshold: 0.1});
       
  cy.wClick(settingsLocators.closeIconButton);  
  cy.wClick(newCollectionLoc.doneButton);
  cy.wClick(newCollectionLoc.homeButton);

 });

 it('delete Collection', ()=>{

  cy.deleteCollection(newCollectionLoc);

  });

});
