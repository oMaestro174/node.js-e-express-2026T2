# Aula 09: Projeto Prático Integrador - Construindo uma API Completa

> ### 📦 Dependências da Aula
> Esta aula implementa a arquitetura em camadas completa com banco de dados, JWT e senhas criptografadas com Bcrypt:
> ```powershell
> npm init -y
> npm install express pg jsonwebtoken bcryptjs dotenv swagger-ui-express swagger-jsdoc
> ```

---

## Objetivos da Aula

- Consolidar todo o conhecimento adquirido em um único projeto prático.
- Implementar uma estrutura de projeto Node.js/Express escalável e organizada.
- Entender e aplicar a separação de responsabilidades (Rotas, Controladores, Middlewares).
- Implementar um fluxo de autenticação seguro usando JSON Web Tokens (JWT).
- Compreender a diferença entre autenticação e autorização e aplicar ambos na API.

> 📘 **Guia Recomendado:** Para entender a diferença prática entre rodar sua aplicação em modo de desenvolvimento vs. produção (`NODE_ENV`), leia o [Guia Prático: Ambiente de Desenvolvimento vs. Produção](../docs/desenvolvimento-vs-producao.md).

---

## 1. Arquitetura do Projeto: Organização e Escalabilidade

Quando um projeto cresce, manter todo o código em um único arquivo `server.js` se torna insustentável. A chave para um software de qualidade é a **organização** e a **separação de responsabilidades**.

Vamos adotar uma estrutura de pastas profissional, onde cada parte do sistema tem seu lugar e sua responsabilidade bem definidos.

### Estrutura de Pastas Proposta

```
/src
|-- /routes
|   |-- userRoutes.js
|   |-- taskRoutes.js
|   `-- index.js
|
|-- /controllers
|   |-- userController.js
|   `-- taskController.js
|
|-- /middlewares
|   `-- authMiddleware.js
|
|-- /db
|   `-- index.js
|
|-- .env
`-- server.js
```

### Responsabilidade de Cada Pasta

- **/src**: Pasta raiz que contém todo o nosso código-fonte.
- **/routes**: Define as URIs da nossa API. Cada arquivo aqui (ex: `userRoutes.js`) apenas mapeia um método HTTP e uma URI para uma função de um controlador. **Não contém lógica de negócio.**
- **/controllers**: O "cérebro" da aplicação. Cada função aqui (ex: `createUser`, `getTasks`) recebe a requisição da rota, executa a lógica de negócio (chama o banco de dados, valida dados), e envia a resposta final para o cliente.
- **/middlewares**: Funções que "filtram" ou "interceptam" as requisições antes de chegarem aos controladores. São perfeitas para tarefas como:
  - **Logging:** Registrar informações sobre cada requisição.
  - **Validação:** Verificar se os dados enviados pelo cliente são válidos.
  - **Autenticação:** Verificar se o cliente tem permissão para acessar a rota.
- **/db**: Centraliza a configuração e a conexão com o banco de dados.
- **server.js**: O ponto de entrada da nossa aplicação. Sua única responsabilidade é configurar o Express, carregar as rotas principais e iniciar o servidor.
- **.env**: Arquivo para armazenar variáveis de ambiente (segredos), como senhas de banco de dados e chaves de JWT.

---

## 2. Autenticação vs. Autorização

Estes dois conceitos são cruciais para a segurança de qualquer API.

- **Autenticação (Quem é você?):** É o processo de **verificar a identidade** de um usuário. Geralmente, isso é feito através de um login (usuário/senha). Se as credenciais estiverem corretas, o sistema "autentica" o usuário e confia que ele é quem diz ser. Em nossa API, o resultado de uma autenticação bem-sucedida será a entrega de um **JWT**.

- **Autorização (O que você pode fazer?):** É o processo de **verificar as permissões** de um usuário já autenticado. Só porque um usuário está logado (autenticado), não significa que ele pode fazer tudo.
  - **Exemplo em nossa API:** Um usuário `A` está autenticado. Ele pode criar, ver, editar e deletar **suas próprias tarefas**. No entanto, ele **não está autorizado** a ver, editar ou deletar as tarefas do usuário `B`. A autorização é a lógica que implementamos para garantir essa regra.

### Fluxo com JWT (JSON Web Token)

O JWT é o padrão de mercado para autenticação em APIs RESTful.

1.  **Login:** O cliente envia `email` e `senha` para `POST /login`.
2.  **Validação:** O servidor verifica as credenciais no banco de dados.
3.  **Geração do Token:** Se as credenciais estiverem corretas, o servidor gera um token JWT. Este token é como um "crachá" digital que contém informações sobre o usuário (como o `id`) e é assinado com uma chave secreta que só o servidor conhece.
4.  **Envio para o Cliente:** O servidor retorna o token para o cliente.
5.  **Requisições Futuras:** Para cada requisição a uma rota protegida (ex: `GET /tasks`), o cliente deve enviar o token no cabeçalho `Authorization`.
    - `Authorization: Bearer <token_jwt_aqui>`
6.  **Middleware de Verificação:** Nosso middleware de autenticação intercepta a requisição, pega o token do cabeçalho, verifica se a assinatura é válida (usando a mesma chave secreta) e, se tudo estiver certo, extrai o `id` do usuário do token e o anexa à requisição (ex: `req.user`). A requisição então prossegue para o controlador. Se o token for inválido ou não existir, o middleware bloqueia a requisição e retorna um erro `401 Unauthorized`.
