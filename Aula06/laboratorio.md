# Laboratório Aula 06: API de Tarefas com Banco de Dados Persistente

## Objetivo

Neste laboratório, vamos refatorar completamente a nossa API de gerenciamento de tarefas. Substituiremos o array que armazenava os dados em memória por consultas a um banco de dados PostgreSQL, tornando nossos dados finalmente persistentes.

## Ferramentas Necessárias

- **Node.js** e **VS Code**
- **Postman** para testar os endpoints da API.
- **PostgreSQL** e **DBeaver** (ou pgAdmin) configurados e com o banco `task_manager` criado, conforme a Aula 05.

## Passo a Passo

### Parte 1: Preparando o Projeto

#### 1. Instalar a Biblioteca `pg`

No terminal, na raiz do seu projeto, instale o driver `node-postgres`:

```bash
npm install pg
```

#### 2. Criar o Módulo de Conexão com o Banco

Para manter nosso código organizado e centralizar a configuração do banco, vamos criar um novo arquivo para gerenciar a conexão.

1.  Na pasta `src`, crie um arquivo chamado `db.js`.
2.  Adicione o seguinte código a ele, **substituindo `'sua-senha-aqui'` pela senha que você definiu para o usuário `postgres`**:

    ```javascript
    // src/db.js

    const { Pool } = require("pg");

    // Configuração da conexão com o banco de dados
    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "task_manager", // O nome do nosso banco de dados
      password: "sua-senha-aqui", // ATENÇÃO: Troque pela sua senha!
      port: 5432,
    });

    // Mensagem para verificar se a conexão foi bem-sucedida
    pool.on("connect", () => {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    });

    // Exportamos um objeto com um método 'query' que encapsula a execução de consultas
    module.exports = {
      query: (text, params) => pool.query(text, params),
    };
    ```

    **Boas Práticas**: Em um projeto real, nunca colocaríamos a senha diretamente no código. Usaríamos variáveis de ambiente (com um arquivo `.env` e a biblioteca `dotenv`) para proteger essas informações sensíveis.

### Parte 2: Refatorando a API para Usar o Banco de Dados

Agora, vamos modificar nosso arquivo principal da API (geralmente `src/server.js` ou `src/index.js`) para usar o módulo `db.js` que acabamos de criar.

#### 1. Importar o Módulo `db`

No topo do seu arquivo de servidor, importe o nosso novo módulo de banco de dados.

```javascript
// ... outras importações (express, etc.)
const db = require("./db"); // Importa nosso módulo de conexão
```

#### 2. Refatorar a Rota `GET /tasks` (Listar Todas as Tarefas)

Substitua o código que retornava o array em memória por uma consulta SQL.

**Antes:**

```javascript
app.get("/tasks", (req, res) => {
  res.json(tasks); // 'tasks' era um array em memória
});
```

**Depois:**

```javascript
app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});
```

#### 3. Refatorar a Rota `GET /tasks/:id` (Buscar Tarefa por ID)

**Antes:**

```javascript
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Tarefa não encontrada.");
  res.json(task);
});
```

**Depois:**

```javascript
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});
```

#### 4. Refatorar a Rota `POST /tasks` (Criar Tarefa)

Aqui, usaremos a cláusula `RETURNING *` para obter a tarefa recém-criada.

**Antes:**

```javascript
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: "pendente",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
```

**Depois:**

```javascript
app.post("/tasks", async (req, res) => {
  const { title, description, status, user_id } = req.body;

  // Validação simples
  if (!title || !user_id) {
    return res.status(400).send("Título e user_id são obrigatórios.");
  }

  const query = `
    INSERT INTO tasks (title, description, status, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, description || null, status || "pendente", user_id];

  try {
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});
```

#### 5. Refatorar a Rota `PUT /tasks/:id` (Atualizar Tarefa)

**Antes:**

```javascript
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Tarefa não encontrada.");

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  res.json(task);
});
```

**Depois:**

```javascript
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  // Para ser mais robusto, vamos buscar a tarefa atual primeiro
  // e depois construir a query de UPDATE dinamicamente.
  try {
    const currentTaskResult = await db.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id],
    );
    if (currentTaskResult.rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }

    const currentTask = currentTaskResult.rows[0];

    const newTitle = title || currentTask.title;
    const newDescription = description || currentTask.description;
    const newStatus = status || currentTask.status;

    const updateQuery = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [newTitle, newDescription, newStatus, id];

    const result = await db.query(updateQuery, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});
```

#### 6. Refatorar a Rota `DELETE /tasks/:id` (Deletar Tarefa)

**Antes:**

```javascript
app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send("Tarefa não encontrada.");

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});
```

**Depois:**

```javascript
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }

    res.status(204).send(); // 204 No Content é a resposta padrão para um DELETE bem-sucedido
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});
```

### Parte 3: Testando a API Persistente

1.  **Inicie o Servidor**: `node src/server.js` (ou usando `nodemon`). Você deve ver a mensagem "Conexão com o banco de dados estabelecida com sucesso!".
2.  **Abra o Postman**.
3.  **Teste o `POST`**: Crie algumas tarefas novas. Lembre-se de que agora você precisa enviar um `user_id` no corpo da requisição. Verifique no DBeaver se os dados foram inseridos na tabela `tasks`.
4.  **Teste o `GET`**: Busque todas as tarefas. Reinicie o servidor e busque novamente. As tarefas devem continuar lá!
5.  **Teste o `GET /:id`**: Busque uma tarefa específica pelo seu ID.
6.  **Teste o `PUT`**: Atualize o status ou o título de uma tarefa.
7.  **Teste o `DELETE`**: Remova uma tarefa.

## O que será observado

- A correta instalação e configuração da biblioteca `pg`.
- A criação de um módulo de banco de dados reutilizável (`db.js`).
- A refatoração bem-sucedida de todos os endpoints do CRUD para interagir com o PostgreSQL.
- O uso de `async/await` e blocos `try...catch` para lidar com as operações assíncronas do banco de dados.
- A API funcionando corretamente, com os dados persistindo após a reinicialização do servidor.

Parabéns! Você transformou sua API de protótipo em uma aplicação robusta com um banco de dados real.
