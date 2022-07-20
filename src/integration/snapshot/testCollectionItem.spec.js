
import * as collectionLocators from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/collection.json';
import * as collectionContent from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/content/collectionContent.json';

const newCollectionLoc = collectionLocators.collection;


// Test fixed and ready for lounch
// RunUpdateSnapshots:  yarn update-snapshots:dev --spec "src/integration/snapshot/testCollectionItem.spec.js"
// RunTest:   yarn test:snapshot:dev --spec "src/integration/snapshot/testCollectionItem.spec.js"

describe.skip('Test1', () => {
  before(() => {
    cy.newLogin('collections-login');
  });
it('Add link to collection',()=>{

cy.get(collectionLocators.collection.cookiesBanner).then((cookiesBanner)=>{
      if(cookiesBanner, true){
      cy.get(collectionLocators.collection.cookiesBanner).click({force:true, multiple:true });
      }
    });
  
  cy.wClick(collectionLocators.createCardTileButton);

  // cy.getCookie('_gaexp').then((cookie) => {
  //   if (cookie.value.slice(cookie.value.length -1) === '1') {
  //     cy.get(collectionLocators.layoutTestButton).should('be.visible').click();    
  //    }
  //   });

    cy.get(collectionLocators.layoutDialogMedia).should('be.visible').click();
    cy.contains('div.layout-modal__content-section-info','Display content in a visual list');

    //cy.compareSnapshot('Layout dialog',{errorThreshold: 0.1});

    cy.get(collectionLocators.layoutTestButton).should('be.visible').click(); 

    cy.wTypeTextarea(newCollectionLoc.nameTextarea, collectionContent.title1); 
    cy.wCompareSnapshot( newCollectionLoc.nameTextarea ,'Title','0');
    
   
   cy.wTypeTextarea(newCollectionLoc.descriptionTextarea,collectionContent.description1);
   cy.wCompareSnapshot(newCollectionLoc.descriptionTextarea,'Description','0');

   cy.wType(newCollectionLoc.post.pasteUrlInput, collectionContent.posts.data);

   cy.get(newCollectionLoc.post.pasteUrlButton).should('be.visible').click();
   //cy.wClick(newCollectionLoc.post.pasteUrlButton);

   cy.get(collectionLocators.collection.cardTitle).should('be.visible');
   
   cy.get(newCollectionLoc.doneButton).should('be.visible').click();
   //cy.wClick(newCollectionLoc.doneButton);

   cy.get(collectionLocators.collection.cardTitle).should('be.visible');
   cy.get('a.item-card').should('have.attr','href').and('include', 'youtube');

   cy.compareSnapshot('First Item',{errorThreshold: 0.1});
  });

  it('delete Collection', ()=>{
    cy.deleteCollection(newCollectionLoc);
    });

  // it('Delete collection',()=>{
  //   cy.wClick(newCollectionLoc.homeButton);
  //   cy.get(newCollectionLoc.optionsButton).should('be.visible');
  //   cy.compareSnapshot('Collection created on home page',{errorThreshold: 0.1})

  //   cy.get(newCollectionLoc.optionsButton).eq(0).click();
  //   cy.get(newCollectionLoc.options.deleteButton).eq(0).should('be.visible');
  //   cy.wCompareSnapshot(newCollectionLoc.options.deleteButton,'Collection Actions','0.1')

  //   cy.get(newCollectionLoc.options.deleteButton).eq(0).click({multiple: false});
  //   cy.get(newCollectionLoc.options.delete.deleteButton).should('be.visible');
  //   cy.get(newCollectionLoc.options.delete.deleteButton).click();
  // })
});