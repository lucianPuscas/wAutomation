import * as col from '../../fixtures/locators/logoutCollectionData.json';

  // New Wakelet page helper functions for Log out Collection view ================================================================================

Cypress.Commands.add('getIframeBody', () => {
    return cy.get('[data-testid="embed-dialog"] iframe')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
  })
  
  
  Cypress.Commands.add('wTestFooterLinks',(nameLink,url)=>{
    cy.contains(nameLink,{timeout:5000}).scrollIntoView()
      .should('be.visible')
      .should('have.attr','href',url)
      .click({force:true}).then(()=>{
          cy.get('body',{timeout:2000}).should('be.visible')
          cy.url().should('contain',url)
          cy.go('back')
          })
  })
  
  Cypress.Commands.add('wTestFooterSocialLinksOpen',(index,socialLink)=>{
    cy.get('footer div.space-x-4.mt-2 a',{timeout:5000}).eq(index).scrollIntoView()
    .should('be.visible')
    .should('have.attr','href',socialLink)
    .invoke('attr','href')
    .then(($el)=>{
      cy.get('footer div.space-x-4.mt-2 a').eq(index)
      .invoke('removeAttr','target')
      .click()
      cy.url().should('contain',$el)
      cy.get('body').should('be.visible')
    })
    cy.go('back')   
  })
  
  
  Cypress.Commands.add('wTestFooterSocialLinks',(index,socialLink)=>{
      cy.get('footer div.space-x-4.mt-2 a',{timeout:5000}).eq(index).scrollIntoView()
      .should('be.visible')
      .should('have.attr','href',socialLink)   
  })
  
  Cypress.Commands.add('wOpenShareDialog',(sel)=>{
    cy.get(sel)
    .should('be.visible')
    .click()
    cy.contains('Share')
    .should('be.visible')
    cy.contains('Embed link')
    .should('be.visible')
  })
  
  Cypress.Commands.add('wTestEmbedCollection',(sel)=>{
    cy.get(sel)
    .should('be.visible')
    .click()
    cy.get('[data-testid="embed-dialog"] iframe')
    .should('be.visible')
    .should('have.attr','src').and('contain','embed.wakelet.com/wakes/BHO5fXJTX323dFAjNlhIJ')
  })
  
  Cypress.Commands.add('wTestShareCollectionProviders',(el,index,url)=>{
    cy.get('[data-testid="share-collection"]')
    .should('be.visible')
    .click()
    cy.url().should('contain','#share')
    cy.get(el).eq(index)
    .should('be.visible')
    .should('have.attr','href').and('contain',url)
  })
  
  // Reactions testing functions ==============================================================================================
  
  Cypress.Commands.add('wTestCollectinReactionDialog',(index)=>{
    cy.get('[data-testid="reaction-list"]',{timeout:3000}).eq(index).scrollIntoView()
    .should('be.visible')
    .click()
    cy.contains('Reactions',{timeout:4000}).should('be.visible')
  })
  
  Cypress.Commands.add('wTestCardReactionDialog',(index)=>{
    cy.get('div.mb-8',{timeout:4000}).eq(0).scrollIntoView()
    cy.get('[data-testid="reaction-list"]',{timeout:4000}).its('length')
    .should('be.gte', 3)
    .then(()=>{
      cy.get('[data-testid="reaction-list"]',{timeout:4000}).eq(index).scrollIntoView()
    .should('be.visible')
    .click()
    })
    cy.get('[data-testid="wk-dialog"]').should('be.visible')
  })
  
  Cypress.Commands.add('wTestReactionPrivateUser',(user,name)=>{
    cy.get(user,{timeout:4000})
    .scrollIntoView()
    .should('be.visible').click().then(()=>{
      cy.contains(name,{timeout:4000}).should('be.visible')
    })
  })
  
  Cypress.Commands.add('wTestCollectionReactionPublicUser',(reaction,name,handle,view)=>{
    cy.get(reaction,{timeout:4000})
    .scrollIntoView()
    .should('be.visible').click().then(()=>{
      cy.contains(name,{timeout:4000}).should('be.visible')
      cy.get('[data-testid="reaction-visit-profile-button"]')
      .should('be.visible')
      .and('have.attr','href',handle).then(()=>{
        cy.get('[data-testid="reaction-visit-profile-button"]:visible')
        .invoke('removeAttr','target')
      }) 
      cy.contains('Visit Profile')
      .click()
      cy.url().should('contain',handle)
      cy.go('back').then(()=>{
        if(view < 400){
          cy.wTestCollectinReactionDialog(1)
        }
        else{
          cy.wTestCollectinReactionDialog(0)
        }
      })
    })
  })
  
  Cypress.Commands.add('wTestCardReactionPublicUser',(reaction,name,handle)=>{
    cy.get(reaction,{timeout:10000})
    .scrollIntoView()
    .should('be.visible').click()
    cy.contains(name,{timeout:10000}).should('be.visible')
    cy.get('[data-testid="reaction-visit-profile-button"]',{timeout:10000})
    .should('have.length','1')
    .invoke('removeAttr','target')
    .click()
    cy.url().should('contain',handle)
    cy.go('back') 
    cy.wTestCardReactionDialog(2)
  })
  
  
  // ReadMode testing functions on web ================================================================================================
  
  Cypress.Commands.add('wNextPage',(direction)=>{
    cy.get(direction)
    .should('be.visible')
    .should('not.be.disabled')
    .click()
  })
  
  Cypress.Commands.add('wTestNextPrevious',(next , previous)=>{
    cy.get(previous)
    .should('be.visible')
    .should('be.disabled').then(()=>{
        cy.wNextPage(next).then(()=>{
            cy.get(previous)
            .should('be.visible')
            .should('not.be.disabled')
        })  
    })
  })
  
  Cypress.Commands.add('wTestImageCard',(sel)=>{
    cy.get(sel).eq(0)
    .should('be.visible').click()
    cy.get('[data-slide-index="2"]')
    .should('be.visible')
  
  })
  
  
  Cypress.Commands.add('wTestReadModeCollectionItem', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','href').and('contain',url)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  
  Cypress.Commands.add('wTestReadModeTweet', (sel,id)=>{
    cy.get(sel)
    .should('be.visible',{timeout:10000})
    .should('have.attr','data-tweet-id', id)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('equal','https://twitter.com/TxTechChick/status/' + id)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeSpark', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src', url + '/embed')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href', url)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeGDrive',(url)=>{
    cy.contains('Immersive Reader')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href', url)
    cy.contains('Logged Out View changes').should('be.visible')
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeText',(sel,txt)=>{
    cy.contains('Immersive Reader')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('not.exist')
    cy.get(sel)
    .should('be.visible')
    .should('contain',txt)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeYoutube', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src').and('contain',url)
    cy.get(col.collectionData.readModeButtons.viewOnYoutube)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain','W0M5vydkJzc')
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModePdf',(sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','target','_blank')
    //is broken on web
   // .should('have.attr','href').and('contain',url)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeFlipgrid', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src').and('contain',url)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href', url)
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeOneDrive',(url)=>{
    cy.contains('Immersive Reader')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href', url)
    cy.contains('Screenrecorder-2021-07-09-17-56-53-13.mp4').should('be.visible')
    cy.wNextPage(col.collectionData.readModeButtons.next)
  })
  
  Cypress.Commands.add('wTestReadModeLinks',(url)=>{
    cy.contains('Immersive Reader')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href', url)
    cy.contains('B. Max Mehl - Wikipedia')
    .should('be.visible')
       // should be fixed after readmode refactor
    // .then(()=>{
    //   cy.get('.TextContent_content__ZxkbE a').eq(102)
    //   .scrollIntoView()
    //   .should('be.visible')
    // })
  
    cy.wNextPage(col.collectionData.readModeButtons.next)
    cy.get('[data-slide-index="10"]')
    .should('be.visible').click()
    cy.contains('B. Max Mehl')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.closeReader).eq(2)
    .should('be.visible')
    .should('not.be.disabled').click()
    cy.contains('testSpaceAuto')
    .should('be.visible')
  })
  
  // ReadMode testing functions on web-mobile ================================================================================================
  
  
  Cypress.Commands.add('wNextPageMobile',(index)=>{
    cy.get(`[data-slide-index=${index}]`)
    .click({force: true}).then((el)=>{
      cy.get(el)
      .should('be.visible')
      .should('not.be.disabled')
    })
  })
  
  Cypress.Commands.add('wTestReadModeCollectionItemMobile', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','href').and('contain',url)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.wNextPageMobile(2)
  })
  
  Cypress.Commands.add('wTestReadModeTweetMobile', (sel,id)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','data-tweet-id', id)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('equal','https://twitter.com/TxTechChick/status/' + id)
    cy.wNextPageMobile(3)
  })
  
  Cypress.Commands.add('wTestReadModeSparkMobile', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src', url + '/embed')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.wNextPageMobile(4)
  })
  
  Cypress.Commands.add('wTestReadModeGDriveMobile',(url)=>{
    cy.get('[title="Immersive Reader"]')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.contains('Logged Out View changes').should('be.visible')
    cy.wNextPageMobile(5)
  })
  
  Cypress.Commands.add('wTestReadModeTextMobile',(sel,txt)=>{
    cy.get('[title="Immersive Reader"]')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('not.exist')
    cy.get(sel)
    .should('be.visible')
    .should('contain',txt)
    cy.wNextPageMobile(6)
  })
  
  Cypress.Commands.add('wTestReadModeYoutubeMobile', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src').and('contain',url)
    cy.get(col.collectionData.readModeButtons.viewOnYoutube)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain','W0M5vydkJzc')
    cy.wNextPageMobile(7)
  })
  
  Cypress.Commands.add('wTestReadModePdfMobile',(sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','target','_blank')
      //is broken on web
   //.should('have.attr','href').and('contain',url)
    cy.wNextPageMobile(8)
  })
  
  Cypress.Commands.add('wTestReadModeFlipgridMobile', (sel,url)=>{
    cy.get(sel)
    .should('be.visible')
    .should('have.attr','src').and('contain',url)
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.wNextPageMobile(9)
  })
  
  Cypress.Commands.add('wTestReadModeOneDriveMobile',(url)=>{
    cy.get('[title="Immersive Reader"]')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href').and('contain',url)
    cy.contains('Screenrecorder-2021-07-09-17-56-53-13.mp4').should('be.visible')
    cy.wNextPageMobile(10)
  })
  
  Cypress.Commands.add('wTestReadModeLinksMobile',(url)=>{
    cy.get('[title="Immersive Reader"]')
    .should('be.visible')
    cy.get(col.collectionData.readModeButtons.visitOriginal)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.attr','target','_blank')
    .should('have.attr','href')
    cy.contains('B. Max Mehl - Wikipedia')
    .should('be.visible')
     // should be fixed after readmode refactor
    // .then(()=>{
    //   cy.get('.TextContent_content__ZxkbE a').eq(102)
    //   .scrollIntoView()
    //   .should('be.visible')
    //})
    cy.get('[title="Close Reader"]')
    .should('be.visible')
    .should('not.be.disabled')
    .click()
  
  })

  Cypress.Commands.add('wRemoveCookie',()=>{
    cy.get('body').then(($body)=>{
      if($body.find('[data-testid="dismissible-banner"]',{timeout:4000}).is(':visible')){
        cy.get('[data-testid="dismissible-banner-dismiss"]',{timeout:20000}).should('be.visible').click()
        cy.get('[data-testid="dismissible-banner"]').should('not.exist') 
      }   
    })
  })
  
  
  