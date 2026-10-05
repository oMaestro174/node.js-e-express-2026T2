# API de Controle de Estoque 

API desenvolvida em Node.js utilizando o framework Express, estruturada em camadas, contendo operações CRUD completas para gerenciamento de produtos de papelaria, sistema de logging colorido com o pacote `colors`, e um middleware de autenticação por token fixo para proteção de rotas sensíveis.

## Tecnologias Utilizadas
- **Node.js** (Ambiente de execução JavaScript)
- **Express** (Framework web)
- **Colors** (Biblioteca para formatação de logs coloridos no terminal)

## Estrutura do Projeto

O projeto está organizado com separação de responsabilidades em pastas:

amanda-karolina-vasques-nascimento/
├── src/
│   ├── data/
│   │   └── produtos.js         # Base de dados em memória
│   ├── middlewares/
│   │   ├── auth.js             # Middleware de autenticação por token
│   │   └── logger.js           # Middleware de registro de requisições com cores
│   ├── routes/
│   │   └── produtoRoutes.js    # Definição das rotas de produtos (CRUD)
│   └── server.js               # Arquivo principal de inicialização do servidor
├── package.json
└── README.md


## Instruções de Execução

Siga os passos abaixo para rodar o projeto localmente na sua máquina:

1. **Clone o repositório e acesse a pasta do projeto.**
2. **Instale as dependências:**

```bash
npm install

```


3. **Inicie o servidor:**

```bash
npm start

```
4. O servidor será inicializado e exibirá a mensagem com a URL no terminal:
`Servidor rodando em http://localhost:3000`


## Documentação dos Endpoints

| Método  |      Rota       |             Descrição                  | Autenticação Necessária? |     Status de Sucesso       |
| ------- |   ------------  | ------------------------------------   | ------------------------ |  ------------------------   |
| **GET** | `/`             | Retorna mensagem de boas-vindas da API | Não                      | `200 OK`                    |
| **GET** | `/produtos`     | Lista todos os produtos cadastrados    | Não                      | `200 OK`                    |
| **GET** | `/produtos/:id` | Busca um produto específico pelo ID    | Não                      | `200 OK` ou `404 Not Found` |
| **POST**| `/produtos`     | Cadastra um novo produto               | **Sim (Header)**         | `201 Created`               |
| **PUT** | `/produtos/:id` | Atualiza os dados de um produto        | **Sim (Header)**         | `200 OK` ou `404 Not Found` |
|**DELETE**| `/produtos/:id`| Remove um produto do estoque           | **Sim (Header)**         | `200 OK` ou `404 Not Found` |



## Como Utilizar os Headers de Autenticação (Requisito Jedi)

As rotas de alteração de dados (**POST**, **PUT** e **DELETE**) são protegidas por um middleware de autenticação personalizado. Para acessá-las com sucesso, é obrigatório enviar o token de acesso nos cabeçalhos (*Headers*) da requisição:

* **Chave (Key):** `authorization`
* **Valor (Value):** `token-123`

### Tratamento de Erros de Autenticação

* Caso o token **não seja enviado** ou esteja **incorreto**, a API bloqueará a requisição imediatamente e retornará o status **`401 Unauthorized`** acompanhado de uma mensagem JSON:

```json
{
  "erro": "Acesso negado! Token não fornecido no header (authorization)."
}

