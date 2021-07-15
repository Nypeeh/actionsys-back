# ActionsysAPI
🚀 ActionsysAPI desenvolvida em Node.js aproveitando diversos conceitos do SOLID e arquitetura DDD e TDD

# Tecnologias utilizadas

## Back end
- Node.js
- Typescript
- Jest para testes unitários

### Bibliotecas adicionadas ao projeto

- bcryptjs: Encriptar dados e comparar
- celebrate: Validação de dados de requisições
- express: Framework para controle de rotas
- express-async-errors: Possibilidade de criar errors personalizados de forma async
- cors: Controle de entrada de requisições para o endereço
- jsonwebtoken: Trabalhar com JWT Tokens
- mysql: Integração com o banco de dados MySQL
- reflect-metadata: Habilitar utilização de decorators
- tsyringe: Injeção de dependências
- typeorm: ORM para manipulação de banco de dados
- date-fns: Manipulação de datas.
- eslint: Padronização de código.
- prettier: Manter o código mais bonito e organizado.
- uuid: Geração de id único universal

## Instruções caso queira utilizar o Actionsys-front-end junto

🙂 Você precisa primeiro criar um usuário utilizando as rotas de employee (POST)
Após a criação do usuário já será possível efetuar o login com a mesma senha utilizada no cadastro.

✔ Foi feita uma unificação de usuários com funcionários, então todos os usuários criados podem efetuar login com a senha que você cadastrou neles.

✔ Aplicação feita com base em regras de negócio flexíveis, para uma melhor implementação de todas as funcionalidades, arquiteturas, fundamentos que pude juntar no projeto em torno dois dias.

# Como executar o projeto

## Front-End web
Pré-requisitos: npm / yarn

```bash

# Clonar repositório
git clone https://github.com/Nypeeh/actionsys-back.git

# Entrar na pasta do projeto Front-End web
cd actionsys-back

# Instalar dependências
yarn / npm install

# Executar o projeto
yarn dev:server / npm run dev:server

```

# Autor

* Leonardo Armejo (Linkedin: https://www.linkedin.com/in/leonardo-armejo-7ab971203/)
