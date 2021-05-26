/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit(`http://:${require('ip').address()}:3000`)
    })
    it('renders home page', () => {
        cy.get('.app').as('app');
        cy.get('@app').should('be.visible');
    })
    it('renders nav bar', () => {
        cy.get('.navbar').should('be.visible');
        cy.get('.navbar').children().should('contain', 'Home');
        cy.get('.navbar').children().should('contain', 'Portfolio');
        cy.get('.navbar').children().should('contain', 'Market');
        cy.get('.navbar').children().should('contain', 'Pools');
    })
  })
  