# Laboratório 07: Refatorando uma API para o Padrão RESTful

## Objetivo

Neste laboratório, vamos pegar uma API de "tarefas" que funciona, mas não segue os padrões RESTful, e vamos refatorá-la passo a passo para que ela se torne uma API RESTful de verdade, utilizando os métodos e códigos de status HTTP corretos.

---

## 1. Configuração Inicial

Vamos começar com um código-base simples. Crie um arquivo `server.js` e cole o seguinte código:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// "Banco de dados" em memória
let tasks = [
  { id: 1, title: "Aprender Node.js", completed: false },
  { id: 2, title: "Criar uma API", completed: true },
];
let nextId = 3;

// Rota para buscar todas as tarefas
app.get("/getTasks", (req, res) => {
  res.status(200).json(tasks);
});

// Rota para buscar uma tarefa por ID
app.get("/getTaskById", (req, res) => {
  const id = parseInt(req.query.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(200).send("Tarefa não encontrada");
  }
});

// Rota para criar uma nova tarefa
app.post("/createTask", (req, res) => {
  const newTask = req.body.task;
  newTask.id = nextId++;
  tasks.push(newTask);
  res.send("Tarefa criada com sucesso!");
});

// Rota para atualizar uma tarefa
app.post("/updateTask", (req, res) => {
  const id = parseInt(req.body.id);
  const updatedData = req.body.data;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
    res.json(tasks[taskIndex]);
  } else {
    res.send("Tarefa não encontrada para atualizar");
  }
});

// Rota para deletar uma tarefa
app.get("/deleteTask", (req, res) => {
  const id = parseInt(req.query.id);
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length < initialLength) {
    res.send("Tarefa deletada com sucesso");
  } else {
    res.send("Nenhuma tarefa encontrada com esse ID para deletar");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

**Instale o Express e execute o servidor:**

```bash
npm init -y
npm install express
node server.js
```

---

## 2. Analisando e Refatorando

Use o Postman ou Insomnia para testar as rotas atuais. Veja como elas estão funcionando e identifique os problemas em relação aos princípios REST.

Agora, vamos refatorar cada endpoint.

### Refatoração 1: Listar Tarefas (`GET /tasks`)

A rota atual é `GET /getTasks`.

- **Problema:** A URI usa um verbo ("get").
- **Solução:** Mude a URI para `/tasks`, que é um substantivo no plural representando a coleção de recursos.

```javascript
// Antes
// app.get('/getTasks', (req, res) => { ... });

// Depois
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});
```

### Refatoração 2: Buscar Tarefa por ID (`GET /tasks/:id`)

A rota atual é `GET /getTaskById?id=1`.

- **Problema:** A URI usa um verbo e passa o identificador via _query parameter_. O padrão REST é usar _path parameters_ para identificar um recurso específico. Além disso, retorna status `200` mesmo quando a tarefa não é encontrada.
- **Solução:** Mude a URI para `/tasks/:id` e use `req.params.id`. Retorne `404 Not Found` se a tarefa não existir.

```javascript
// Antes
// app.get('/getTaskById', (req, res) => { ... });

// Depois
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send("Tarefa não encontrada");
  }
});
```

### Refatoração 3: Criar Tarefa (`POST /tasks`)

A rota atual é `POST /createTask`.

- **Problema:** A URI usa um verbo. A resposta de sucesso é uma mensagem genérica com status `200`.
- **Solução:** Mude a URI para `/tasks`. Use o status `201 Created` e retorne o objeto que foi criado.

```javascript
// Antes
// app.post('/createTask', (req, res) => { ... });

// Depois
app.post("/tasks", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).send("O título da tarefa é obrigatório.");
  }

  const newTask = {
    id: nextId++,
    title,
    completed,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
```

### Refatoração 4: Atualizar Tarefa (`PUT /tasks/:id`)

A rota atual é `POST /updateTask`.

- **Problema:** Usa o método `POST` para atualizar, o que não é semanticamente correto. A URI também usa um verbo.
- **Solução:** Mude para o método `PUT` (ou `PATCH`) e use a URI `/tasks/:id`. `PUT` substitui o recurso inteiro.

```javascript
// Antes
// app.post('/updateTask', (req, res) => { ... });

// Depois (usando PUT para substituição completa)
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send("Tarefa não encontrada");
  }

  const { title, completed } = req.body;
  if (!title || typeof completed !== "boolean") {
    return res.status(400).send("Dados incompletos para atualização.");
  }

  tasks[taskIndex] = { id, title, completed };
  res.status(200).json(tasks[taskIndex]);
});
```

### Refatoração 5: Deletar Tarefa (`DELETE /tasks/:id`)

A rota atual é `GET /deleteTask?id=1`.

- **Problema:** Usa `GET` para uma operação destrutiva, o que é perigoso e incorreto.
- **Solução:** Mude para o método `DELETE` com a URI `/tasks/:id`. Retorne `204 No Content` em caso de sucesso.

```javascript
// Antes
// app.get('/deleteTask', (req, res) => { ... });

// Depois
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send("Tarefa não encontrada");
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // 204 No Content
});
```

---

## 3. Conclusão

Após as refatorações, sua API estará muito mais limpa, previsível e alinhada com os padrões RESTful. Compare o antes e o depois e veja como a semântica das URIs, métodos e códigos de status torna a API mais fácil de entender e usar.
