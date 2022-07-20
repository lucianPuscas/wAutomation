import * as searchLocators from '../fixtures/locators/search';
import * as commonLocators from '../fixtures/locators/common';

Cypress.Commands.add(
  'searchFor',
  (
    searchTerm,
    expectedDefaultSearchType,
    changeSearchTypeTo,
    expectedResultDetails,
    startPosition,
    openResult,
  ) => {
    // Step One: Search for Search Term
    if (startPosition === 'header') {
      cy.wClick(commonLocators.header.search);
      cy.wType(commonLocators.header.searchInput, searchTerm);
      cy.wClick(commonLocators.header.searchIconButton);
    } else {
      cy.wType(searchLocators.searchInput, searchTerm);
    }

    // Step Two: Assert and/or Select Search Type (Collections or People)
    cy.wAssertContainsAndDisplayed(
      searchLocators.selectedSearchTypeButton,
      expectedDefaultSearchType,
    );
    if (expectedDefaultSearchType != changeSearchTypeTo) {
      cy.wClick(
        `${searchLocators.searchTypeButton}:contains(${changeSearchTypeTo})`,
      );
    }

    // Step Three: Assert/Click the Result Displayed
    cy.assertSearchResult(
      changeSearchTypeTo,
      expectedResultDetails,
      openResult,
    );
  },
);

Cypress.Commands.add(
  'assertSearchResult',
  (searchType, expectedResult, select) => {
    switch (searchType) {
      case 'Collections':
        cy.wAssertContainsAndDisplayed(
          searchLocators.collections.title,
          expectedResult.title,
        );
        if (expectedResult.items) {
          cy.wAssertContainsAndDisplayed(
            searchLocators.collections.items,
            expectedResult.items,
          );
        }
        if (expectedResult.createdBy) {
          cy.wAssertContainsAndDisplayed(
            searchLocators.collections.createdBy,
            expectedResult.createdBy,
          );
        }
        if (select) {
          cy.selectSearchResult(
            searchLocators.collections.title,
            expectedResult.title,
          );
        }
        break;
      case 'People':
        cy.wAssertContainsAndDisplayed(
          searchLocators.people.name,
          expectedResult.name,
        );
        cy.wAssertContainsAndDisplayed(
          searchLocators.people.username,
          expectedResult.username,
        );
        if (select) {
          cy.selectSearchResult(
            searchLocators.people.name,
            expectedResult.name,
          );
        }
        break;
      default:
        break;
    }
  },
);

Cypress.Commands.add('selectSearchResult', (resultLocator, targetText) => {
  cy.wClick(`${resultLocator}:contains(${targetText})`);
});
