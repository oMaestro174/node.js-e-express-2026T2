# Laboratório 09 (A2): Projeto Prático - API de Gerenciamento de Tarefas

## Objetivo (Avaliação A2)

Construir uma API RESTful completa e funcional para um sistema de gerenciamento de tarefas, aplicando todos os conceitos aprendidos durante o curso: estrutura de projeto, conexão com banco de dados PostgreSQL, CRUD, autenticação com JWT, autorização e documentação com Swagger.

**A entrega desta atividade constituirá a nota da A2.**

---

## Requisitos Funcionais

1.  **Usuários:**
    - Deve ser possível cadastrar novos usuários (nome, email, senha).
    - A senha deve ser armazenada no banco de dados de forma segura (usando hash).
    - Deve ser possível autenticar um usuário (login) com email e senha.
    - Em caso de sucesso no login, a API deve retornar um token JWT.

2.  **Tarefas:**
    - Um usuário autenticado deve poder criar, listar, atualizar e deletar **suas próprias tarefas**.
    - Um usuário **não pode** ver, atualizar ou deletar tarefas de outros usuários.
    - Cada tarefa deve estar obrigatoriamente associada a um usuário.

---

## Instruções de Entrega (A2)

- **Formato:** Avaliação presencial individual.
- **O que será avaliado:**
  1.  O aluno deverá apresentar o projeto **rodando em sua máquina local**.
  2.  O professor irá testar o fluxo completo da API usando Postman ou a documentação do Swagger:
      - Tentar acessar uma rota protegida sem token (deve falhar com `401`).
      - Cadastrar um novo usuário.
      - Fazer login com o usuário criado e obter um token.
      - Usar o token para criar e listar tarefas para esse usuário.
      - Tentar acessar tarefas de outro usuário (deve falhar ou retornar vazio).
  3.  Análise do código-fonte para verificar a correta aplicação dos conceitos (estrutura, segurança, etc.).

---

## Passo a Passo da Construção

### Passo 1: Estrutura do Projeto

Crie a seguinte estrutura de pastas no seu projeto:

```
/ (raiz do projeto)
|-- /src
|   |-- /routes
|   |-- /controllers
|   |-- /middlewares
|   |-- /db
|-- .env
|-- .gitignore
|-- package.json
`-- server.js
```

### Passo 2: Configuração Inicial

1.  Inicie o projeto e instale as dependências:
    ```bash
    npm init -y
    npm install express pg jsonwebtoken bcryptjs dotenv swagger-ui-express swagger-jsdoc
    ```
2.  Crie o arquivo `.gitignore` e adicione `node_modules/` e `.env`.
3.  Crie o arquivo `.env` para as variáveis de ambiente:

    ```
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=task_manager
    DB_PASSWORD=sua_senha_do_postgres
    DB_PORT=5432

    JWT_SECRET=sua_chave_secreta_super_longa_e_segura
    ```

### Passo 3: Módulo de Banco de Dados (`/db/index.js`)

> 🧠 **Lembrete:** A configuração do pool de conexão e a exportação do módulo de query foram vistas em detalhes no **Laboratório da Aula 06**. Consulte-o se tiver dúvidas sobre o `pg.Pool`.

Crie um arquivo que exporta um pool de conexão configurado para reutilizar conexões com o banco.

```javascript
// src/db/index.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

### Passo 4: CRUD de Usuários e Autenticação

> 🧠 **Lembrete:** A lógica de criar rotas e controladores foi a base da **Aula 03** e **Aula 04**. A criptografia de senhas com `bcrypt` e a geração de tokens com `jsonwebtoken` são conceitos novos, mas se baseiam na estrutura de controladores que já praticamos.

1.  **Controller (`/controllers/userController.js`):**
    - Crie a função `registerUser`. Nela, use `bcrypt.hash` para criptografar a senha antes de salvar no banco.
    - Crie a função `loginUser`. Nela, busque o usuário pelo email, use `bcrypt.compare` para verificar a senha e, se estiver correta, gere um token com `jwt.sign`.
2.  **Rotas (`/routes/userRoutes.js`):**
    - Crie a rota `POST /` para o registro.
    - Crie a rota `POST /login` para a autenticação.

### Passo 5: Middleware de Autenticação (`/middlewares/authMiddleware.js`)

> 🧠 **Lembrete:** O conceito de `middleware` foi introduzido na **Aula 04**. A lógica de verificar o token JWT é o núcleo da autenticação em APIs, conforme discutido na teoria desta aula e da **Aula 08**.

Crie um middleware que:

1.  Verifica se o header `Authorization` existe e se começa com "Bearer ".
2.  Extrai o token.
3.  Usa `jwt.verify` para validar o token com a sua `JWT_SECRET`.
4.  Se for válido, extrai o payload (que deve conter o ID do usuário) e o anexa ao objeto `req` (ex: `req.user = decoded.user`).
5.  Chama `next()` para continuar.
6.  Se falhar, retorna `401 Unauthorized`.

