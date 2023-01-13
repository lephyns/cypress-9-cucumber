import LoginPage from '../pageobjects/LoginPage'
const loginPage = new LoginPage

Given("acesso o site ultima", () => {
    cy.log('step given ');
})

When("acesso a pagina de login", () => {
    cy.log('step when ');
})

Then("devo visualizar botao de conecte", () => {
    cy.log('step then ');
})