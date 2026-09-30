# API de Produtos — Loja de Informática

Atividade **A1** desenvolvida com **Node.js** e **Express**, praticando módulos, rotas, middlewares, parâmetros de rota e logging colorido por status code.

**Nível escolhido:** Avançado

## Aluno

- **Nome:** Daniel Medeiros da Silva
- **Turno:** Noturno

## Sobre a API

API para gerenciar produtos de uma loja de informática, com dados mantidos **em memória** (ou seja, ao reiniciar o servidor, a lista volta ao estado inicial).

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

### Passos

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor
node app.js
```

O servidor sobe em `http://localhost:3000`.

## Estrutura do projeto

```
.
├── app.js                 # Servidor Express: configuração, middlewares e rotas
├── package.json
├── data/
│   └── produtos.js        # Módulo com os dados em memória e o gerador de id
├── middlewares/
│   └── logger.js          # Middleware de log colorido por status code
└── evidencias/             # Prints dos testes realizados no Postman/Insomnia
```

## Fluxo da requisição

Toda requisição passa pela seguinte sequência antes de chegar na rota:

```
Requisição chega
      ↓
express.json()      → converte o corpo JSON da requisição em objeto JavaScript
      ↓
logger              → registra o método, a URL e (após a resposta) o status code
      ↓
rota correspondente → processa e responde
```

O `logger` usa o evento `res.on("finish")`, disparado quando a resposta já foi enviada, para conseguir registrar o **status code real** da resposta. A linha impressa no terminal é colorida com o pacote `colors`:

- 🟢 **verde** — sucesso (status 2xx)
- 🟡 **amarelo** — erro do cliente (status 4xx, ex.: dados inválidos ou não encontrado)
- 🔴 **vermelho** — erro do servidor (status 5xx)

## Endpoints

### `GET /produtos`

Lista todos os produtos cadastrados.

- **Sucesso:** `200 OK` — retorna um array de produtos

### `GET /produtos/:id`

Retorna um produto específico pelo id.

- **Sucesso:** `200 OK` — retorna o produto encontrado
- **Erro:** `404 Not Found` — id não existe

### `POST /produtos`

Cria um novo produto. O `id` é gerado automaticamente pelo servidor (contador interno).

**Corpo esperado (JSON):**

```json
{
  "descricao": "Memória RAM",
  "preco": 400
}
```

- **Sucesso:** `201 Created` — retorna o produto criado, incluindo o `id`
- **Erro:** `400 Bad Request` — `descricao` ausente/vazia ou `preco` ausente/inválido

### `PUT /produtos/:id`

Atualiza a `descricao` e o `preco` de um produto existente. O `id` não pode ser alterado.

**Corpo esperado (JSON):**

```json
{
  "descricao": "Ryzen 7",
  "preco": 1800
}
```

- **Sucesso:** `200 OK` — retorna o produto atualizado
- **Erro:** `404 Not Found` — id não existe
- **Erro:** `400 Bad Request` — `descricao` ausente/vazia ou `preco` ausente/inválido

### `DELETE /produtos/:id`

Remove um produto pelo id.

- **Sucesso:** `204 No Content` — sem corpo na resposta
- **Erro:** `404 Not Found` — id não existe

## Resumo dos status codes

| Rota | Sucesso | Erros possíveis |
|---|---|---|
| `GET /produtos` | `200` | — |
| `GET /produtos/:id` | `200` | `404` |
| `POST /produtos` | `201` | `400` |
| `PUT /produtos/:id` | `200` | `404`, `400` |
| `DELETE /produtos/:id` | `204` | `404` |

## Validações

Nas rotas `POST` e `PUT`, os dados do corpo da requisição são validados antes de qualquer alteração:

- `descricao`: obrigatória, deve ser um texto não vazio
- `preco`: obrigatório, deve ser um número maior ou igual a zero

Se algum campo for inválido, a rota responde `400 Bad Request` com uma mensagem explicando o problema, e nenhum dado é alterado.

## Testes realizados

Todos os endpoints foram testados manualmente com Postman/Insomnia. As evidências (prints das requisições e das respostas, além do terminal mostrando o log colorido) estão na pasta [`evidencias/`](./evidencias).

Casos testados:

- `GET /produtos` e `GET /produtos/:id` (sucesso e `404`)
- `POST /produtos` (sucesso e `400` para dados inválidos)
- `PUT /produtos/:id` (sucesso, `404` e `400`)
- `DELETE /produtos/:id` (sucesso e `404` ao tentar remover novamente)
- Geração de id sem repetição após remover e criar produtos
- Log colorido: verde para sucesso, amarelo para erros de cliente

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [colors](https://www.npmjs.com/package/colors) — coloração do log no terminal