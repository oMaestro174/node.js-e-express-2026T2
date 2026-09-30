# Laboratório 08: Documentando a API de Tarefas com Postman e Swagger

## Objetivo

Neste laboratório, vamos pegar a API RESTful de tarefas que refatoramos na aula anterior e criar uma documentação completa para ela usando duas abordagens: manual com o Postman e automatizada com Swagger/OpenAPI.

---

## 1. Preparando o Ambiente

Pegue o código final do laboratório da Aula 07 (a API de tarefas já refatorada para o padrão RESTful) e tenha-o rodando em sua máquina. Ele será a base para este laboratório.

---

## 2. Parte 1: Documentando com Postman

### 2.1. Criando uma Coleção

1.  Abra o Postman.
2.  No painel esquerdo, clique em "Collections" e depois no ícone `+` para criar uma nova coleção.
3.  Dê o nome de "API de Tarefas".
4.  (Opcional) Vá na aba "Description" da coleção e escreva uma breve descrição sobre o que a API faz.

### 2.2. Adicionando e Documentando as Requisições

Agora, vamos adicionar cada um dos 5 endpoints da nossa API à coleção.

**Para cada requisição (GET, POST, PUT, DELETE):**

1.  Clique nos três pontinhos ao lado do nome da sua coleção e selecione "Add Request".
2.  **Nome e Método:** Dê um nome descritivo à requisição (ex: "Listar todas as tarefas") и selecione o método HTTP correto (GET).
3.  **URL:** Digite a URL do endpoint (ex: `http://localhost:3000/tasks`).
4.  **Descrição:** No painel direito, clique em "Documentation" (ícone de documento) e adicione uma descrição detalhada sobre o que o endpoint faz.
5.  **Corpo (para POST/PUT):** Na aba "Body", selecione "raw" e "JSON" e cole um exemplo de corpo da requisição.
    ```json
    {
      "title": "Nova tarefa criada pelo Postman",
      "completed": false
    }
    ```
6.  **Salvar!** Não se esqueça de salvar a requisição (`Ctrl+S`).

### 2.3. Criando Exemplos de Respostas

Esta é uma das partes mais importantes da documentação no Postman.

1.  Execute a requisição clicando em "Send".
2.  Quando a resposta chegar, na seção "Response", clique em **"Save as Example"**.
3.  O Postman criará um exemplo com o corpo e o status da resposta que você acabou de receber. Você pode editar esse exemplo se quiser.
4.  **Crie exemplos para casos de erro!** Por exemplo, na requisição "Buscar tarefa por ID", tente buscar um ID que não existe (ex: `999`). A API retornará um erro `404`. Salve essa resposta como um exemplo chamado "Exemplo: Tarefa não encontrada (404)".

### 2.4. Compartilhando a Documentação

1.  Clique nos três pontinhos ao lado da sua coleção e selecione "View Documentation".
2.  O Postman abrirá uma página web com a sua documentação completa.
3.  No canto superior direito, clique em "Publish" para gerar um link público que você pode compartilhar com sua equipe.

---

## 3. Parte 2: Documentação Automatizada com Swagger

Agora, vamos integrar o Swagger diretamente na nossa API Express para que a documentação seja gerada automaticamente a partir do nosso código.

### 3.1. Instalando as Dependências

No terminal, na pasta do seu projeto, instale as bibliotecas necessárias:

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 3.2. Configurando o Swagger

No seu arquivo `server.js`, adicione o seguinte código de configuração, logo após a inicialização do `app` do Express:

```javascript
// ... logo após const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Configurações do Swagger JSDoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description: "Uma API simples para gerenciar tarefas (CRUD)",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./server.js"], // Arquivos que contêm a documentação da API
};

const specs = swaggerJsdoc(options);

// Rota para a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ... resto do seu código da API
```

### 3.3. Documentando as Rotas com Comentários JSDoc

Agora vem a parte principal: vamos adicionar comentários especiais acima de cada rota para descrever o que ela faz. O `swagger-jsdoc` irá ler esses comentários.

**Exemplo para a rota `GET /tasks`:**

```javascript
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna a lista de todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get("/tasks", (req, res) => {
  // ...
});
```

**Exemplo para a rota `POST /tasks`:**

```javascript
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: A tarefa foi criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos
 */
app.post("/tasks", (req, res) => {
  // ...
});
```

### 3.4. Definindo os "Schemas"

