
import * as collectionLocators from '../../fixtures/locators/collection.json';


const newCollectionLoc = collectionLocators.collection;

describe('Test new-web edit collection',()=>{

  let collectionId ='/wake/I_aquhv6O7IFs_6FVzf7K';
  let wakelet =`${Cypress.config().baseUrl}`;

  beforeEach(()=>{
    cy.loginAutomation('web-automation-2@wakelet.com','Test@123')
    cy.visit(collectionId)
    // cy.reload()

  })

  context('Test Collection Header',()=>{
  
    it('Test header Logo edit collection page',()=>{
      cy.getNewWeb().find('[data-testid="mainHeader"] a')
      .eq(0)
      .should('be.visible')
      .should('have.attr','href','/').then((el)=>{
        cy.get(el).click()
      })
      cy.url().should('contain',wakelet)
     // cy.wCompareSnapshot('Home profile page','viewport', 0.1)
      cy.contains('Collection-e2e-automation!!')
      .scrollIntoView()
      .should('be.visible')
      .click()
      cy.url().should('contain',collectionId)
    })
  
     it('Test header Search',()=>{
      cy.getNewWeb().find('[data-testid="search-bar-input"]')
      .should('be.visible')
      .type('Wakelet {enter}',{timeout:3000})
      cy.url().should('contain', '/search?q=Wakelet')
     // cy.wCompareSnapshot('Search wakelet page','viewport', 0.1)
  
    })
  
    it.skip('Test Explore edit collection page',()=>{
      cy.getNewWeb().find('a.Button-module__round___yK9WL').eq(0)
      .should('be.visible')
      .click()
      cy.url().should('contain','https://wakelet.com/explore')
     // cy.wCompareSnapshot('Explore page','viewport', 0.1)
    })
  
    it.skip('Test Classrooms edit collection page',()=>{
      cy.getNewWeb().find('a.Button-module__round___yK9WL',{timeout:60000}).eq(2)
      .should('be.visible')
      .click()
      cy.url().should('contain','wakelet.com/classrooms')
     // cy.wCompareSnapshot('Classroom page','viewport', 0.1)
    })
  
    it('Test header notifications',()=>{
      cy.getNewWeb().find('[data-testid="wk-dropdown-trigger"]',{timeout:60000})
      .should('be.visible')
      .click()
     // cy.wCompareSnapshot('Notifications open','viewport', 0.1)
    })
  
    it('Test Profile Settings edit collection page',()=>{
      cy.getNewWeb().find('[data-testid="btn-profile"]')
      .should('be.visible')
      .should('have.attr','data-state','closed')
      .click().then(()=>{
        cy.getNewWeb().find('[data-testid="btn-profile"]')
        .should('have.attr','data-state','open')
      })
      cy.getNewWeb().find('[data-testid="wk-text"]').eq(1)
      .scrollIntoView()
      .should('be.visible').and('contain','WebAutomation')
      .then(()=>{
      cy.wCompareSnapshot('Profile Settings dropdown','viewport', 0.1)
      })
  
    })
  
    it('Test Header Settings Public Profile',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','/@WebAutomation2',0)
    })
  
    it('Test Header Settings Account Settings',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','/settings',1)
    })
  
    it('Test Header Settings Switch Accounts',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','openid/switch-accounts',2)
    })
  
    it('Test Header Settings Log Out',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','wakelet.com',3)
    })
  
    it('Test Header Settings About Wakelet',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','/about',4)
    })
  
    it('Test Header Settings Join the Community',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','community.wakelet',5)
    })
  
    it('Test Header Settings Blog',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','blog.wakelet',6)
    })
  
    it.skip('Test Header Settings Help Center',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','help',7)
    })
  
    it('Test Header Settings Brand Guidelines',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','brand',8)
    })
  
    it('Test Header Settings Privacy and Terms',()=>{
      cy.wSettingsOption('[data-testid="wk-dropdown-item"]','privacy',9)
    })
  
  })

  context('Test Collection Settings menu ',()=>{
  
    it('Test Menu Settings collection',()=>{
      cy.getNewWeb().find('[data-testid="settings-btn"]')
      .should('be.visible')
      .click()
      cy.getNewWeb().find('[data-testid="drawer"]')
      .should('be.visible')
      cy.wCompareSnapshot('Collection Settings drawer','viewport', 0.1)
      cy.getNewWeb().find('[data-testid="drawer-close"]')
      .should('be.visible')
      .click().then(()=>{
        cy.getNewWeb().find('[data-testid="drawer-close"]')
        .should('not.exist')
      })
    })

    it('Test Copy collection dialog',()=>{
      cy.getNewWeb().find('[data-testid="settings-btn"]')
      .should('be.visible')
      .click()
      cy.getNewWeb().find('[data-testid="copy-button"]')
      .should('be.visible')
      .click()
     cy.wCompareSnapshot('Copy collection dialog','viewport', 0.3)
      cy.getNewWeb().find('[data-testid="change-space-copy"]')
      .should('be.visible').and('have.attr','title','Change')
      .click()
     cy.wCompareSnapshot('Copy collection Change space dialog','viewport', 0.3)
      cy.getNewWeb().find('[data-testid="wk-btn"]').eq(3)
      .should('be.visible').and('have.attr','title','Change space')
      .click().then(()=>{
        cy.getNewWeb().find('[data-testid="change-space-copy"]')
        .should('be.visible')
        cy.getNewWeb().find('[data-testid="change-space-copy"]')
        .should('be.visible').and('have.attr','title','Change')
        .click()
      })   
      cy.getNewWeb().find('#M5YCNMWcEgawaGGYkdlZ-')
      .should('be.visible').and('have.attr','data-state','unchecked')
      .click().then(()=>{
        cy.getNewWeb().find('[data-testid="wk-label"]').eq(4)
        .should('be.visible').and('contain','testSpaceAutomation')
      cy.wCompareSnapshot('Copy collection dialog change space','viewport', 0.3)
      })
        cy.getNewWeb().find('[data-testid="wk-btn"]').eq(4)
        .should('be.visible').and('have.attr','title','Copy')
        .click()
        .then(()=>{
          cy.visit('/spaces/M5YCNMWcEgawaGGYkdlZ-')
          cy.contains('Collection-e2e-automation!! (Copy)')
          .should('be.visible')
        })
    })

    it('Test Move collection dialog',()=>{
      cy.getNewWeb().find('[data-testid="settings-btn"]')
      .should('be.visible')
      .click()
      cy.getNewWeb().find('[data-testid="move-button"]')
      .should('be.visible')
      .click()
      cy.getNewWeb().find('[data-testid="collection-edit:move-collection-modal:move:button"]')
      .should('be.visible').and('be.disabled')
      cy.wCompareSnapshot('Move collection dialog','viewport', 0.1)
      cy.getNewWeb().find('#M5YCNMWcEgawaGGYkdlZ-')
      .should('be.visible').and('have.attr','data-state','unchecked')
      .click().then(($el)=>{
        cy.getNewWeb().find($el).should('have.attr','data-state','checked')
        cy.getNewWeb().find('[data-testid="collection-edit:move-collection-modal:move:button"]')
      .should('be.visible').and('not.be.disabled')
      cy.wCompareSnapshot('Move collection dialog change space','viewport', 0.1)
      })
      cy.getNewWeb().find('[data-testid="wk-dialog-close"]')
      .should('be.visible')
      .click().then(()=>{
          cy.getNewWeb().find('[data-testid="wk-dialog"]')
          .should('not.exist')
      })
    })

    it('Test Export as PDF',()=>{
      cy.getNewWeb().find('[data-testid="settings-btn"]')
        .should('be.visible')
        .click()
      cy.getNewWeb().find('[data-testid="pdf-export-button"]')
        .should('be.visible')
        .click().then(()=>{
        cy.getNewWeb().find('[data-testid="pdf-dialog"]')
          .should('be.visible')
        cy.wCompareSnapshot('PDF export collection dialog1','viewport', 0.1)
        })
      cy.getNewWeb().find('[data-testid="modal-accept"]')
        .should('be.visible')
        .click()
        .then(($el)=>{
          expect($el).to.not.exist
        cy.wCompareSnapshot('PDF export collection dialog2','viewport', 0.1)
        })
      cy.getNewWeb().find('[data-testid="pdf-download-link"]',{ timeout: 60000 })
        .should('be.visible').then(()=>{
          cy.wCompareSnapshot('Download PDF dialog','viewport', 0.1)    
        })
      cy.getNewWeb().find('[data-testid="pdf-dialog-close"]')
        .should('be.visible')
        .click().then(()=>{
          cy.getNewWeb().find('[data-testid="pdf-dialog"]')
            .should('not.exist')
        }) 
    })

// Delete test should work just after Copy collection test is passing 

    it('Test Delete collection',()=>{
      cy.visit('/spaces/M5YCNMWcEgawaGGYkdlZ-')
      cy.contains('Collection-e2e-automation!! (Copy)')
        .should('be.visible')
        .click()
        .then(()=>{
          cy.reload()
          cy.getNewWeb().find('[data-testid="settings-btn"]')
          .should('be.visible')
          .click()
          cy.getNewWeb().find('[data-testid="delete-button"]')
          .should('be.visible')
          .click().then(()=>{
            cy.getNewWeb().find('[data-testid="wk-alert"]')
              .should('be.visible')
            cy.wCompareSnapshot('Delete collection dialog','viewport', 0.3)  
          })
          cy.getNewWeb().find('[data-testid="wk-alert-action"]')
          .should('be.visible')
          .click().then(()=>{
            cy.visit('/spaces/M5YCNMWcEgawaGGYkdlZ-')
            cy.contains('Collection-e2e-automation!! (Copy)')
            .should('not.exist')
          })
        })
    })
  })

  context('Test Collection Design menu',()=>{
  
    it('Test Design menu sidebar',()=>{
      cy.getNewWeb().find('[data-testid="design-btn"]')
      .should('be.visible')
      .click()
      cy.getNewWeb().find('[data-testid="design-menu"]')
      .should('be.visible').then(()=>{
         cy.getNewWeb().find('button[aria-label="Media"]')
         .scrollIntoView().click()
       // cy.getNewWeb().find('main#content').invoke('hide')
      })
      cy.wCompareSnapshot('Test Collection  design menu','fullPage', 0.25)
    })




  })


})
