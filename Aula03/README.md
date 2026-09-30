# Aula 03 - Introdução ao Express.js

> ### 📦 Dependências da Aula
> Se você estiver criando esta aula em uma nova pasta, inicialize o projeto e instale o Express:
> ```powershell
> npm init -y
> npm install express
> ```

---

Chegou a hora de construir nosso primeiro servidor web! Nesta aula, vamos usar o **Express.js**, o framework mais popular do ecossistema Node.js, para criar uma API de forma rápida e organizada.

## Objetivos da Aula

- Entender o que é o Express.js e por que ele é tão utilizado.
- Criar um servidor web básico que responde a requisições.
- Definir **rotas** para diferentes métodos HTTP (GET, POST, etc.).
- Manipular os objetos de requisição (`req`) e resposta (`res`).
- Construir uma pequena API para gerenciar uma lista de tarefas em memória.

## Roteiro para o Aluno

1.  **Leitura**: Entenda os conceitos de Servidor, Rotas e os objetos `req`/`res` abaixo.
2.  **Laboratório**: Siga as instruções no arquivo [laboratorio.md](laboratorio.md) para construir sua primeira API.
3.  **Teste**: Use uma ferramenta como **Postman** ou **Insomnia** para testar as rotas que você criou.

## Conceitos Fundamentais

### O que é Express.js?

Se o Node.js é o motor de um carro, o Express.js é a carroceria, o chassi e o painel. Ele é um **framework** que fornece um conjunto de ferramentas e abstrações para simplificar a criação de aplicações web e APIs, economizando muito tempo e código.

### Servidor e Rotas

- **Servidor**: É o programa que "escuta" por requisições em uma determinada porta (ex: porta 3000) e envia uma resposta.
- **Rotas**: São as "URLs" da nossa aplicação. Cada rota é associada a um método HTTP (como `GET` ou `POST`) e a uma função que será executada quando aquela rota for acessada.

**Exemplo de uma rota `GET`:**

```javascript
// Quando alguém acessar a URL "/" com o método GET...
app.get("/", (req, res) => {
  // ...esta função será executada.
  res.send("Olá, mundo!");
});
```

### Requisição (`req`) e Resposta (`res`)

Em cada rota, você tem acesso a dois objetos principais:

1.  **`req` (Request / Requisição)**: Contém todas as informações sobre a requisição que o cliente enviou, como:
    - `req.params`: Parâmetros na URL (ex: o `id` em `/tarefas/:id`).
    - `req.query`: Parâmetros de busca (ex: `?status=pendente`).
    - `req.body`: O corpo da requisição, geralmente usado em `POST` e `PUT` para enviar dados (ex: um JSON).
    - `req.headers`: Os cabeçalhos da requisição.

2.  **`res` (Response / Resposta)**: É o objeto que usamos para construir e enviar a resposta de volta ao cliente. Alguns métodos comuns são:
    - `res.send()`: Envia uma resposta de texto simples.
    - `res.json()`: Envia uma resposta em formato JSON.
    - `res.status()`: Define o código de status da resposta (ex: `res.status(201)` para "Created").

---

Entendeu a base? Ótimo! Agora vamos colocar a mão na massa no [laboratorio.md](laboratorio.md).
