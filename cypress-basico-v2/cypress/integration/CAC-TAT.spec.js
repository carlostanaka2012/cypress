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
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')

   })
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa,com.br')
      cy.get('#open-text-area').type('Teste')
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })
   it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
      cy.get('#phone')
         .type('adsasdasawww')
         .should('have.value', '')

   })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })
   it('preenche e limpa os campos nome,sobrenome, email e telefone', function() {
      cy.get('#firstName')
         .type('CARLOS')
         .should('have.value','CARLOS')
         .clear()
         .should('have.value','')

      cy.get('#lastName')
         .type('Tanaka')
         .should('have.value','Tanaka')
         .clear()
         .should('have.value','')
      cy.get('#email')
         .type('carlos@testes.com.br')
         .should('have.value','carlos@testes.com.br')
         .clear()
         .should('have.value','')
      cy.get('#phone')
         .type('11856345277')
         .should('have.value','11856345277')
         .clear()
         .should('have.value','')
      cy.get('#open-text-area')
         .type('qateste')
         .should('have.value','qateste')
         .clear()
         .should('have.value','')
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigátorios', function() {

      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

   })
   it('envia o formulário com sucesso usando um comando customizado',function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')

   })

   it('seleciona um produto (Youtube) por seus texto', function(){
      cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
   })

   it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
   })
   it('seleciona um produto (Blog) pelo seu indice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
   })
   it.only('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value','feedback')


   
   })

})

