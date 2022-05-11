// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
      cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
 
   })

   it('preenche os campos obrigatórios e envia formul´rio', function() {

      const longText = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#open-text-area').type(longText, { delay: 0})
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')

   })
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa,com.br')
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })
   it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
      cy.get('#phone')
         .type('adsasdasawww')
         .should('have.value', '')

   })
   it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })
 })

