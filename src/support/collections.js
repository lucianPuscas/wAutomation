import * as collectionLocators from '../fixtures/locators/collection.json';
import * as collectionContent from '../fixtures/content/collection.json';
import * as newContent from '../fixtures/content/collectionContent.json';
 
const newCollectionLoc = collectionLocators.collection;
const settingsLocators = collectionLocators.settings;
const postLocators = collectionLocators.collection.post;
const newPostLoc = newContent.posts;

Cypress.Commands.add(
  'createCollection',
  (collectionObject, firstCollectionCreated = false) => {
    // Step One: Creat New Tile
    cy.wClick(collectionLocators.createCardTileButton);
    cy.wAssertDisplayed(newCollectionLoc.doneButton);
    cy.wAssertDisplayed(newCollectionLoc.privacyMenuDropdownButton);
    cy.wAssertDisplayed(newCollectionLoc.settingsButton);

    //Compare snapshots
 

    // Step Two: Enter Title
    cy.wTypeTextarea(newCollectionLoc.nameTextarea, collectionObject.title);
  
    // Step Three: Enter Description
    cy.wTypeTextarea(
      newCollectionLoc.descriptionTextarea,collectionObject.description);

    // Step Five: Privacy
    cy.changeCollectionPrivacy(collectionObject.visibility);

    // Step Six: Open Settings (IF Needed)
    if (
      collectionObject.sharing === true ||
      collectionObject.collaboration === true ||
      collectionObject.background === true
    ) {
      cy.wClick(newCollectionLoc.settingsButton).then(() => {
        cy.compareSnapshot('Settings','0.1')
      }
      );

      if (collectionObject.sharing === true) {
        cy.wClick(settingsLocators.sharing.copyToggle).then(() => {
          cy.compareSnapshot('Shering','0.1')
        }
        );
      }

      if (collectionObject.collaboration === true) {
        cy.wClick(settingsLocators.collaboration.contributorsEditingToggle).then(() => {
          cy.compareSnapshot('Collaboration','0.1')
        }
        );
      }
      cy.wClick(settingsLocators.closeIconButton);
    }

    // Step Four: Add Posts
    if (collectionObject.posts.length > 0) {
      collectionObject.posts.forEach((item) => {
        cy.log(`Add Post: ${item.type}...`);
        cy.addPost(item.type, item.data);
        cy.get(postLocators.addButton).eq(1).then(()=>{
          // cy.wait(2000);
          cy.compareSnapshot('First item','0.1');
      });
      });
    }
    cy.wClick(newCollectionLoc.doneButton);
    cy.wClick(newCollectionLoc.homeButton)
  }
);

    
Cypress.Commands.add('addPost', (postType, data) => {
  // Step One: Select Add Icon
  cy.addContentClick(0);
     // Step Two: Add Post Content
     switch (postType) {
      case 'url':
        cy.log(`Add ${postType} using data: ${data.url}...`);
        cy.wType(postLocators.pasteUrlInput, data.url);
        cy.wClick(postLocators.pasteUrlButton);
        break;
      case 'text':
        cy.log(`Add ${postType} using data: ${data.content}...`);
        cy.wClick(postLocators.textOption);
        cy.wClick(postLocators.textInput);
        cy.wType(postLocators.textInput, data.content);
        cy.wClick(postLocators.textDoneButton);
        break;
      case 'youtube':
        break;
      case 'tweets':
        break;
      case 'bookmarks':
        break;
      case 'image':
        break;
      case 'pdf':
        break;
      case 'googledrive':
        break;
      case 'onedrive':
        break;
      case 'video':
        break;
      default:
        break;
    }


 

  // Step Three: Assert Changed Saved
  // cy.assertChangesSaved();
});

Cypress.Commands.add('assertChangesSaved', () => {
  // Step One: Assert Correct Icon
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  // cy.wait(1000);
  cy.wAssertDisplayed(collectionLocators.collection.savedChangesIcon);

  // Step Two: Assert Changes Saved Text
  cy.wAssertContainsAndDisplayed(
    collectionLocators.collection.savedChangesText,
    collectionContent.changesSaved,
  );
});

Cypress.Commands.add('changeCollectionPrivacy', (privacyType) => {
  cy.wPaperMenu(
    collectionLocators.collection.privacyMenuDropdownButton,
    collectionLocators.collection.privacyOptions[privacyType.toLowerCase()],
  );
});

Cypress.Commands.add('deleteCollection', (collectonName) => {
  cy.wClick(collectionLocators.collection.optionsButton);
  cy.wClick(collectionLocators.collection.options.deleteButton);
  cy.wClick(collectionLocators.collection.options.delete.deleteButton);
});

Cypress.Commands.add('assertVisibility', (expectedOption) => {
  cy.get(collectionLocators.visibility, {
    includeShadowDom: true,
    timeout: 5000,
  })
    .should('not.have.attr', 'hidden')
    .and('have.attr', 'icon', `wakelet:${expectedOption.toLowerCase()}`)
    .and('be.visible');
});

Cypress.Commands.add('addContentClick', (position) => {
  cy.wClick(postLocators.addButton).eq(position);
});

Cypress.Commands.add('newAddPost', (data) => {
cy.addContentClick(0);
cy.wType(postLocators.pasteUrlInput, data.url);
cy.wClick(postLocators.pasteUrlButton);

});


Cypress.Commands.add('addCards', (cardTipe) => {
  // Step One: Select Add Icon
  cy.addContentClick(0);

  cy.wType(postLocators.pasteUrlInput, newPostLoc.data );
  cy.wClick(postLocators.pasteUrlButton);
     // Step Two: Add Post Content
     switch (cardTipe) {
      case 'url':
        cy.wType(postLocators.pasteUrlInput, newPostLoc.data );
        cy.wClick(postLocators.pasteUrlButton);
        break;
      case 'text':
        cy.wClick(postLocators.textOption);
        cy.wClick(postLocators.textInput);
        cy.wType(postLocators.textInput, data.content);
        cy.wClick(postLocators.textDoneButton);
        break;
      case 'youtube':
        break;
      case 'tweets':
        break;
      case 'bookmarks':
        break;
      case 'image':
        break;
      case 'pdf':
        break;
      case 'googledrive':
        break;
      case 'onedrive':
        break;
      case 'video':
        break;
      default:
        break;
    }

});