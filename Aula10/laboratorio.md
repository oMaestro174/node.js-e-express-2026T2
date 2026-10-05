# Laboratório Aula 10: Testes de Integração com Jest e Supertest

Neste laboratório, vamos adicionar uma camada de testes de integração ao projeto final da Aula 09. Nosso objetivo é garantir que os endpoints da API se comportem como o esperado, validando os fluxos de autenticação e o CRUD de tarefas.

## Parte 1: Configurando o Ambiente de Testes

Vamos usar o **Jest** como nosso framework de testes e o **Supertest** para fazer requisições HTTP à nossa API de forma programática.

1.  **Copie o Projeto Final**:
    - Crie uma nova pasta, por exemplo, `meu-projeto-final-com-testes`.
    - Copie todo o conteúdo da pasta do seu projeto desenvolvido na **Aula 09** para dentro desta nova pasta.
    - Navegue até a nova pasta no seu terminal.

2.  **Instale as Dependências de Teste**:
    - No terminal, dentro da pasta do projeto, execute o comando para instalar o Jest e o Supertest como dependências de desenvolvimento:
      ```bash
      npm install jest supertest --save-dev
      ```

3.  **Configure o Script de Teste**:
    - Abra o arquivo `package.json`.
    - Na seção `"scripts"`, adicione o script de teste:
      ```json
      "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "jest"
      },
      ```
    - Agora você pode rodar seus testes com o comando `npm test`.

4.  **Crie a Pasta de Testes**:
    - Na raiz do seu projeto, crie uma pasta chamada `__tests__`. O Jest automaticamente procurará por arquivos de teste dentro dela.

## Parte 2: Escrevendo os Testes de Integração

Vamos criar dois arquivos de teste: um para autenticação (`auth.test.js`) e um para as tarefas (`tasks.test.js`).

### Testando a Autenticação

1.  **Crie o arquivo `__tests__/auth.test.js`**:
    - Este arquivo testará os endpoints `/register` e `/login`.

    ```javascript
    // __tests__/auth.test.js
    const request = require("supertest");
    const express = require("express");
    // Importe seu app Express. Pode ser necessário ajustar o caminho
    // e a forma como seu `server.js` exporta o app.
    // Para isso, vamos precisar refatorar o server.js

    // NOTA: Para que os testes funcionem sem iniciar o servidor real,
    // precisamos separar a criação do app da escuta da porta.

    // Altere seu server.js para exportar o app:
    /*
    // server.js
    const app = express();
    // ... toda a configuração ...
    // module.exports = app; // Exporte no final
    
    // E crie um novo arquivo start.js para iniciar o servidor
    // start.js
    const app = require('./server');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    */

    // Por simplicidade neste laboratório, vamos assumir que o app é importado corretamente.
    // Em um projeto real, a refatoração acima é a melhor prática.
    // Vamos adaptar o server.js da sua API da Aula 09 para ser testável.

    // Este teste é um exemplo e pode precisar de um banco de dados de teste.
    describe("Endpoints de Autenticação", () => {
      it("POST /auth/register - Deve registrar um novo usuário", async () => {
        // Simulação de um app Express para o exemplo
        const app = express();
        app.use(express.json());
        app.post("/auth/register", (req, res) => {
          const { username, password } = req.body;
          if (username && password) {
            res.status(201).json({ id: 1, username });
          } else {
            res.status(400).send();
          }
        });

        const response = await request(app)
          .post("/auth/register")
          .send({
            username: `testuser_${Date.now()}`,
            password: "password123",
          });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("username");
      });

      // Adicione aqui um teste para o endpoint de login
      // Dica: você precisará registrar um usuário primeiro.
    });
    ```

### Testando o CRUD de Tarefas

1.  **Crie o arquivo `__tests__/tasks.test.js`**:
    - Este arquivo testará os endpoints protegidos de tarefas.

    ```javascript
    // __tests__/tasks.test.js
    const request = require("supertest");
    const express = require("express");

    describe("Endpoints de Tarefas (Protegidos)", () => {
      let token;
      const app = express(); // Simulação do app

      // Antes de todos os testes, faça login para obter um token
      beforeAll(async () => {
        // Simule o processo de login para obter um token válido
        // Em um teste real, você faria uma requisição ao seu endpoint /login
        token = "um-token-jwt-simulado";
      });

      it("GET /tasks - Deve falhar sem um token", async () => {
        // Simulação de um endpoint protegido
        app.get("/tasks", (req, res) => {
          if (!req.headers.authorization) {
            return res.status(401).send();
          }
          res.status(200).json([]);
        });

        const response = await request(app).get("/tasks");
        expect(response.statusCode).toBe(401);
      });

      it("GET /tasks - Deve retornar as tarefas com um token válido", async () => {
        const response = await request(app)
          .get("/tasks")
          .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        // A resposta deve ser um array (pode estar vazio)
        expect(Array.isArray(response.body)).toBe(true);
      });

      // Adicione testes para POST, PUT e DELETE para as tarefas.
      // Lembre-se de sempre enviar o cabeçalho de autorização!
    });
    ```

## Parte 3: Simulação de Deploy com `NODE_ENV`

A variável de ambiente `NODE_ENV` é uma convenção usada em projetos Node.js para indicar em qual ambiente o código está rodando (`development`, `production`, `test`, etc.).

1.  **Modifique o `server.js`**:
    - Vamos adicionar uma lógica para que, em produção, não mostremos logs detalhados.

    ```javascript
    // server.js

    // ... no início do arquivo
    const app = express();
    const PORT = process.env.PORT || 3000;

    // ... middlewares ...

    // Middleware de log simples
    app.use((req, res, next) => {
      // Se não estiver em produção, mostre um log detalhado
      if (process.env.NODE_ENV !== "production") {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      }
      next();
    });

    // ... rotas ...

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      if (process.env.NODE_ENV === "production") {
        console.log("Rodando em ambiente de PRODUÇÃO!");
      }
    });
    ```

2.  **Simulando o Ambiente de Produção**:
    - Para iniciar o servidor em modo de produção, você pode definir a variável de ambiente antes do comando `node`.

    **No Linux/macOS:**

    ```bash
    NODE_ENV=production node server.js
    ```

    **No Windows (PowerShell):**

    ```powershell
    $env:NODE_ENV="production"; node server.js
    ```

    **No Windows (CMD):**

    ```cmd
    set NODE_ENV=production&&node server.js
    ```

    - Ao iniciar o servidor com `NODE_ENV=production`, você verá a mensagem "Rodando em ambiente de PRODUÇÃO!" e os logs de requisição não aparecerão no console.

## Desafio Final (A3)

- Complete os arquivos de teste `auth.test.js` e `tasks.test.js` para cobrir todos os endpoints e os principais cenários de erro (ex: tentar acessar uma tarefa de outro usuário, enviar dados inválidos, etc.).
- Prepare uma breve apresentação do seu projeto, demonstrando a API, a execução dos testes e explicando a estrutura do seu código.
