// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickButton', (buttonText) => { 
    return cy.contains ('button', buttonText).click()
})

// check the current selected month class vs the actual month
Cypress.Commands.add('checkCurrentMonth', () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
  
    cy.get('.rbc-toolbar-label').invoke('text').then((toolbarLabel) => {
      cy.log(`Toolbar label is: ${toolbarLabel.trim()}`);
      expect(toolbarLabel.trim()).to.include(currentMonthName);
    });
  });

// check the current selected month class is not the same as actual month
Cypress.Commands.add('notCurrentMonth', () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
  
    cy.get('.rbc-toolbar-label').invoke('text').then((toolbarLabel) => {
      cy.log(`Toolbar label is: ${toolbarLabel.trim()}`);
      expect(toolbarLabel.trim()).to.not.include(currentMonthName);
    });
  });

// use it to ignore known errors on specific tests
Cypress.Commands.add('ignoreErr', () =>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception detected:', err);
        // Return false to prevent the test from failing
        return false;
      }); 
})