# Aula 06: Integração BD + CRUD
Conectando Node.js ao Banco de Dados e Implementando o CRUD 

## Visão geral

Na aula anterior, construímos a fundação do nosso banco de dados com PostgreSQL. Agora, é hora de conectar nossa aplicação Node.js a esse banco e substituir nossos dados em memória por operações de banco de dados reais e persistentes. Vamos implementar o CRUD (Create, Read, Update, Delete) completo para a nossa API de gerenciamento de tarefas.

## Objetivos da aula

Ao final desta aula, você deverá ser capaz de:

- Conectar uma aplicação Node.js a um banco de dados PostgreSQL usando a biblioteca `pg`.
- Implementar as quatro operações CRUD em uma API Express.
- Utilizar a cláusula `RETURNING` do PostgreSQL para obter os dados inseridos ou atualizados em uma única query.
- Refatorar uma API para trocar o armazenamento em memória por um banco de dados persistente.

## Roteiro para o Aluno

1.  **Revisão da Aula 05**: A aula começará com uma breve revisão prática sobre as diferenças entre SGBDs (MySQL vs. PostgreSQL) e o uso do terminal `psql`, como discutido anteriormente.
2.  **Conceitos de Conexão**: Entender como o Node.js se comunica com o PostgreSQL usando a biblioteca `pg`.
3.  **Laboratório Prático**: Seguir as instruções no arquivo [laboratorio.md](laboratorio.md) para refatorar a API de tarefas, implementando cada uma das operações CRUD com o banco de dados.
4.  **Testes**: Validar cada endpoint da API usando o Postman para garantir que a integração com o banco de dados está funcionando.

## Conceitos Fundamentais

### 1. Revisão Rápida da Aula 05

Antes de mergulhar no código, vamos reforçar dois pontos cruciais da última aula que frequentemente confundem desenvolvedores que vêm de outros bancos como o MySQL:

- **Comandos de Console**: Lembre-se que `SHOW DATABASES;` não funciona no `psql`. Use `\l` para listar os bancos e `\c task_manager` para se conectar ao banco correto.
- **A Importância da Conexão**: O PostgreSQL opera estritamente dentro do banco de dados ao qual você está conectado. Erros como "tabela não encontrada" ao tentar criar um índice (`CREATE INDEX`) geralmente significam que você não está conectado ao banco de dados certo (`task_manager`, no nosso caso).

### 2. O que é um Índice (Index) e por que usá-lo?

No `laboratorio.md` da aula anterior, havia um comando `CREATE INDEX` no final do script. Embora não tenhamos focado nele, é um conceito crucial para a performance de qualquer banco de dados.

**Analogia**: Pense no índice de um livro. Em vez de folhear o livro inteiro para encontrar um capítulo, você vai direto ao índice, encontra o número da página e pula para lá. Um **índice de banco de dados** funciona da mesma forma.

- **O que é?**: Um índice é uma estrutura de dados especial que o banco de dados mantém para encontrar linhas em uma tabela muito mais rapidamente. Ele armazena os valores de uma ou mais colunas e um ponteiro para a localização física da linha correspondente.

- **Por que usar?**: Sem um índice, para encontrar uma tarefa com um `user_id` específico (`SELECT * FROM tasks WHERE user_id = 123`), o banco de dados teria que fazer um "scan" completo na tabela, ou seja, ler **todas as linhas** uma por uma para ver qual delas corresponde ao critério. Em uma tabela com milhões de registros, isso seria extremamente lento. Com um índice na coluna `user_id`, o banco de dados consulta o índice (que é otimizado para busca rápida) e vai direto para as linhas corretas.

- **Qual o custo?**: Índices não são gratuitos.
  1.  **Espaço em Disco**: Eles ocupam espaço adicional.
  2.  **Performance de Escrita**: Operações como `INSERT`, `UPDATE` e `DELETE` ficam um pouco mais lentas, pois o banco de dados precisa atualizar não apenas a tabela, mas também seus índices.

