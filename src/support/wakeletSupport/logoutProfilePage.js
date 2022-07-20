

// New Wakelet page helper functions for Log out Profile page view ================================================================================


Cypress.Commands.add('wTestNewTabLinks',(nameLink,index,url)=>{
    cy.get(nameLink).eq(index).scrollIntoView()
      .should('be.visible')
      .should('have.attr','target','_blank')
    cy.get(nameLink).eq(index)
    .invoke('removeAttr', 'target')
    .click({force:true}).then(()=>{
        cy.url().should('contain',url)
        cy.get('body').should('be.visible')
        cy.go('back')
      })
  })
  
  
  Cypress.Commands.add('wTestShareQR',(qr,name,width)=>{

    cy.get('[data-testid="share-by-qr"]')
    .should('be.visible')
    .click()
    cy.contains('Share').should('be.visible')
    cy.get('[data-testid="qr-open-full"]')
    .should('have.attr','target','_self').then(($el)=>{
      cy.get($el,{timeout:5000})
      .invoke('removeAttr', 'target')
      .click()
      cy.url().should('contain',qr)
      cy.wCompareSnapshot(`${name}`,'viewport', 0.35) 
      cy.go('back')   
    }).then(()=>{
      switch(qr){
        case 'wakelet.com/@WebAutomation2/qr':
          if(width < 400){
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.get('[data-testid="share-by-qr"]')
            .should('be.visible')
            .click()  
          }
          else{
            cy.get('body').then(($el)=>{
              if($el.find('[data-testid="modal"]').not('exist')){
                cy.contains('Share')
                .should('be.visible')
                .click()
               cy.get('[data-testid="share-by-qr"]')
               .should('be.visible')
               .click()
              }
            })
          }
          break;
          default:
            if(width < 400){
              cy.get('[data-testid="wk-btn"]')
              .should('be.visible').click()
              cy.get('[data-testid="share-by-qr"]')
              .should('be.visible')
              .click()  
            }
            else{
              cy.get('body').then(($el)=>{
                if($el.find('[data-testid="modal"]').not('exist')){
                 cy.get('[data-testid="share-collection"]').click()
                 cy.get('[data-testid="share-by-qr"]')
                 .should('be.visible')
                 .click()
                }
              })
            }
            break;
        }
    })
  })
  
  
  Cypress.Commands.add('wTestShareProviders',(el,index,url)=>{
    cy.contains('Share')
    .should('be.visible')
    .click()
    cy.url().should('contain','#share')
    cy.get(el).eq(index)
    .should('be.visible')
    .should('have.attr','href').and('contain',url)
  })
  
  
  Cypress.Commands.add('wTestSectionsTitle',(name,viewport)=>{
    cy.get(`[data-testid='profile-section-heading']:contains(${name})`)
    .scrollIntoView({ offset: { top: -100, left: 0 } }).then(($el)=>{
      cy.get($el).should('be.visible')
    })
    cy.wCompareSnapshot(`Section ${name} ${viewport}`,'viewport',0.15)
  })
  
  
  
  // test open Collections url ... ...................................................................................................
  
  
  Cypress.Commands.add('testCollectionsOnPage',(col,nr)=>{
    cy.get(col).should('have.length', nr).each((el)=>{
      cy.wrap(el).scrollIntoView().should('be.visible')
      .invoke('attr','href').should('contain', '/wake/')
    })
  })
  
  
  Cypress.Commands.add('testOpenCollection',($elem,$index)=>{
    cy.get($elem).eq($index)
    .scrollIntoView()
    .should('be.visible')
    .invoke('attr','href')
    .then(($el)=>{
      cy.get($elem).eq($index)
      .invoke('removeAttr', 'target')
      .click()
      cy.url().should('contain',$el)
      cy.get('body').should('be.visible')  
    })
    cy.go('back')
  })
  
  Cypress.Commands.add('testSections',(name)=>{
    cy.get(`[data-testid="section-list-link"]:contains(${name})`)
    .scrollIntoView()
    .should('be.visible')
    .invoke('attr','href')
    .then(($el)=>{
      cy.get(`[data-testid="section-list-link"]:contains(${name})`)
      .click({force:true})
      cy.url().should('contain',$el)
      cy.get(`[data-testid="section-list-link"]:contains(${name})`)
    .scrollIntoView()
    .should('be.visible')
    })
  })
