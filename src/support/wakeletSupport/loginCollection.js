
// New Wakelet page helper functions for log in Collection view new web  ================================================================================

    Cypress.Commands.add('wTestProfileSettings',($name)=>{
        cy.scrollTo('top',{duration:500})
        cy.getNewWeb().find('[data-testid="btn-profile"]',{timeout:60000})
        .should('be.visible')
        .click().then(()=>{
          switch($name){
            case 'AppleStore':
              cy.get('a.inline-flex').eq(2).should('be.visible')
              .click({force:true})
              cy.url().should('contain','apps.apple.com/gb/app/wakelet/')
              cy.go('back')
              break;
            case 'GooglePlay':
              cy.get('a.inline-flex').eq(3).should('be.visible')
              .click({force:true})
              cy.url().should('contain','play.google.com/store/apps/details?id=com.wakelet')
              cy.go('back')
              break;
            case 'AmazonApp':
              cy.get('a.inline-flex').eq(4).should('be.visible')
              .click({force:true})
              cy.url().should('contain','amazon.com/Wakelet/dp/B08DJ5Z367')
              cy.go('back')
              break; 
            default:
              cy.contains($name).should('be.visible');
              break;
              
          }
        })  
      })
    


    // Cypress.Commands.add('wTestDropdown',($name,$url)=>{
    //   cy.contains($name).should('be.visible')
    //   .click()
    //   cy.url().should('contain',$url)
    //   cy.go('back')
    // })

    Cypress.Commands.add(('wSettingsOption'),($link,$url,$i)=>{
      cy.getNewWeb().find('[data-testid="share-invite-button"]')
      .should('be.visible')
      cy.getNewWeb().find('[data-testid="btn-profile"]')
      .should('be.visible')
      .invoke('attr','data-state')
      .then(($el)=>{
        if($el == 'closed'){
          cy.getNewWeb().find('[data-testid="btn-profile"]',{timeout:60000})
          .click({force:true})
        }
        cy.getNewWeb().find('[data-testid="btn-profile"]')
        .should('have.attr','data-state','open')
        cy.getNewWeb().find($link,{timeout:60000})
        .eq($i)
        .should('be.visible')
        .click({force:true})
        cy.url().should('contain',$url)
         //   // add screenshot function 'optional'  
      })   
    })