### Passo 6: CRUD de Tarefas (Protegido)

> 🧠 **Lembrete:** A implementação de um CRUD RESTful completo foi o foco do **Laboratório da Aula 07**. A principal novidade aqui é adicionar a verificação de `user_id` para garantir a **autorização**.

1.  **Controller (`/controllers/taskController.js`):**
    - Crie as funções `createTask`, `getTasksByUser`, `updateTask`, `deleteTask`.
    - **Importante:** Em todas as queries, adicione a condição `WHERE user_id = $...`. O ID do usuário virá de `req.user.id`, que foi adicionado pelo middleware de autenticação. Isso garante a **autorização**.
2.  **Rotas (`/routes/taskRoutes.js`):**
    - Crie as rotas `POST /`, `GET /`, `PUT /:id`, `DELETE /:id`.
    - **Aplique o middleware de autenticação em todas elas.**
      ```javascript
      const authMiddleware = require("../middlewares/authMiddleware");
      // ...
      router.get("/", authMiddleware, taskController.getTasksByUser);
      ```

### Passo 7: Juntando Tudo no `server.js`

Seu `server.js` principal deve ser limpo e apenas orquestrar as partes.

```javascript
// server.js
require("dotenv").config();
const express = require("express");
const mainRouter = require("./src/routes"); // Importa o roteador principal

const app = express();
app.use(express.json());

// Usa o roteador principal para todas as rotas a partir de /api
app.use("/api", mainRouter);

// ... (configuração do Swagger aqui) ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

_Dica: Crie um `src/routes/index.js` que importa e agrupa as rotas de usuário e tarefas._

### Passo 8: Documentação com Swagger

> 🧠 **Lembrete:** A implementação completa do Swagger, incluindo a configuração e a documentação com comentários JSDoc, foi detalhada no **Laboratório da Aula 08**.

1.  Configure o `swagger-jsdoc` e o `swagger-ui-express` no seu `server.js`.
2.  Adicione a documentação JSDoc em todas as suas rotas (`userRoutes.js` e `taskRoutes.js`), descrevendo o que cada uma faz, os parâmetros e as respostas.
3.  **Desafio extra:** Adicione a configuração de segurança no Swagger para que a UI permita "autorizar" as requisições com o token JWT obtido no login.

---

### Passo 9: Como Testar a API Completa no Postman

Para validar se sua API atende a todos os requisitos da Avaliação A2, siga este fluxo de testes:

#### 1. Iniciar o Servidor
Abra o terminal na pasta da sua Aula 09 (se estiver na raiz do projeto: `cd Aula09`):
```powershell
# Execução padrão em desenvolvimento:
node start.js --dev
# ou:
node server.js
```
> Mensagem esperada: `Servidor rodando na porta 3000`

#### 2. Cadastrar um Usuário (`POST /auth/register`)
* **URL:** `http://localhost:3000/auth/register` (ou `/api/users/register`)
* **Headers:** `Content-Type: application/json`
* **Body:**
```json
{
  "name": "Maria Souza",
  "username": "mariasouza",
  "email": "maria@iteam.edu.br",
  "password": "senha123"
}
```
* **Esperado:** `201 Created` com os dados do usuário cadastrado (sem expor a senha em texto puro).

#### 3. Realizar Login e Obter o Token JWT (`POST /auth/login`)
* **URL:** `http://localhost:3000/auth/login` (ou `/api/users/login`)
* **Headers:** `Content-Type: application/json`
* **Body:**
```json
{
  "username": "mariasouza",
  "password": "senha123"
}
```
* **Esperado:** `200 OK` com o JSON contendo `"token": "eyJhbGciOi..."`. Copie este token!

#### 4. Listar Tarefas com Autenticação (`GET /tasks`)
* **URL:** `http://localhost:3000/tasks` (ou `/api/tasks`)
* **Headers:**
  * `Authorization`: `Bearer <cole_o_token_aqui>`
* **Esperado:** `200 OK` trazendo a lista de tarefas da Maria.

#### 5. Criar Tarefa Protegida (`POST /tasks`)
* **URL:** `http://localhost:3000/tasks` (ou `/api/tasks`)
* **Headers:**
  * `Content-Type`: `application/json`
  * `Authorization`: `Bearer <cole_o_token_aqui>`
* **Body:**
```json
{
  "title": "Estudar Middlewares e JWT",
  "description": "Praticar autorização em rotas privadas"
}
```
* **Esperado:** `201 Created` com a tarefa salva no banco vinculada ao `user_id` da Maria.

#### 6. Testar Bloqueio de Segurança (Sem Token)
* Faça `GET http://localhost:3000/tasks` sem o header `Authorization`.
* **Esperado:** `401 Unauthorized` (`"Nenhum token fornecido."`).

---

Boa sorte! Este projeto é o seu portfólio final para o curso.
