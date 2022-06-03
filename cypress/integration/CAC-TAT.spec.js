// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   const THREE_SECONDS_IN_MS = 3000
   beforeEach(function(){
      cy.visit('./src/index.html')
   })


   it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
 
   })

   Cypress._.times(3, function() {


   it('preenche os campos obrigatórios e envia formulario - 3x', function() {

      const longText = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'

      cy.clock()

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#open-text-area').type(longText, { delay: 0})
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      
      cy.get('.success').should('be.visible')


      ///Antes criar variavel cy.tick(3000)

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')

   })
   })

   it('preenche os campos obrigatórios e envia formulario', function() {

      const longText = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'

      cy.clock()

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#open-text-area').type(longText, { delay: 0})
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      
      cy.get('.success').should('be.visible')


      ///Antes criar variavel cy.tick(3000)

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')

   })

   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

      cy.clock()

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa,com.br')
      cy.get('#open-text-area').type('Teste')
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')


   })
   it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
      cy.get('#phone')
         .type('adsasdasawww')
         .should('have.value', '')

   })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.clock()

      cy.get('#firstName').type('CARLOS')
      cy.get('#lastName').type('Tanaka')
      cy.get('#email').type('tanaka@qa.com.br')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')


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

      cy.clock()
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.error').should('not.be.visible')
   })
   it('envia o formulário com sucesso usando um comando customizado',function(){
      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')

      
      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.success').should('not.be.visible')

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
   it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value','feedback')


   
   })
   it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
           cy.wrap($radio).check()
           cy.wrap($radio).should('be.checked')
        })
   })
   it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

   })
   it('seleciona um arquivo da pasta fixtures', function(){

      //Identificando Ids Aula 29
      ///cy.get('input[type="file"]#file-upload').click()

      cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json')
         .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
         })
      })

   it('seleciona um arquivo simulando um drag-and-drop', function(){

      //Identificando Ids Aula 29
      ///cy.get('input[type="file"]#file-upload').click()
      
      cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
         .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
      })
   })

   it('seleciona um arquivo utlizando uma fixture para qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
         .selectFile('@sampleFile')
         .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
         })
   })
   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
   })

   it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
      cy.get('#privacy a')
      //.invoke('removeAttr', 'target')
      //.click()
      //cy.contains('Talking About Testing').should('be.visible')
   })
   it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
      cy.get('.success')
         .should('not.be.visible')
         .invoke('show')
         .should('be.visible')
         .and('contain', 'Mensagem enviada com sucesso.')
         .invoke('hide')
         .should('not.be.visible')
      cy.get('.error')
          .should('not.be.visible')
         .invoke('show')
         .should('be.visible')
         .and('contain', 'Valide os campos obrigatórios!')
         .invoke('hide')
         .should('not.be.visible')
   })

   it('preenche a area de texto usando o comando invoke', function(){
      const longText = Cypress._.repeat('0123455789', 20)

      cy.get('#open-text-area')
         .invoke('val', longText)
         .should('have.value', longText)

   })

   it('faz uma requisição HTTP', function(){
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
   })
 })
   

  it.only('encontra o gato escondido', function(){
      cy.get('#cat')
         .invoke('show')
          .should('be.visible')
      cy.get('#title')
         .invoke('text','CAT TAT')
      cy.get('#subtitle')
         .invoke('text', '🔋QA!')
   })
})

