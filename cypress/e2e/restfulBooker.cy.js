/// <reference types="cypress" />
describe('checking the main page performs as expected', () => {
  beforeEach('goes to Restful Booker', () => {
    cy.visit('/');
  });
  
  it('should fill the form with valid data', () => {
    cy.get('#name').type('Dragos Pinca');
    cy.get('#email').type('dragos@gmail.com');
    cy.get('#phone').type('12345678901');
    cy.get('#subject').type('I filled this form with cypress');
    cy.get('#description').type('a'.repeat(20));
    cy.get('#submitContact').click();
    cy.contains("Thanks for getting in touch").should('be.visible')
  });

  it('should check all errors on empty form submit', () => {
    cy.get('#submitContact').click();
    cy.contains('Name may not be blank').should('be.visible');
    cy.contains('Subject may not be blank').should('be.visible');
    cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');
    cy.contains('Phone may not be blank').should('be.visible');
    cy.contains('Message may not be blank').should('be.visible');
    cy.contains('Phone must be between 11 and 21 characters.').should('be.visible');
    cy.contains('Email may not be blank').should('be.visible');
    cy.contains('Subject must be between 5 and 100 characters.').should('be.visible');
  });

  it('should display validation error for empty NAME', () => {
    cy.get('#name').clear();
    cy.get('#submitContact').click();
    cy.contains('Name may not be blank').should('be.visible');
  });

  it('should display validation error for wrong EMAIL format', () => {
    cy.get('#email').clear();
    cy.get('#email').type('dragos.com');
    cy.get('#submitContact').click();
    cy.contains('must be a well-formed email address').should('be.visible');
  });

  it('should display validation error for less than required PHONE number', () => {
    cy.get('#phone').clear();
    cy.get('#phone').type('1234567890');
    cy.get('#submitContact').click();
    cy.contains('Phone must be between 11 and 21 characters.').should('be.visible');
  });

  it('should display validation error for more than required PHONE number', () => {
    cy.get('#phone').clear();
    cy.get('#phone').type('1234567890123456789011');
    cy.get('#submitContact').click();
    cy.contains('Phone must be between 11 and 21 characters.').should('be.visible');
  });

  it('should display error for SUBJECT less then 5', () => {
    cy.get('#subject').clear();
    cy.get('#subject').type('test');
    cy.get('#submitContact').click();
    cy.contains('Subject must be between 5 and 100 characters.').should('be.visible');
  });

  it('should display error for SUBJECT with more than 100 characters', () => {
    cy.get('#subject').clear();
    cy.get('#subject').type('a'.repeat(101));
    cy.get('#submitContact').click();
    cy.contains('Subject must be between 5 and 100 characters.').should('be.visible');
  });

  it('should display error for Message with less than 19 characters', () => {
    cy.get('#subject').clear();
    cy.get('#subject').type('a'.repeat(19));
    cy.get('#submitContact').click();
    cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');
  });

  it('should display error for Message with more than 2000 characters', () => {
    cy.get('#subject').clear();
    cy.get('#subject').type('a'.repeat(2001));
    cy.get('#submitContact').click();
    cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');
  });

})