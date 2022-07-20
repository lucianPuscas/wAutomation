
import * as col from '../../fixtures/locators/logoutCollectionData.json';
const providers = col.collectionData.shareProvidersUrl;
const social = col.collectionData.footerSocialLinks;
const items = col.collectionData.pageItems;
const readMode =col.collectionData;


describe('Test collection logout view',()=>{

    let wakelet ='https://wakelet.com';
    let collectionId ='/wake/BHO5fXJTX323dFAjNlhIJ';
    let collectionTitle ='TestNewCollection';

    before(()=>{
        cy.clearLocalStorage()
    })

    context('Test collection media view',()=>{

        beforeEach(()=>{
            cy.visit(collectionId)
           // cy.reload()  
        })

        it('Test collection header',()=>{
            
            cy.get('[data-testid="header-loggedout"] a')
            .should('be.visible')
            .should('have.attr','href',wakelet)
            .click()
            cy.url().should('contain','wakelet.com')
            cy.get('header.hero__header').should('be.visible')
            cy.wCompareSnapshot('Wakelet Homepage','viewport', 0.1) 
            cy.go('back')  
        })

        // it('Test Login and Sign up buttons',()=>{

        //     cy.get('[data-testid="login-button"]')
        //     .should('be.visible')
        //     .click().then(()=>{
        //         cy.debug()
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/')
        //         })
        //     })
        //    // cy.wCompareSnapshot('Log into Wakelet','viewport', 0.0)
        //    // cy.compareSnapshot('Log into Wakelet')
        //     cy.go('back')
        //     cy.get('[data-testid="signup-button"]')
        //     .should('be.visible')
        //     .click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/openid/signup')
        //         })
        //     })
        //    // cy.wCompareSnapshot('Get started','viewport', 0.0)
        //     //cy.compareSnapshot('Get started')
        //     cy.go('back')
        // })

        it('Test title and description',()=>{

            cy.contains(collectionTitle).should('be.visible')
            cy.get('[data-testid="wk-caption"]').eq(1).should(($span)=>{
                expect($span).to.contain('15 items')
            })
            cy.get('[data-testid="wk-h1"]').should('be.visible')
            cy.get('h1').then(($h1)=>{
            cy.scrollTo('top')
            cy.get($h1)
            .should('be.visible')
            .should('contain',collectionTitle)
            
            cy.wCompareSnapshot('Title and Description','viewport', 0.1)
           // cy.compareSnapshot('Title and Description',{errorThreshold: 0.1})
            })
        })

        it('Test Profile journey',()=>{

            cy.get('[data-testid="profile-link"]')
            .should('have.attr','href','/@testNewSpace3668').then((el)=>{
                cy.get(el).invoke('removeAttr','target')
                .click()
            })
            cy.url({timeout:3000}).should('contain','/@testNewSpace3668').then(()=>{
                cy.get('[data-testid="profile-cover-image"]')
                .should('be.visible')
            })    
            cy.go('back')
        })

        it('Test Follow journey',()=>{

            cy.get('a.Button-module__round___yK9WL').should('be.visible').then(($el)=>{
                expect($el).to.contain('Follow')
            }).invoke('removeAttr','target').click()
            cy.url().should('contain',col.collectionData.signupPage)
            cy.go('back')
        })

        it('Test share dialog',()=>{

            cy.get('[data-testid="share-collection"]')
            .should('be.visible')
            .click()
            cy.wScreenshotDialog('Share dialog','viewport', 0.1)
            cy.contains('Share link',{timeout:2000})
            .should('be.visible')
            cy.get('[data-testid="share-options"] button',{tiomeout:2000}).eq(0)
            .click({force:true})
            cy.contains('Copied').should('be.visible')
        })

        it('Test share QR code',()=>{
            cy.get('[data-testid="share-collection"]')
            .should('be.visible')
            .click()
            cy.wTestShareQR(providers.qr,'QR code full page','1440') 
            cy.wScreenshotDialog('QR code dialog','viewport', 0.15)
           // cy.wCompareSnapshot('QR code dialog','viewport', 0.15)
            cy.get('[data-testid="wk-dialog-close"]').should('be.visible')
            .click().then(()=>{
                cy.get('div#radix-2.Dialog-module__window___pn7eq').should('not.exist')
            })
            
        })

        it('Test Embed collection',()=>{

            cy.wOpenShareDialog('[data-testid="share-collection"]')
            cy.wTestEmbedCollection('[data-testid="share-by-embed"]')

            cy.getIframeBody().find('h1').should('be.visible').and('contain','TestNewCollection')
            cy.getIframeBody().find('#9dJvmooLotmt1JuJVAqMm',{tiomeout:5000}).scrollIntoView().should('be.visible')
            .should('have.attr','target','_blank')

            cy.get('[data-testid="embed-copy-code"]')
            .scrollIntoView()
            .should('be.visible').and('contain','Copy Embed Code')

            cy.wScreenshotDialog('Embed dialog','viewport', 0.1)
            // cy.wCompareSnapshot('Embed dialog','viewport', 0.15)

            cy.get('[data-testid="wk-dialog-close"]').should('be.visible')
            .click().then(()=>{
                cy.get('[data-testid="share-by-embed"]').should('not.exist')
            })  
        })

        it('Test share with Classroom',()=>{

            cy.get('[data-testid="share-collection"]')
            .should('be.visible')
            .click()
            cy.contains('Classroom')
            .should('be.visible')
            cy.get('#___sharetoclassroom_0 iframe')
            .should(($iframe)=>{
                const s = $iframe.attr('src')
                expect(s).to.contains(providers.classrooms)
            })
        })


        it('Test share with Teams',()=>{

            cy.get('[data-testid="share-collection"]')
            .should('be.visible')
            .click()
            cy.contains('Teams').should('be.visible')   
            cy.get('[data-testid="teams-app-link"]')
            .should('have.attr','href').and('contain',providers.teams)
            cy.get('[data-testid="teams-app-link"]',{timeout:5000})
            .invoke('removeAttr', 'target')
            .click()
            cy.url().should('contain',providers.teams)
            cy.go('back')

           // cy.wTestShareCollectionProviders('a.ShareButton_sharebutton__MFXji',2,providers.teams)  
        })


        it('Test Save to Bookmarks  ',()=>{

            cy.get('[data-testid="more-actions"]')
            .should('be.visible').click()
            cy.contains('Save to bookmarks')
            .should('be.visible').click({force:true})
            cy.url().should('contain',col.collectionData.signupPage)
            cy.go('back')
        }) 

        it('Test Export as PDF',()=>{

            cy.get('[data-testid="more-actions"]')
            .should('be.visible').click()
            cy.contains('Export as PDF')
            .should('be.visible')
            .click({force:true}) 
            cy.contains('PDF Export')
            .should('be.visible')
            cy.wScreenshotDialog('PDF export collection dialog1','viewport', 0.1)
               // cy.wCompareSnapshot('PDF export collection dialog1','viewport', 0.1)      
            cy.get('[data-testid="modal-close"]')
            .should('be.visible')
            cy.get('[data-testid="modal-accept"]')
            .click({force:true})
            cy.contains('Exporting PDF')
            .should('be.visible')
            cy.wScreenshotDialog('PDF export collection dialog2','viewport', 0.1)
           // cy.wCompareSnapshot('PDF export collection dialog2','viewport', 0.15)
           
           cy.contains('PDF exported successfully!', { timeout: 60000 })
            .should('be.visible').then(()=>{
            cy.wScreenshotDialog('Download PDF dialog','viewport', 0.1)
               // cy.wCompareSnapshot('Download PDF dialog','viewport', 0.15)
            })
            cy.get('[data-testid="pdf-dialog-close"]')
            .should('be.visible')
            .click({force:true})
            cy.get('[data-testid="export-pdf-action"]').should('not.exist')

        })

        it('Test reactions summary on collection',()=>{
        
            cy.wTestCollectinReactionDialog(0)
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-1"]','Andrei')
            cy.wTestCollectionReactionPublicUser('[data-testid="reaction-tab-2"]','WebAutomation','/@WebAutomation2','1440')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-3"]','Anonymous User3')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-4"]','Anonymous User2')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-5"]','Anonymous User1')
            cy.get('[data-testid="reaction-tab-0"]').should('be.visible').click().then(()=>{
                cy.contains('Anonymous User1').should('be.visible')
                cy.contains('Anonymous User2').should('be.visible')
                cy.contains('Anonymous User3').should('be.visible')
                cy.contains('WebAutomation').should('be.visible')
                cy.contains('Andrei').should('be.visible')
            })

            cy.wScreenshotDialog('Summary reactions','viewport', 0.1)
           // cy.wCompareSnapshot('Summary reactions','viewport', 0.1)   
            cy.get('[data-testid="wk-dialog-close"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="wk-dialog"]').should('not.exist')
        })

        it('Test reactions summary on cards',()=>{

            cy.wTestCardReactionDialog(2)
            cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-1"]','WebAutomation','/@WebAutomation2')
            cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-2"]','Lucian','/@LucianTeacher2')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-3"]','Anon User3')
            cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-4"]','Lucian Puscas','/@LucianPuscas')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-5"]','TestUser1')
            cy.get('[data-testid="reaction-tab-0"]').should('be.visible').click().then(()=>{
                cy.contains('WebAutomation').should('be.visible')
                cy.contains('Lucian').should('be.visible')
                cy.contains('Anon User3').should('be.visible')
                cy.contains('Lucian Puscas').should('be.visible')
                cy.contains('TestUser1').should('be.visible')
            })
            cy.wScreenshotDialog('Summary reactions on cards','viewport', 0.1)
           // cy.wCompareSnapshot('Summary reactions on cards','viewport', 0.1)
            cy.get('[data-testid="wk-dialog-close"]')
            .should('be.visible')
            .click()
            cy.get('[data-testid="wk-dialog"]').should('not.exist')
        })

        it('Test Read mode',()=>{

            cy.wTestImageCard(items.imageCard)
            cy.wCompareSnapshot('Read mode image','viewport', 0.1)
           // cy.compareSnapshot('Read mode image',{ timeout:2000, errorThreshold: 0.1}) 
            cy.wTestNextPrevious(readMode.readModeButtons.next,readMode.readModeButtons.previeus)
            cy.wTestReadModeCollectionItem(readMode.readModeData.collectionItem ,'/cgUomSOXloZNXxtkZGYEJ')        
            cy.wTestReadModeTweet(readMode.readModeData.twitterItem , readMode.readModeData.twitterId)
            cy.wTestReadModeSpark(readMode.readModeData.sparkItem , readMode.readModeData.sparkUrl)
            cy.wTestReadModeGDrive(readMode.readModeData.gDriveUrl)
            cy.wTestReadModeText(readMode.readModeData.textItem , readMode.readModeData.text)
            cy.wTestReadModeYoutube(readMode.readModeData.youtubeItem , readMode.readModeData.youtubeUrl)
            cy.wTestReadModePdf(readMode.readModeData.pdfItem ,readMode.readModeData.pdfUrl)
            cy.wTestReadModeFlipgrid(readMode.readModeData.flipgridItem , readMode.readModeData.flipgridUrl)
            cy.wTestReadModeOneDrive(readMode.readModeData.OneDriveUrl)
            cy.wTestReadModeLinks(readMode.readModeData.linksUrl)
        })

        it('Test read mode icon',()=>{

            cy.get('[data-testid="read-mode-button"]').each((el)=>{
                cy.wrap(el,{timeout:2000}).scrollIntoView({duration:1000}).should('be.visible')
                .click({timeout:2000})
                cy.get('#readmode').should('be.visible')
                cy.get('div.swiper-container').eq(0).should('be.visible')
                cy.get('[data-testid="wk-btn"]').eq(1).should('be.visible')
                .click({timeout:2000}) 
            })
            cy.get('[data-testid="read-mode-button"]').should('have.length', '15')
        })


        it('Test loading-spinner and items pagination ',()=>{

            cy.get('div.mb-8',{timeout:5000}).eq(11).scrollIntoView({duration:2000}).should('be.visible')
            cy.get('[data-testid="loading-spinner"]').should('be.visible')
            cy.get('footer').scrollIntoView({duration:2000})
            cy.get('div.mb-8',{timeout:5000}).eq(14).scrollIntoView({duration:2000})
            .then(()=>{
                cy.get('[data-testid="wk-card-body"]',{timeout:5000}).eq(14)
                .should('be.visible')
                .should('contain','Hall of Fame') 
                cy.get('[data-testid="loading-spinner"]',{timeout:60000}).should('not.exist')     
            })     
        })

        it('Test footer links',()=>{

            cy.wTestFooterLinks('About','/about')
            cy.wTestFooterLinks('Features','https://features.wakelet.com')
            cy.wTestFooterLinks('Apps','/apps')
            cy.wTestFooterLinks('Browser Extension','/extensions')
            cy.wTestFooterLinks('Help Center','https://help.wakelet.com')
            cy.wTestFooterLinks('Community','https://community.wakelet.com')
            cy.wTestFooterLinks('Blog','https://blog.wakelet.com')
            cy.wTestFooterLinks('Terms','/terms.html')
            cy.wTestFooterLinks('Privacy','/privacy.html')
            cy.wTestFooterLinks('Rules','/rules.html')
        })

        it('Test cookie banner', () => {

            cy.get('[data-testid="dismissible-banner"]').contains('Wakelet uses')
            .should('be.visible')
            cy.get('[data-testid="dismissible-banner"] a').should('have.attr','href',wakelet +'/privacy.html')
            .invoke('removeAttr','target')
            .click().then(()=>{
                cy.url().should('contain','/privacy.html')
                cy.go('back')
            })
            cy.get('[data-testid="dismissible-banner-dismiss"]').should('be.visible').click();
            cy.get('[data-testid="dismissible-banner"]').should('not.exist');
        })

        it('Test footer social links',()=>{

            cy.contains('Copyright 2021 Wakelet Limited.').scrollIntoView({duration: 5000}).then((el)=>{
                cy.get(el,{timeout:5000}).scrollIntoView({duration: 5000}).should('be.visible')
                cy.get('footer img').scrollIntoView({duration: 3000}).should('be.visible')
            })    
            cy.wTestFooterSocialLinks(0,social.youtube)
            cy.wTestFooterSocialLinks(1,social.twitter)
            cy.wTestFooterSocialLinks(2,social.facebook)
            cy.wTestFooterSocialLinks(3,social.instagram)
            cy.compareSnapshot('Collection footer',{errorThreshold: 0.1})     
        })
    })

    context('Test logout collection on web-mobile view',()=>{

        beforeEach(()=>{
            cy.viewport(375,667)
            cy.visit(collectionId)
            // cy.reload()

        })

        it('Test web-mobile collection header',()=>{

            cy.get('[data-testid="header-loggedout"] a')
            .should('be.visible')
            .should('have.attr','href',wakelet)
            .click()
            cy.url().should('contain','wakelet.com')
            cy.get('header.hero__header').should('be.visible')
            cy.wCompareSnapshot('Wakelet Homepage web-mobile','viewport', 0.0) 
            cy.go('back') 
           
        })

        // it.skip('Test web-mobile Login and Sign up buttons',()=>{
        //     cy.get('[data-testid="login-button"]')
        //     .should('be.visible')
        //     .invoke('removeAttr','target').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/')
            
        //         })
        //     })  
        //    // cy.wCompareSnapshot('Log into Wakelet web-mobile','viewport', 0.0)
        //    // cy.compareSnapshot('Log into Wakelet web-mobile')
        //     cy.go('back')
        //     cy.get('[data-testid="signup-button"]')
        //     .should('be.visible')
        //     .invoke('removeAttr','target').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/openid/signup')         
        //         })
        //     })
        //    // cy.wCompareSnapshot('Get started web-mobile','viewport', 0.0)
        //    // cy.compareSnapshot('Get started web-mobile')
        //     cy.go('back')
        // })

        it('Test web-mobile title and description',()=>{

            cy.contains(collectionTitle).should('be.visible')
            cy.get('[data-testid="wk-caption"]').eq(3).should(($span)=>{
                expect($span).to.contain('15 items')
            })
            cy.get('[data-testid="wk-h1"]').should('be.visible')
            cy.get('h1').then(($h1)=>{
            cy.scrollTo('top')
            cy.get($h1)
            .should('be.visible')
            .should('contain',collectionTitle)
            cy.wCompareSnapshot('Title and Description web-mobile','viewport', 0.05)
           // cy.compareSnapshot('Title and Description web-mobile',{errorThreshold: 0.1})
            })
        })

        it('Test Profile journey web-mobile ',()=>{

            cy.get('[data-testid="profile-link"]')
            .should('have.attr','href','/@testNewSpace3668').then((el)=>{
                cy.get(el).invoke('removeAttr','target')
                .click()
            })
            cy.url().should('contain','/@testNewSpace3668').then(()=>{
                cy.contains('testSpaceAutomation')
                .should('be.visible')
            })
            cy.wCompareSnapshot('Profile page web-mobile','viewport', 0.1)
           // cy.compareSnapshot('Profile page web-mobile',{timeout: 2000 , errorThreshold: 0.1})
            cy.go('back')
        })

        it('Test Follow journey web-mobile',()=>{

            cy.get('a.Button-module__round___yK9WL')
            .should('be.visible')
            .then(($el)=>{
                expect($el).to.contain('Follow')
                cy.get($el)
                .invoke('removeAttr','target')
                .click()
            })
            cy.url().should('contain',col.collectionData.signupPage)
            cy.go('back')
        })

        it('Test share dialog web-mobile',()=>{

            cy.get('[data-testid="wk-btn"]')
            .should('be.visible').click()
            
            cy.wCompareSnapshot('Share dialog web-mobile','viewport', 0.1)
            cy.contains('Share link',{timeout:2000})
            .should('be.visible')
            .click()
            cy.get('[data-testid="share-options"] button',{tiomeout:2000}).eq(0)
            .click({force:true})
            cy.contains('Copied').should('be.visible')      
        })

        it('Test share QR code web-mobile',()=>{

            cy.get('[data-testid="wk-btn"]')
            .should('be.visible').click()
            cy.contains('QR code').should('be.visible')
            cy.wTestShareQR(providers.qr,'QR code full page mobile','375')
            cy.wCompareSnapshot('QR code dialog web-mobile','viewport', 0.3)
           // cy.compareSnapshot('QR code dialog web-mobile',{errorThreshold: 0.1})
           cy.get('[data-testid="wk-dialog-close"]').should('be.visible')
           .click().then(()=>{
               cy.get('div#radix-2.Dialog-module__window___pn7eq').should('not.exist')
           })
        })

        it('Test reactions summary web-mobile',()=>{
          
            cy.wTestCollectinReactionDialog(1)
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-1"]','Andrei')
            cy.wTestCollectionReactionPublicUser('[data-testid="reaction-tab-2"]','WebAutomation','/@WebAutomation2','375')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-3"]','Anonymous User3')
           // cy.wTestReactionPrivateUser('[data-testid="reaction-tab-4"]','Anonymous User2')
           // cy.wTestReactionPrivateUser('[data-testid="reaction-tab-5"]','Anonymous User1')
            cy.get('[data-testid="reaction-tab-0"]').should('be.visible').click().then(()=>{
                cy.contains('Anonymous User1').should('be.visible')
                cy.contains('Anonymous User2').should('be.visible')
                cy.contains('Anonymous User3').should('be.visible')
                cy.contains('WebAutomation').should('be.visible')
                cy.contains('Andrei').should('be.visible')
            })
            cy.wCompareSnapshot('Summary reactions web-mobile','viewport', 0.1)
           // cy.compareSnapshot('Summary reactions web-mobile',{errorThreshold: 0.1})         
           cy.get('[data-testid="wk-dialog-close"]')
           .should('be.visible')
           .click()
           cy.get('[data-testid="wk-dialog"]').should('not.exist')      
        })

        it('Test reactions summary on cards web-mobile',()=>{

            cy.wTestCardReactionDialog(2)
            cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-1"]:visible','WebAutomation','/@WebAutomation2')
            cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-2"]:visible','Lucian','/@LucianTeacher2')
            cy.wTestReactionPrivateUser('[data-testid="reaction-tab-3"]:visible','Anon User3')
           // cy.wTestCardReactionPublicUser('[data-testid="reaction-tab-4"]:visible','Lucian Puscas','/@LucianPuscas')
           // cy.wTestReactionPrivateUser('[data-testid="reaction-tab-5"]:visible','TestUser1')
            cy.get('[data-testid="reaction-tab-0"]').should('be.visible').click().then(()=>{
                cy.contains('WebAutomation').should('be.visible')
                cy.contains('Lucian').should('be.visible')
                cy.contains('Anon User3').should('be.visible')
                cy.contains('Lucian Puscas').should('be.visible')
                cy.contains('TestUser1').should('be.visible')
            })
            cy.wCompareSnapshot('Summary reactions on cards web-mobile','viewport', 0.1)
           // cy.compareSnapshot('Summary reactions on cards web-mobile',{errorThreshold: 0.1}) 
           cy.get('[data-testid="wk-dialog-close"]')
           .should('be.visible')
           .click()
           cy.get('[data-testid="wk-dialog"]').should('not.exist')
        })
          

        it('Test Read mode web-mobile',()=>{
         
            cy.wTestImageCard(items.imageCard)
            cy.wCompareSnapshot('Read mode image web-mobile','viewport', 0.1)
           // cy.compareSnapshot('Read mode image web-mobile',{ timeout:2000, errorThreshold: 0.1}) 
            cy.wNextPageMobile(1)
            cy.wTestReadModeCollectionItemMobile(readMode.readModeData.collectionItem , '/cgUomSOXloZNXxtkZGYEJ')
            cy.wTestReadModeTweetMobile(readMode.readModeData.twitterItem, readMode.readModeData.twitterId)
            cy.wTestReadModeSparkMobile(readMode.readModeData.sparkItem , readMode.readModeData.sparkUrl)
            cy.wTestReadModeGDriveMobile(readMode.readModeData.gDriveUrl)
            cy.wTestReadModeTextMobile(readMode.readModeData.textItem , readMode.readModeData.text)
            cy.wTestReadModeYoutubeMobile(readMode.readModeData.youtubeItem , readMode.readModeData.youtubeUrl)
            cy.wTestReadModePdfMobile(readMode.readModeData.pdfItem , readMode.readModeData.pdfUrl)
            cy.wTestReadModeFlipgridMobile(readMode.readModeData.flipgridItem , readMode.readModeData.flipgridUrl)
            cy.wTestReadModeOneDriveMobile(readMode.readModeData.OneDriveUrl) 
            cy.wTestReadModeLinksMobile(readMode.readModeData.linksUrl)           
        })

        it('Test Read mode icon web-mobile',()=>{

            cy.get('[data-testid="read-mode-button"]').each((el)=>{
                cy.wrap(el,{timeout:2000}).scrollIntoView({duration:1000}).should('be.visible')
                .click({timeout:2000})
                cy.get('#readmode').should('be.visible')
                cy.get('div.swiper-container').eq(0).should('be.visible')
                cy.get('[data-testid="wk-btn"]').eq(1).should('be.visible')
                .click({timeout:2000}) 
            })
            cy.get('[data-testid="read-mode-button"]').should('have.length', '15')
        })

        it('Test footer links web-mobile',()=>{

            cy.wTestFooterLinks('About','/about')
            cy.wTestFooterLinks('Features','https://features.wakelet.com')
            cy.wTestFooterLinks('Apps','/apps')
            cy.wTestFooterLinks('Browser Extension','/extensions')
            cy.wTestFooterLinks('Help Center','https://help.wakelet.com')
            cy.wTestFooterLinks('Community','https://community.wakelet.com')
            cy.wTestFooterLinks('Blog','https://blog.wakelet.com')
            cy.wTestFooterLinks('Terms','/terms.html')
            cy.wTestFooterLinks('Privacy','/privacy.html')
            cy.wTestFooterLinks('Rules','/rules.html')
        })

        it('Test cookie banner web-mobile', () => {
            cy.clearLocalStorage()
            cy.reload()
            cy.get('[data-testid="dismissible-banner"]').contains('Wakelet uses')
            .should('be.visible')
            cy.get('[data-testid="dismissible-banner"] a').should('have.attr','href',wakelet +'/privacy.html')
            .invoke('removeAttr','target')
            .click().then(()=>{
                cy.url().should('contain','/privacy.html')
                cy.go('back')
            })
            cy.get('[data-testid="dismissible-banner-dismiss"]').should('be.visible').click();
            cy.get('[data-testid="dismissible-banner"]').should('not.exist');
        })

        it('Test footer social links web-mobile',()=>{

            cy.wTestFooterSocialLinks(0,social.youtube)
            cy.wTestFooterSocialLinks(1,social.twitter)
            cy.wTestFooterSocialLinks(2,social.facebook)          
            cy.wTestFooterSocialLinks(3,social.instagram)
            cy.contains('Copyright 2021 Wakelet Limited.').scrollIntoView({duration: 5000}).then((el)=>{
                cy.get(el,{timeout:5000}).scrollIntoView({duration: 5000}).should('be.visible')
                cy.get('footer img').scrollIntoView().should('be.visible')
            })
            cy.compareSnapshot('Collection footer web-mobile',{errorThreshold: 0.1})          
        })
    })

      
    context('Test collection in Grid view',()=>{

        beforeEach(()=>{
            cy.clearLocalStorage()
            cy.visit('/wake/83xBiVV5H08-dPDDQvA7D') 
            // cy.reload()
        }) 

        it('Screenshot collection Grid view',()=>{
            cy.get('footer').scrollIntoView({duration: 4000})
            cy.wRemoveCookie()
            cy.get('div.sticky.zindex-header').invoke('hide')
            cy.wCompareSnapshot('Test Collection in Grid layout','fullPage', 0.1)
           // cy.compareSnapshot('Test Collection in Grid layout',{errorThreshold: 0.1 , capture:'fullPage'})
                             
        })
    })

    context('Test collection in Compact view',()=>{
        beforeEach(()=>{
            cy.clearLocalStorage()
            cy.visit('/wake/9YIrvk0IvBKoCSYgB_sVe')
            //cy.reload()
        })

        it('Screenshot collection in Compact view',()=>{
            cy.get('footer').scrollIntoView({duration: 4000})
            cy.wRemoveCookie()  
            cy.get('div.sticky.zindex-header').invoke('hide')
            cy.wCompareSnapshot('Test Collection in Compact layout','fullPage', 0.1)
           // cy.compareSnapshot('Test Collection in Compact layout',{ errorThreshold: 0.1 , capture:'fullPage'})    
        })  
    })

    context('Test collection in Masonry view',()=>{
        beforeEach(()=>{
            cy.clearLocalStorage()
           // cy.viewport(1800,2000)
            cy.visit('/wake/tyBdsz-lb8P10kl8Jmo_Z')
           // cy.reload()
        })

        it('Screenshot collection in Masonry view',()=>{
            cy.get('footer').scrollIntoView({duration: 4000})
            cy.wRemoveCookie()  
            cy.get('div.sticky.zindex-header').invoke('hide')
            cy.wCompareSnapshot('Test Collection in Masonary layout','fullPage', 0.25)
           // cy.compareSnapshot('Test Collection in Masonary layout',{ errorThreshold: 0.1 , capture:'fullPage'})
        })
    })

    context('Test collection in Column view',()=>{
        beforeEach(()=>{
            cy.clearLocalStorage()
            cy.viewport(2600,1400)
            cy.visit('/wake/NrAs0TkDyEXWlqEMaC4rP') 
           // cy.reload()
        })

        it('Screenshot collection in Column view',()=>{
            cy.contains('Test-7')
            .scrollIntoView()
            .should('be.visible')
            cy.get('footer').scrollIntoView({duration: 5000})
            cy.wRemoveCookie()  
            cy.get('div.sticky.zindex-header').invoke('hide')
           // cy.wCompareSnapshot('Test Collection in Column-1 layout','fullPage', 0.1)
            
            cy.wScreenshot('Test Collection in Column-1 layout')

        })
    })

})


