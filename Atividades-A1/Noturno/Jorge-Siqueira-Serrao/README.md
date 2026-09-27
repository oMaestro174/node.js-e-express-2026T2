# API de Alunos - Nivel Avancado

Implementacao da Atividade A1, realizada no turno noturno, usando Node.js e Express.

A API gerencia alunos em memoria e inclui as funcionalidades exigidas no nivel avancado:

- Rotas `GET`, `POST`, `PUT` e `DELETE`.
- Busca de aluno por ID com parametro de rota.
- Middleware de logging com status HTTP colorido usando `colors`.
- Organizacao do codigo em rotas e middleware separados.

## Tecnologias

- Node.js
- Express
- Colors

## Estrutura

```text
.
├── package.json
├── README.md
└── src/
        ├── app.js
        ├── middlewares/
        │   └── logger.js
        └── routes/
                └── alunos.js
```

## Execucao

Na pasta deste projeto, execute:

```bash
npm install
npm start
```

Servidor disponivel em `http://localhost:3000`.

## Endpoints

Todas as rotas usam o prefixo `/alunos`.

| Metodo | Rota | Funcao | Sucesso |
| --- | --- | --- | --- |
| GET | `/alunos` | Lista todos os alunos | 200 |
| GET | `/alunos/:id` | Busca um aluno pelo ID | 200 |
| POST | `/alunos` | Cadastra um aluno | 201 |
| PUT | `/alunos/:id` | Atualiza nome e/ou curso | 200 |
| DELETE | `/alunos/:id` | Remove um aluno | 200 |

### Exemplos de requisicao

Criar aluno:

```json
POST /alunos
Content-Type: application/json

{
    "nome": "Maria Oliveira",
    "curso": "Analise e Desenvolvimento de Sistemas"
}
```

Consultar um aluno existente:

```text
GET /alunos/1
```

As respostas de busca, atualizacao ou remocao de um ID inexistente retornam `404`. O cadastro sem `nome` ou `curso` retorna `400`.

## Dados e logging

Os dados ficam somente em memoria e sao perdidos quando o servidor e reiniciado. O middleware registra no terminal o metodo, a URL, o status HTTP e o tempo de resposta, usando cores diferentes para cada faixa de status.