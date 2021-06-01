/// <reference types="cypress" />

context('App Rendering', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('renders home page', () => {
        cy.get('.app').as('app')
        cy.get('@app').should('be.visible')
    })
    it('renders nav bar', () => {
        cy.get('.navbar').should('be.visible');
        cy.get('.navbar').children().should('contain', 'Home')
        cy.get('.navbar').children().should('contain', 'Portfolio')
        cy.get('.navbar').children().should('contain', 'Market')
        cy.get('.navbar').children().should('contain', 'Pools')
    })
    it('renders wallet', () => {
      cy.get('[data-cy=wallet]').should('be.visible')
      cy.get('[data-cy=wallet]').contains('Connect')
      cy.get('[data-cy=wallet]').click()
    })
    it('renders carosel', () => {
      cy.get('[data-cy=carosel]').should('be.visible')
    })

    it('renders dashboard', () => {
      cy.get('[data-cy="Biggest Gains"]').should('be.visible')
      cy.get('[data-cy="Votes in Progress"]').should('be.visible')
      cy.get('[data-cy="Biggest Communites"]').should('be.visible')

    })
    it('clicks all nav', () => {
      cy.get('[data-cy=home]').click()
      cy.get('[data-cy=market]').click()
      cy.get('[data-cy=portfolio]').click()
      cy.get('[data-cy=pools]').click()
    })
    it('renders pool page', () => {
      cy.get('[data-cy=pools]').click()
      cy.url().should('include', '/pools')
      cy.get('[data-cy=pools-page]').should('be.visible')
      cy.get('[data-cy=searchbar]').should('be.visible')
      cy.get('[data-cy=search-result]').should('be.visible').children().should('have.length', 1)
      cy.get('[data-cy=add-pool]').should('be.visible')
      cy.get('[data-cy=add-pool]').click()
      cy.get('[data-cy="Create a new Pool"]').as('popup')
      cy.get('@popup').should('be.visible').contains("Create a new Pool")
      cy.get('[data-cy=cancel]').click()
      cy.get('@popup').should('not.exist')
    })
    it('closes popup', () => {
      cy.get('[data-cy=pools]').click()
      cy.url().should('include', '/pools')
      cy.get('[data-cy=pools-page]').should('be.visible')
      cy.get('[data-cy=searchbar]').should('be.visible')
      cy.get('[data-cy=search-result]').should('be.visible').children().should('have.length', 1)
      cy.get('[data-cy=add-pool]').should('be.visible')
      cy.get('[data-cy=add-pool]').click()
      cy.get('[data-cy="Create a new Pool"]').as('popup')
      cy.get('@popup').should('be.visible').contains("Create a new Pool")
      cy.get('[data-cy=pools]').click({force: true})
      cy.get('@popup').should('not.exist')
    })
  })
  