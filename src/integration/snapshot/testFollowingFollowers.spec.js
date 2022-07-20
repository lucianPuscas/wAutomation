import * as homepageLocators from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/common.json';
import * as collectionLocators from '/Users/lucianpuscas/Documents/e2eWakelet/web-automation/src/fixtures/locators/collection.json';
const newCollectionLoc = collectionLocators.collection;


// Test fixed and ready for lounch
// RunUpdateSnapshots:  yarn update-snapshots:dev --spec "src/integration/snapshot/testFollowingFollowers.spec.js"
// RunTest:   yarn test:snapshot:dev --spec "src/integration/snapshot/testFollowingFollowers.spec.js"

describe.skip('Following Followars page', ()=>{

  before(()=>{
    cy.newLogin('collections-login');
  });

it('Test following page',()=>{

  cy.get(collectionLocators.collection.cookiesBanner).then((cookiesBanner)=>{
    if(cookiesBanner, true){
    cy.get(collectionLocators.collection.cookiesBanner).click({force:true, multiple:true });
    }
  });

  cy.get(homepageLocators.header.followingPage).should('be.visible').click();
  cy.get(homepageLocators.header.noFollowingImg).should('be.visible');
  cy.compareSnapshot('Following page',{errorThreshold: 0.1});

  cy.get(homepageLocators.header.findUsersToFollow).should('be.visible').click();
  cy.url().should('include','/explore');

  const getIframeBody = () => {
    
    return cy
    .get('#exploreiframe')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
  };
  getIframeBody().find('img.col').eq(2).should('be.visible');

  cy.compareSnapshot('Explore page',{errorThreshold: 0.1 });
  });

  

  it('Test followers page',()=>{

    // cy.get(newCollectionLoc.homeButton).should('be.visible').click();
    cy.get(homepageLocators.header.followersPage).should('be.visible').click();
    cy.get(homepageLocators.header.noFollowersImg).should('be.visible');
    cy.compareSnapshot('Followers page',{errorThreshold: 0.1});


    cy.get(homepageLocators.header.goToCollection).should('be.visible').click();

    cy.url().should('include','/home/followers');
    cy.compareSnapshot('Home page',{errorThreshold: 0.1});
  })
});
  