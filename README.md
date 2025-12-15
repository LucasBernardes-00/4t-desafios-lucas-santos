# Manul de como iniciar esse projeto

Esse projeto está dividido em dois arquivos, front-end e back-end, nas respectivas pastas:

- front-spa
- mock-api

## Front-end

### Primeiros - Front

#### Angular

Antes de rodar a aplicação verifique se tem o Angular instalado na sua máquina, através do comando:

``` cmd
ng version
```

Caso não tenha instale através do comando:

``` cmd
npm install -g @angular/cli@20
```

#### Node

Agora com o angular instalado, verifique se o node está instalado em sua máquina, através do comando:

``` cmd
node -v
```

Caso não tenha instalado vá no site do node, [Link](https://nodejs.org/pt/download) e selecione a versão 22 do node no primeiro dropdown, que está sublinhado de amarelo:

![Tela de download do Node](./imagens/Captura%20de%20tela%202025-12-15%20160307.png)

### Rodando o front-end

Agora, com o Node e o Angular já instalados em sua máquina, abra a pasta __/front-spa__, na raiz do projeto, e através da linha de comando, terminal se preferir, rode o comando:

``` cmd
npm run start
```

Após isso sua aplicação estará rodando na porta 4200, através do link: <http://localhost:4200>

## Back-end

### Primeiros passos - Back

Essa é uma aplicação simples, e possuí apenas front-end, o que é chamado de back nada mais é do a biblioteca json-server rodando como aplicação de fundo simulando um banco de dados e uma api.

Para isso verifique se possuí o json-server instalado em sua máquina, através do comando:

``` cmd
json-server --version
```

Caso não tenha basta instalar usando esse outro comando:


``` cmd
npm install -g json-server
```

### Rodando o back-end

Agora para rodar o back basta entrar, pela linha de comando, na pasta __/mock-api__, na raiz do projeto e rodar o comando:

``` cmd
json-server --watch db.json
```

Pronto agora você consegue acessar tanto a api quanto o front, pelos caminhos

- <http://localhost:4200> - Front-end
- <http://localhost:3000> - Back-end
