/// <reference types="cypress" />
describe('validating that the booking page works as expected', () =>{
    beforeEach('visits the booking page', () => {
        cy.visit('/');
        cy.clickButton('Book this room');
        cy.contains('Today').should('be.visible');
    });

    it('should have the current date selected when landing on booking page', () => {
       cy.checkCurrentMonth();
      });

    it('should check that the Today, Back and Next buttons are working', () => {
        cy.ignoreErr();
        cy.clickButton('Next');
        cy.notCurrentMonth();
        cy.clickButton('Back');
        cy.clickButton('Back');
        cy.notCurrentMonth();
        cy.clickButton('Today');
        cy.checkCurrentMonth();

      })

    it('should cancel the booking form', () => {
        cy.ignoreErr();   
        cy.clickButton('Cancel');
        cy.contains('button', 'Book this room').should('be.visible');
      })
})