describe('Logic tests', () => {
  // Test setup
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('nav li:nth-child(2) a').click()
  })

  it('Sum two numbers', () => {
    const FIRST_NUMBER = 8
    const LAST_NUMBER = 3

    cy.contains(FIRST_NUMBER).click()
    cy.contains(/^\+$/).click()
    cy.contains(LAST_NUMBER).click()
    cy.contains('=').click()

    cy.get('.calc__main__display__result').contains(FIRST_NUMBER + LAST_NUMBER)
    cy.get('.log__body__item__expression').contains(FIRST_NUMBER + ' + ' + LAST_NUMBER)
    cy.get('.log__body__item__result').contains(FIRST_NUMBER + LAST_NUMBER)
  })

  /* it('Sum same number multiple times', () => {
    const NUMBER_ONE = 1
    const NUMBER_TWO = 5

    cy.contains(NUMBER_ONE).click()
    cy.contains(/^\+$/).click()
    cy.contains(NUMBER_TWO).click()
    cy.contains('=').click()
    cy.contains('=').click()
    cy.contains('=').click()

    cy.get('.calc__main__display__result').should('have.text', 21)
  }) */
})

describe('UI tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('nav li:nth-child(2) a').click()
  })

  it('Check elements', () => {
    cy.contains('8').click()

    cy.url().should('include', '3000') // Kinda stupid for this example, but useful for testing links

    // cy.get('.input').type('hello there').should('have.value', 'hello there')

    cy.get('.log__btn').contains('Clear')
  })

  it('Expand side menu', () => {
    cy.contains('x^y').should('not.exist')
    cy.get('.icon').click()
    cy.contains('x^y')
  })

  it('Clear log', () => {
    const FIRST_NUMBER = 2
    const LAST_NUMBER = 5

    // Add a calc to the log
    cy.contains(FIRST_NUMBER).click()
    cy.contains(/^\-$/).click()
    cy.contains(LAST_NUMBER).click()
    cy.contains('=').click()

    cy.get('.log__body').children().should('have.length', 1)

    cy.get('.log__btn').click()

    cy.get('.log__body').children().should('have.length', 0)
  })

  it('Navigate to internal page', () => {
    cy.contains('Home').click()
    cy.url().should('include', '/')
    cy.contains('Calculator').click()
    cy.url().should('include', '/calculator')
  })
})
