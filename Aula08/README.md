# Aula 08: Documentação de APIs com Postman e Swagger

> ### 📦 Dependências da Aula
> Esta aula integra o Swagger UI e proteção com autenticação básica na API Express:
> ```powershell
> npm init -y
> npm install express swagger-ui-express swagger-jsdoc express-basic-auth
> ```

---

## Objetivos da Aula

- Compreender a importância de uma boa documentação para APIs.
- Aprender a criar e compartilhar coleções de requisições no Postman.
- Introduzir o padrão OpenAPI (Swagger) para gerar documentação interativa e automatizada.
- Implementar um middleware de autenticação simples baseado em token.

---

## 1. Por que documentar uma API?

Uma API é uma interface para outros desenvolvedores. Sem uma boa documentação, ela se torna uma "caixa preta", difícil de usar e integrar.

**Uma boa documentação serve como:**

- **Um Contrato:** Define claramente o que a API espera como entrada e o que ela retorna como saída.
- **Um Manual de Instruções:** Guia os consumidores (front-end, mobile, outras APIs) sobre como interagir com cada endpoint.
- **Uma Ferramenta de Testes:** Permite que desenvolvedores e QAs testem os endpoints de forma isolada.
- **Um Facilitador de Onboarding:** Ajuda novos membros da equipe a entenderem rapidamente a arquitetura e o funcionamento da API.

**O que uma boa documentação deve conter?**

- Lista de todos os endpoints disponíveis.
- Para cada endpoint:
  - O método HTTP (GET, POST, PUT, DELETE, etc.).
  - A URI completa.
  - Descrição do que o endpoint faz.
  - Parâmetros esperados (path, query, body).
  - Exemplos de requisição.
  - Possíveis respostas de sucesso e erro, com seus respectivos status codes e exemplos de corpo da resposta.
  - Informações sobre autenticação (se necessária).

---

## 2. Documentando com Postman

O Postman é uma ferramenta poderosa que vai além de simplesmente testar requisições. Ele permite criar **Coleções (Collections)**, que são grupos organizados de requisições que podem ser salvas, compartilhadas e documentadas.

### Boas Práticas no Postman

- **Crie uma Coleção para cada API:** Mantenha as requisições de um mesmo projeto agrupadas.
- **Descreva cada Requisição:** Use o campo de descrição para explicar o propósito de cada endpoint.
- **Salve Exemplos de Respostas:** Para cada requisição, salve exemplos de respostas de sucesso (200, 201) e de erro (404, 400). Isso permite que os consumidores da API vejam o que esperar sem precisar executar a requisição.
- **Use Variáveis de Ambiente:** Para valores que mudam entre ambientes (desenvolvimento, produção), como a URL base da API (`{{baseUrl}}`) ou tokens de autenticação (`{{token}}`), use variáveis de ambiente.

---

## 3. Documentação Automatizada com Swagger (OpenAPI)

Enquanto o Postman é ótimo para criar documentação manual, o **Swagger** (que implementa a **Especificação OpenAPI**) permite gerar uma documentação interativa e visual diretamente a partir do seu código-fonte.

### O que é OpenAPI?

A Especificação OpenAPI é um padrão aberto para descrever APIs RESTful. É um arquivo (YAML ou JSON) que define todos os aspectos da sua API.

### O que é Swagger?

Swagger é um conjunto de ferramentas para implementar a especificação OpenAPI. As mais famosas são:

- **Swagger UI:** Gera uma página web interativa a partir de um arquivo de especificação OpenAPI. Permite que qualquer pessoa visualize e teste os endpoints da API diretamente no navegador.
- **Swagger Editor:** Uma ferramenta para escrever e validar arquivos de especificação OpenAPI.

### Como funciona no Express?

Em um projeto Express, usamos bibliotecas como `swagger-ui-express` e `swagger-jsdoc` para:

1.  Escrever a documentação em formato de comentários (JSDoc) diretamente acima de cada rota no nosso código.
2.  A biblioteca `swagger-jsdoc` lê esses comentários e gera o arquivo `swagger.json` (a especificação OpenAPI).
3.  A biblioteca `swagger-ui-express` pega esse `swagger.json` e gera a página de documentação interativa em uma nova rota da nossa API (ex: `/api-docs`).

**Vantagem:** A documentação vive junto com o código. Se você altera uma rota, você altera o comentário de documentação no mesmo lugar, mantendo tudo sincronizado.

---

## 4. Autenticação com Token (Visão Geral)

APIs públicas geralmente precisam proteger alguns de seus endpoints. Uma das formas mais comuns de fazer isso é através de um **token de autenticação**.

O fluxo básico é:

1.  **Endpoint de Login:** O cliente envia suas credenciais (ex: email e senha) para um endpoint específico, como `POST /login`.
2.  **Geração do Token:** Se as credenciais forem válidas, o servidor gera um token (uma string longa e única, geralmente um JWT - JSON Web Token) e o retorna para o cliente.
3.  **Requisições Autenticadas:** Para acessar endpoints protegidos, o cliente deve incluir esse token em todas as requisições subsequentes, geralmente no cabeçalho `Authorization`.
    - Ex: `Authorization: Bearer <seu-token-aqui>`
4.  **Middleware de Verificação:** No servidor, criamos um **middleware** que é executado antes de cada rota protegida. Esse middleware verifica se o cabeçalho `Authorization` existe, se o token é válido e, em caso afirmativo, permite que a requisição prossiga. Caso contrário, retorna um erro `401 Unauthorized`.
