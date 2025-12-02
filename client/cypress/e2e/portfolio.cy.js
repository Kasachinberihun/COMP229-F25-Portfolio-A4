describe('Portfolio E2E Test', () => {
  it('Navigates through main pages', () => {
    
    cy.visit('http://localhost:5174');


    cy.contains('Projects').click();
    cy.url().should('include', '/projects');

    cy.contains('Education').click();
    cy.url().should('include', '/education');

    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
  });
});