- **Quando criar um índice?**: A regra geral é criar índices em colunas que são:
  - Frequentemente usadas em cláusulas `WHERE`.
  - Usadas em `JOINs` (chaves estrangeiras são as principais candidatas, e o PostgreSQL até cria alguns índices para elas automaticamente, mas é uma boa prática garantir que existam).

A criação do índice em `user_id` (`CREATE INDEX idx_tasks_user_id ON tasks(user_id);`) é uma otimização fundamental para nossa API, pois frequentemente buscaremos todas as tarefas de um usuário específico.

### 3. Conectando Node.js ao PostgreSQL com `node-postgres` (pg)

Para que nossa aplicação Node.js possa "conversar" com o PostgreSQL, precisamos de um "tradutor" ou "driver". A biblioteca mais popular e robusta para isso é a `node-postgres`, geralmente importada como `pg`.

#### Como funciona?

A biblioteca `pg` nos permite criar um **cliente** ou um **pool de conexões** que gerencia a comunicação com o servidor do PostgreSQL.

- **Cliente (`Client`)**: Representa uma única conexão com o banco. É mais simples, mas menos eficiente para uma aplicação web, que precisa lidar com múltiplas requisições simultaneamente.
- **Pool de Conexões (`Pool`)**: É a abordagem recomendada para aplicações web. O `Pool` gerencia um conjunto de clientes (conexões). Quando sua aplicação precisa fazer uma consulta, ela "pega emprestado" um cliente do pool e o "devolve" quando termina. Isso evita o custo de abrir e fechar uma nova conexão para cada requisição, melhorando muito a performance.

#### Configurando a Conexão

Geralmente, criamos um arquivo de configuração separado para o banco de dados, para não deixar dados sensíveis (como senhas) espalhados pelo código.

```javascript
// Exemplo de configuração em um arquivo db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task_manager", // O nome do nosso banco!
  password: "sua-senha-aqui",
  port: 5432,
});

// Exportamos uma função para executar queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

### 4. Implementando o CRUD

Com a conexão configurada, podemos traduzir cada operação do CRUD para uma consulta SQL a ser executada pelo `pg`.

#### CREATE -> `INSERT ... RETURNING`

Para criar um novo recurso, usamos o `INSERT`. Uma funcionalidade poderosa do PostgreSQL é a cláusula `RETURNING`, que nos permite obter os dados do registro que acabamos de inserir (como o `id` gerado automaticamente) sem precisar fazer uma segunda consulta.

```javascript
// Rota: POST /tasks
const query = "INSERT INTO tasks(title, user_id) VALUES($1, $2) RETURNING *";
const values = ["Nova Tarefa", 1];
const result = await db.query(query, values);
// result.rows[0] conterá a tarefa recém-criada
```

#### READ -> `SELECT`

Para ler dados, usamos o `SELECT`. Podemos buscar todos os recursos ou um específico usando a cláusula `WHERE`.

```javascript
// Rota: GET /tasks
const result = await db.query("SELECT * FROM tasks");
// result.rows conterá um array de todas as tarefas

// Rota: GET /tasks/:id
const result = await db.query("SELECT * FROM tasks WHERE id = $1", [
  req.params.id,
]);
// result.rows[0] conterá a tarefa específica
```

#### UPDATE -> `UPDATE ... RETURNING`

Para atualizar um recurso, usamos o `UPDATE`. Assim como no `INSERT`, podemos usar `RETURNING *` para obter a versão atualizada do registro em uma única operação.

```javascript
// Rota: PUT /tasks/:id
const query = "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *";
const values = ["concluída", req.params.id];
const result = await db.query(query, values);
// result.rows[0] conterá a tarefa atualizada
```

#### DELETE -> `DELETE`

Para remover um recurso, usamos o `DELETE`.

```javascript
// Rota: DELETE /tasks/:id
await db.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
// A operação é concluída, geralmente retornamos um status 204 No Content
```

---

Com esses conceitos em mente, estamos prontos para colocar a mão na massa. Acesse o [laboratorio.md](laboratorio.md) para transformar nossa API de tarefas em uma aplicação com dados persistentes!
