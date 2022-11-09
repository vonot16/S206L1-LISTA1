describe('Steam Testing', () => {
  it('Open Steam', () => {
    cy.visit('https://store.steampowered.com/')
    cy.url().should('eq','https://store.steampowered.com/')
  })

  it('Search  Terraria',()=>{
    cy.visit('https://store.steampowered.com/')
    cy.get('#store_nav_search_term')
    .type('terraria{enter}')
    cy.url().should('eq','https://store.steampowered.com/search/?term=terraria')
  })

  it('Open Terraria Page',()=>{
    cy.visit('https://store.steampowered.com/search/?term=terraria')
    cy.get('[href="https://store.steampowered.com/app/105600/Terraria/?snr=1_7_7_151_150_1"] > .responsive_search_name_combined > .search_name > .title')
    .click()
    cy.url().should('eq','https://store.steampowered.com/app/105600/Terraria/')
  })

  it('Share Terraria',()=>{
    cy.visit('https://store.steampowered.com/app/105600/Terraria/')
    cy.get('#shareEmbedRow > a:nth-child(1)')
    .click()
    cy.get('body > div.newmodal')
    .should('be.visible')
  })

  it('Register (Should Fail)',()=>{
    cy.visit('https://store.steampowered.com/')
    
    cy.get(':nth-child(8) > .home_page_content > .home_page_sign_in_ctn > .signin_buttons_ctn > [href="https://store.steampowered.com/join/?snr=1_4_4__more-content-login"]')
    .click()
    
    cy.get('#email')
    .type('rafael@inatel.br')

    cy.get('#reenter_email')
    .type('rafael@inatel.br')

    cy.get('#i_agree_check')
    .click()

    cy.get('#createAccountButton > span')
    .click()

    cy.get('#error_display')
    .should('be.visible')
  })

  it('Change Store Language',()=>{
    cy.visit('https://store.steampowered.com/')
    cy.get('#language_pulldown')
    .click()
    
    cy.get('[href="?l=brazilian"]')
    .click().then(()=>{
      cy.reload()
      cy.get('#foryou_tab > .pulldown > .pulldown_desktop')
    .should('contain.text','Sua loja')
    })
    
  })
  
})