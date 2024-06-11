/// <reference types="cypress" />
describe('validating that the booking page works as expected', () =>{
    beforeEach('visits the booking page', () => {
        cy.visit('/');
        cy.contains('button', 'Book this room').click();
        cy.contains('Today').should('be.visible')
    });

    it('should have the current date selected when landing on booking page', () => {
        // Get the current month as a string
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const currentMonthIndex = new Date().getMonth();
        // map the index to the corresponding month name
        const currentMonthName = monthNames[currentMonthIndex];

        cy.get('.rbc-toolbar-label').invoke('text').then((toolbarLabel) => {
          cy.log(`Toolbar label is: ${toolbarLabel.trim()}`);
          expect(toolbarLabel.trim()).to.include(currentMonthName);
        });
      });

      it('should check that the Today, Back and Next buttons are working', () => {
        cy.clickButton('Back');
        cy.clickButton('Next')
        cy.clickButton('Today')
      })
})