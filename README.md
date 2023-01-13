# O projeto

Projeto base automação de testes com Cypress 9 e Cucumber.

# Dependências

Foi utilizado:
* Cypress 9.7.0
* Cucumber preprocessor

# Como iniciar um projeto de automação com Cypress 9 e Cucumber

**Passo 1:** iniciar um projeto NodeJS<br>
Basta digitar o comando abaixo no terminal:<br>
`$ npm init`

Criará o arquivo `package.json`.

![img](./imagens/print_package_json.png "Exibindo packagejson")

**Passo 2:** instalar o Cypress 9<br>
`npm i cypress@9.7.0`

![img](./imagens/print_cypress_instalado.png "Cypress instalado")

**Passo 3:** instalar o Cucumber<br>
`npm install --save-dev cypress cypress-cucumber-preprocessor`

![img](./imagens/print_cucumber_instalado.png "Cucumber instalado")

Se eu VSCode exibir esta mensagem você pode clicar em "Sim". Isto apenas irá criar um arquivo `.gitignore` que irá desconsiderar os módulos node nos seus commits.

![img](./imagens/print_mensagem_gitignore.png "Mensagem arquivo .gitignore")

**Passo 4:** abrir o cypress para ele criar o restante das pastas<br>
`npx cypress open`<br>

A pasta `cypress` será criada. O cypress pode ser fechado pois não será usado ainda.

![img](./imagens/print_pasta_cypress.png "Pasta cypress criada")

**Passo 5:** adicionar o script abaixo no arquivo cypress/plugins/index.js

cypress/plugins/index.js
```
const cucumber = require("cypress-cucumber-preprocessor").default;
module.exports = (on) => {
        on("file:preprocessor", cucumber());

};

```

![img](./imagens/print_plugins.png "Script plugin")

**Passo 6:** criar pastas extras para os testes
Criar pastas: elements, pageObjects e steps.

cypress/support/elements
cypress/support/pageObjects
cypress/support/steps

![img](./imagens/print_pastas_extras.png "Pastas extras")

**Passo 7:** adicionar o código abaixo no arquivo `package.json`

```
{
    "scripts": {
        "test": "cypress run --browser chrome"
    },
    "cypress-cucumber-preprocessor": {
        "step_definitions": "cypress/support/steps"
    }
}
```

O meu ficou da seguinte mandeira:

![img](./imagens/print_codigo_package_json.png "Exibindo arquivo package.json")

**Passo 8:** adicionar o código abaixo no arquivo `cypress.json`
Ele informa a resolução do navegador, timeout e a URL base (que é a URL dos testes). Você pode modificar este arquivo como desejar.

```
{
    "viewportWidth": 1366,
    "viewportHeight": 768,
    "defaultCommandTimeout": 10000,
    "baseUrl": "https://www.ultima.school/"
}
```

![img](./imagens/print_cypress_json.png "Arquivo cypress.json")

**Passo 9:** criar o cenário de teste em BDD
Criar um arquivo `.feature` com os testes em BDD. Você pode usar o abaixo como base:

cypress/integration/Login.feature
```
Feature: Login site ULTIMA

    Scenario: Visualizar opção de login
        Given acesso o site ultima
        When acesso a pagina de login
        Then devo visualizar botao de conecte
```

![img](./imagens/print_feature.png "Arquivo Login.feature")

Você pode deletar essas duas pastas do cypress (getting-started e advanced-exemples) pois no modo headless (se não for informado qual arquivo de teste deseja executar) será executado os testes dessas pastas também:

![img](./imagens/print_deletar_pastas.png "Pastas para excluir")

**Passo 10:** criar arquivo `.js` que terá os passos do teste
Você pode usar este como base:

cypress/support/steps/LoginSteps.js
```
/* global Given, Then, When */

import LoginPage from '../pageobjects/LoginPage'
const loginPage = new LoginPage

Given("acesso o site ultima", () => {
    loginPage.acessarSite();
})

When("acesso a pagina de login", () => {
    loginPage.abraPaginaLogin();
})

Then("devo visualizar botao de conecte", () => {
    loginPage.visualizarBotaoCadastro();
})
```

![img](./imagens/print_steps.png "Arquivo LoginSteps.js")

**Passo 11:** criar arquivo `.js` com os comandos e funções que executamos nos testes
Você pode usar este como base:

cypress/support/pageObjects/LoginPage.js
```
import LoginElements from '../elements/LoginElements'
const loginElements = new LoginElements
const url = Cypress.config("baseUrl")

class LoginPage {
    // Acessa o site que será testado
    acessarSite() {
        cy.visit(url)
    }

    // Clica no botão que acessa a página de login do site
    abraPaginaLogin() {
        cy.visit(loginElements.botaoLogin())
    }

    // Verifica se o botão tem o texto "Esqueceu sua senha?"
    visualizarBotaoCadastro() {
        //    cy.get(loginElements.botaoConecte()).should('Conecte-se')

        cy.get(loginElements.botaoConecte())
            .invoke('attr', 'value')
            .should('eq', 'Conecte-se')
    }
}

export default LoginPage;
```

![img](./imagens/print_page_objects.png "Arquivo PageObjects.js")

**Passo 12:** criar arquivo `.js` com os elementos da página dos testes
Você pode usar este como base:

cypress/support/elements/LoginElements.js
```
class LoginElements {
    botaoLogin = () => { return 'https://edu.ultima.school/lgn/' }

    campoLogin = () => { return 'user_login' }

    campoSenha = () => { return 'user_pass' }

    botaoConecte = () => { return '#wp-submit' }
}

export default LoginElements;
```
![img](./imagens/print_elements.png "Arquivo LoginElements.js")

**Passo 13:** executar os testes
Você pode executar em:

* Modo headless (sem interface):
`npm run test Login.feature`

![img](./imagens/print_modo_headless.png "Modo headless")

* Modo com interface do cypress:
`npx cypress open`

![img](./imagens/modo_interface_cypress.gif "Modo com interface do Cypress")