Note que usamos `$ref: '#/components/schemas/Task'`. Precisamos definir o que é um `Task`. Adicione este bloco de comentário em algum lugar do seu `server.js` (geralmente no topo):

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente para a tarefa
 *         title:
 *           type: string
 *           description: O título da tarefa
 *         completed:
 *           type: boolean
 *           description: O status da tarefa
 *       example:
 *         id: 1
 *         title: "Aprender Swagger"
 *         completed: false
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: O título da tarefa
 *         completed:
 *           type: boolean
 *           description: O status da tarefa (opcional, padrão false)
 *       example:
 *         title: "Documentar minha API"
 *         completed: false
 */
```

### 3.5. Testando a Documentação

1.  Reinicie seu servidor (`node server.js`).
2.  Abra seu navegador e acesse `http://localhost:3000/api-docs`.

Você verá uma página interativa com todos os seus endpoints documentados. Você pode expandir cada um, ver os exemplos e até mesmo clicar em "Try it out" para testar a API diretamente do navegador!

## Conclusão

Parabéns! Você agora sabe documentar uma API de duas formas profissionais: manualmente com o Postman, ideal para compartilhamento rápido e testes, e de forma automatizada com Swagger, ideal para manter a documentação sincronizada com o código e fornecer uma interface interativa para os consumidores da sua API.

---

## Parte 3: Protegendo a Documentação com Autenticação

Em um ambiente real, você não vai querer que sua documentação de API seja pública. Vamos adicionar uma camada simples de segurança (usuário e senha) para proteger nossa rota `/api-docs`.

### 3.1. Instalando a Dependência

Usaremos uma biblioteca chamada `express-basic-auth` para facilitar o processo. No terminal, execute:

```bash
npm install express-basic-auth
```

### 3.2. Configurando o Middleware de Autenticação

No seu `server.js`, logo após as outras importações (`require`), adicione o código para configurar a autenticação.

```javascript
// ...
const swaggerJsdoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth"); // Importe a biblioteca

// ...

// Configuração da autenticação básica
const auth = basicAuth({
  users: { admin: "supersecret" }, // Define um usuário 'admin' com a senha 'supersecret'
  challenge: true, // Faz com que o navegador exiba um pop-up de login.
  unauthorizedResponse: "Acesso não autorizado. Credenciais inválidas.",
});
```

**Aviso:** Em um projeto real, nunca coloque senhas diretamente no código. Use variáveis de ambiente (com `dotenv`, por exemplo) para carregar essas informações de forma segura.

### 3.3. Aplicando a Proteção à Rota do Swagger

Agora, vamos modificar a rota `/api-docs` para usar nosso middleware `auth` antes de servir a documentação.

```javascript
// Antes
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Depois
app.use("/api-docs", auth, swaggerUi.serve, swaggerUi.setup(specs));
```

A única mudança é adicionar `auth` como um dos argumentos do `app.use`. O Express executará os middlewares na ordem em que são passados. Assim, a autenticação será verificada antes de o Swagger UI ser exibido.

### 3.4. Testando a Proteção

1.  Reinicie seu servidor (`node server.js`).
2.  Abra seu navegador e acesse `http://localhost:3000/api-docs`.

Desta vez, o navegador deve exibir um pop-up pedindo usuário e senha.

- **Se você cancelar ou inserir as credenciais erradas**, receberá a mensagem "Acesso não autorizado".
Com essa simples adição, sua documentação agora está protegida contra acesso não autorizado.

---

## 4. Bônus: Atualização Parcial com PATCH

Na Aula 07 aprendemos a diferença conceitual entre **`PUT`** (substituição total) e **`PATCH`** (atualização parcial). Vamos implementar o `PATCH` para atualizar apenas campos pontuais (por exemplo, marcar uma tarefa como `completed: true` ou alterar o preço de um produto) sem precisar reenviar o objeto inteiro.

### 4.1. Implementando o endpoint PATCH

```javascript
app.patch("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  const { title, completed } = req.body;

  if (title === undefined && completed === undefined) {
    return res.status(400).json({ erro: "Envie ao menos um campo para atualizar." });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});
```

### 4.2. Documentando o PATCH com JSDoc no Swagger

```javascript
/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma tarefa
 *     description: "Permite atualizar apenas campos específicos (ex: marcar como concluída) sem reenviar todos os dados."
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             completed: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *       404:
 *         description: Tarefa não encontrada.
 */
```
Reinicie o servidor (`node server.js`) e veja o endpoint `PATCH` aparecer automaticamente na documentação do Swagger UI (`http://localhost:3000/api-docs`)!

