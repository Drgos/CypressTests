/// <reference types="cypress" />
describe('checking the main page loads as expected', () => {
  it('goes to Restful Booker and clicks let me hack button', () => {
    cy.visit('/');
    cy.get('h1').contains('Welcome')
    cy.contains('button', 'Let me hack!').click();
  })
})