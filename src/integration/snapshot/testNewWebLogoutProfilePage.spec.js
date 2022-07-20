
import * as profile from '../../fixtures/locators/logoutProfilePageData.json';
import * as col from '../../fixtures/locators/logoutCollectionData.json';

const social = col.collectionData.footerSocialLinks;




describe('Test logout Profile Page', ()=>{

    let profileId ='/@WebAutomation2';
    let wakelet ='https://wakelet.com';

    before(()=>{
        cy.clearCookie('WAKELET_ID')
        cy.clearLocalStorage()
    })

    context('Test Profile Page', ()=>{
        beforeEach(()=>{

            cy.visit(profileId)
          //  cy.reload()
        })

        it('Test Profile page header',()=>{
            cy.get('[data-testid="header-loggedout"] a')
            .should('have.attr','href',wakelet)
            cy.contains('Wakelet')
            .should('be.visible')   
        })

        // it.skip('Test Login and Sign up buttons',()=>{
        //     cy.get('[data-testid="login-button"]')
        //     .should('be.visible').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/')
        //         })
        //     })
        //     cy.wCompareSnapshot('Log into Wakelet','viewport', 0.0) 
        //    // cy.compareSnapshot('Log into Wakelet')
        //     cy.go('back')
        //     cy.get('[data-testid="signup-button"]')
        //     .should('be.visible').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/openid/signup')
        //         })
        //     })
        //     cy.wCompareSnapshot('Get started','viewport', 0.0)   
        //    // cy.compareSnapshot('Get started')
        //     cy.go('back')
        // })

        it('Test Profile name logo cover-image', ()=>{
            cy.get('[data-testid="avatar"] img')
            .should('be.visible')
            cy.get('[data-testid="profile-cover-image"]')
            .should('be.visible')
            .should(($el)=>{
                const src = $el.attr('src')
                expect(src).to.contains('28d0edba-c37b-4247-a0db-3fe002310f19&h=766&w=2846&q=85')
            })
            cy.get('[data-testid="wk-h1"]').should('be.visible').and('contain','WebAutomation')
            cy.contains('@WebAutomation2')
            .should('be.visible')
            cy.wCompareSnapshot('Profile page screenshot','viewport', 0.5) 
           // cy.compareSnapshot('Profile page screenshot',{ errorThreshold: 0.1})
        })

        it('Test Bio profile page',()=>{
            cy.contains('...see more')
            .scrollIntoView({duration:1500})
            .should('be.visible')
            .click()
            cy.wCompareSnapshot('Profile page Bio','viewport', 0.0) 
            //cy.compareSnapshot('Profile page Bio')
        })

        it('Test Bio links',()=>{
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,0,profile.bioLinks.link1)
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,1,profile.bioLinks.link2)
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,2,profile.bioLinks.link3)
            //cy.wTestNewTabLinks(profile.bioLinks.bioLink,3,profile.bioLinks.link4) 
        })

        it('Test Follow journey',()=>{
            cy.contains('Follow')
            .should('be.visible')
            .click()
            cy.url().should('contain',col.collectionData.signupPage)
        })

        it('Test Share profile page',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.wScreenshotDialog('Share dialog profile page','viewport', 0.1)   
           // cy.compareSnapshot('Share dialog profile page',{ errorThreshold: 0.1})
           cy.contains('Share link',{timeout:2000})
           .should('be.visible')
           cy.get('[data-testid="share-options"] button',{tiomeout:2000}).eq(0)
           .click({force:true})
           cy.contains('Copied').should('be.visible')
        })

        it('Test share QR profile page',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.wTestShareQR(profile.shareProviders.qr,'QR code full page','1440')
            cy.wScreenshotDialog('QR code dialog','viewport', 0.25)   
           // cy.compareSnapshot('QR code dialog',{errorThreshold: 0.2})
            cy.get('[data-testid="wk-dialog-close"]').should('be.visible')
            .click().then((el)=>{
                cy.get(el).should('not.exist')
            })
        })

        it('Test share with Teams',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.contains('Teams').should('be.visible')   
            cy.get('[data-testid="teams-app-link"]')
            .should('have.attr','href').and('contain',profile.shareProviders.teams)
            cy.get('[data-testid="teams-app-link"]',{timeout:5000})
            .invoke('removeAttr', 'target')
            .click()
            cy.url().should('contain',profile.shareProviders.teams)
           // cy.wTestShareProviders('a.ShareButton_sharebutton__MFXji',1,profile.shareProviders.teams)
        })

        it('Test share with Classroom',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.contains('Classroom')
            .should('be.visible')
            cy.get('#google-classroom iframe')
            .should(($iframe)=>{
                const s = $iframe.attr('src')
                expect(s).to.contains(profile.shareProviders.classrooms)
            })
        })
        
        it('Test Home section',()=>{
            cy.testCollectionsOnPage('[data-testid="profile-collection"]',18)

            cy.wTestSectionsTitle('Back to School','full page')

            cy.wTestSectionsTitle('El Tatio is a geothermal field with many','full page')

            cy.wTestSectionsTitle('Test 1','full page')

            cy.wTestSectionsTitle('The story of Hubert','full page')

            cy.wTestSectionsTitle('Test 2 No Content','full page')

            cy.wTestSectionsTitle('Uncategorized','full page')

            cy.testOpenCollection('[data-testid="profile-collection"]',1)

            cy.testOpenCollection('[data-testid="profile-collection"]',6)

            cy.testOpenCollection('[data-testid="profile-collection"]',7)

            cy.testOpenCollection('[data-testid="profile-collection"]',9)

            cy.testOpenCollection('[data-testid="profile-collection"]',17)

            cy.get('[data-testid="profile-section-see-more"]:visible')
            .should('be.visible')
            .click().then(()=>{
                cy.url().should('contain','#uncategorized')
                cy.testCollectionsOnPage('[data-testid="profile-collection"]',20)
            })
        })

        it('Test Sections profile page',()=>{
           
            cy.testSections('Back to School')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',6)

            cy.testSections('El Tatio')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',1)

            cy.testSections('Test 1')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',2)

            cy.testSections('The story of')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',3)

            cy.testSections('Test 2 No Content').then(()=>{
                cy.get('[data-testid="profile-collection"]')
                .should('not.exist')
                cy.get('[data-testid="profile-section-empty"]')
                .should('be.visible')
                .should('contain','There are no collections added to this section')
            })

            cy.testSections('Uncategorized')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',20)
        })

        it('Test footer links Profile page',()=>{
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

        it('Test footer social links Profile page',()=>{
            cy.wTestFooterSocialLinks(0,social.youtube)

            cy.wTestFooterSocialLinks(1,social.twitter)

            cy.wTestFooterSocialLinks(2,social.facebook)

            cy.wTestFooterSocialLinks(3,social.instagram)
            .then(()=>{
            cy.get('[data-testid="dismissible-banner-dismiss"]').should('be.visible').click();
            cy.get('[data-testid="dismissible-banner"]').should('not.exist');
           
            })
            cy.get('footer div.text-xs')
            .scrollIntoView()
            .should('contain', 'Copyright 2021') 
        })
    }) 

    context('Test Profile Page mobile-view',()=>{
        beforeEach(()=>{
            cy.viewport(375,667)
            cy.visit(profileId)
           // cy.reload()
        })

        it('Test Profile page header mobile-view',()=>{
            cy.get('a.ml-1')
            .should('have.attr','href',wakelet)
            cy.contains('Wakelet')
            .should('be.visible')   
        })


     
        // it.skip('Test Login and Sign up buttons mobile-view',()=>{
        //     cy.get('[data-testid="login-button"]')
        //     .should('be.visible').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/')
        //         })
        //     })
        //     cy.wCompareSnapshot('Log into Wakelet mobile','viewport', 0.0) 
        //    // cy.compareSnapshot('Log into Wakelet mobile')
        //     cy.go('back')
        //     cy.get('[data-testid="signup-button"]')
        //     .should('be.visible').click().then(()=>{
        //         cy.url().should(($url)=>{
        //             expect($url).to.contain('https://accounts.wakelet.com/openid/signup')
        //         })
        //     })
        //     cy.wCompareSnapshot('Get started mobile','viewport', 0.0) 
        //     //cy.compareSnapshot('Get started mobile')
        //     cy.go('back')
        // })

        it('Test Profile name logo cover-image mobile-view', ()=>{
            cy.get('[data-testid="avatar"] img')
            .should('be.visible')
            cy.get('[data-testid="wk-h1"]').should('be.visible').and('contain','WebAutomation')
            cy.contains('@WebAutomation2')
            .should('be.visible')
            cy.wCompareSnapshot('Profile page screenshot mobile-view','viewport', 0.05) 
           // cy.compareSnapshot('Profile page screenshot mobile-view',{ errorThreshold: 0.1})
        })

        it('Test Bio profile page mobile-view',()=>{
            cy.contains('...see more')
            .scrollIntoView({duration:1500})
            .should('be.visible')
            .click()
            cy.wCompareSnapshot('Profile page Bio mobile-view','viewport', 0.0) 
           // cy.compareSnapshot('Profile page Bio mobile-view')
        })

        it('Test Bio links mobile-view',()=>{
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,0,profile.bioLinks.link1)
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,1,profile.bioLinks.link2)
            cy.wTestNewTabLinks(profile.bioLinks.bioLink,2,profile.bioLinks.link3)
           // cy.wTestNewTabLinks(profile.bioLinks.bioLink,3,profile.bioLinks.link4) 
        })

         it('Test Follow journey mobile-view',()=>{
            cy.contains('Follow')
            .should('be.visible')
            .click()
            cy.url().should('contain',col.collectionData.signupPage)
        
        })

        it('Test Share profile page web-mobile',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.wCompareSnapshot('Share dialog profile page mobile-view','viewport', 0.1)
           // cy.compareSnapshot('Share dialog profile page mobile-view',{ errorThreshold: 0.1})
            cy.contains('Share link',{timeout:2000})
            .should('be.visible')
            cy.get('[data-testid="share-options"] button',{tiomeout:2000}).eq(0)
            .click({force:true})
            cy.contains('Copied').should('be.visible')
        })

          it('Test share QR profile page web-mobile',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.wTestShareQR(profileId,'QR code full page web-mobile','375')
            cy.wScreenshotDialog('QR code dialog web-mobile','viewport', 0.3)   
           // cy.compareSnapshot('QR code dialog',{errorThreshold: 0.2})
            cy.get('[data-testid="wk-dialog-close"]').should('be.visible')
            .click().then((el)=>{
                cy.get(el).should('not.exist')
            })
        })

        it('Test share with Teams web-mobile',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.contains('Teams').should('be.visible')   
            cy.get('[data-testid="teams-app-link"]')
            .should('have.attr','href').and('contain',profile.shareProviders.teams)
            cy.get('[data-testid="teams-app-link"]',{timeout:5000})
            .invoke('removeAttr', 'target')
            .click()
            cy.url().should('contain',profile.shareProviders.teams)
         
        })

        it('Test share with Classroom web-mobile',()=>{
            cy.contains('Share')
            .should('be.visible')
            .click()
            cy.contains('Classroom')
            .should('be.visible')
            cy.get('#google-classroom iframe')
            .should(($iframe)=>{
                const s = $iframe.attr('src')
                expect(s).to.contains(profile.shareProviders.classrooms)
            })
        })

        it('Test Home section web-mobile',()=>{
            cy.testCollectionsOnPage('[data-testid="profile-collection"]',18)

            cy.wTestSectionsTitle('Back to School','mobile')
            cy.testOpenCollection('[data-testid="profile-collection"]',1)

            cy.wTestSectionsTitle('El Tatio is a geothermal field with many','mobile')
            cy.testOpenCollection('[data-testid="profile-collection"]',6)

            cy.wTestSectionsTitle('Test 1','mobile')
            cy.testOpenCollection('[data-testid="profile-collection"]',7)

            cy.wTestSectionsTitle('The story of Hubert','mobile')
            cy.testOpenCollection('[data-testid="profile-collection"]',9)

            cy.wTestSectionsTitle('Test 2 No Content','mobile')

            cy.wTestSectionsTitle('Uncategorized','mobile')

            cy.testOpenCollection('[data-testid="profile-collection"]',17)  
            cy.get('[data-testid="profile-section-see-more"]').eq(1)
            .scrollIntoView({ offset: { top: -200, left: 0 } })
            .then(($el)=>{
                cy.get($el).click({force:true})
                cy.url().should('contain','#uncategorized')
                cy.testCollectionsOnPage('[data-testid="profile-collection"]',20)
            })
        })

        it('Test Sections profile page web-mobile',()=>{
           
            cy.testSections('Back to School')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',6)

            cy.testSections('El Tatio')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',1)

            cy.testSections('Test 1')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',2)

            cy.testSections('The story of')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',3)

            cy.testSections('Test 2 No Content').then(()=>{
                cy.get('[data-testid="profile-collection"]')
                .should('not.exist')
                cy.get('[data-testid="profile-section-empty"]')
                .should('be.visible')
                .should('contain','There are no collections added to this section')
            })
            cy.testSections('Uncategorized')

            cy.testCollectionsOnPage('[data-testid="profile-collection"]',20)
        })

        it('Test footer links Profile page web-mobile',()=>{
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

        it('Test footer social links Profile page web-mobile',()=>{
            cy.wTestFooterSocialLinks(0,social.youtube)

            cy.wTestFooterSocialLinks(1,social.twitter)

            cy.wTestFooterSocialLinks(2,social.facebook)

            cy.wTestFooterSocialLinks(3,social.instagram)

            cy.get('footer div.text-xs')
            .scrollIntoView()
            .should('contain', 'Copyright 2021') 
        })
    })
})
