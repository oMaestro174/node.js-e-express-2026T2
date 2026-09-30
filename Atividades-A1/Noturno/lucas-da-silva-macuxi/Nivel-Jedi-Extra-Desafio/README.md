#  API de Alunos - Nível Jedi (Avaliação A1)

Esta é uma API RESTful desenvolvida para a avaliação A1 da disciplina de Node.js e Express. A aplicação realiza o gerenciamento (CRUD) de alunos com dados armazenados em memória. O projeto atende a todos os requisitos do **Nível Jedi — Extra Desafio**, incluindo separação em módulos, filtros por ID, autenticação básica via token e sistema de logging colorido no terminal.

##  Instruções de Execução

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Navegue até a pasta do projeto pelo terminal:
   ```bash
   cd Atividades-A1/Noturno/lucas-da-silva-macuxi/Nivel-Jedi-Extra-Desafio

```

3. Instale as dependências necessárias (Express e Colors):
```bash
npm install

```


4. Inicie o servidor em modo de desenvolvimento (utilizando o Nodemon):
```bash
npm run dev

```


5. O servidor estará rodando e acessível em: `http://localhost:3000/alunos`

---

##  Autenticação (Header Necessário)

Para garantir a segurança, as rotas que modificam os dados (POST, PUT e DELETE) estão protegidas por um middleware de autenticação.

Para testar essas rotas protegidas no Postman ou Insomnia, você deve enviar o seguinte cabeçalho (Header) na sua requisição:

* **Key:** `Authorization`
* **Value:** `token-jedi-123`

Se o token não for enviado ou estiver incorreto, a API impedirá o acesso e retornará o status `401 (Unauthorized)`.

---

##  Endpoints da API e Como Usar

### Rotas Públicas (Não exigem token)

* **`GET /alunos`**
* **O que faz:** Lista todos os alunos cadastrados no sistema.
* **Retorno de Sucesso:** `200 OK` (Array de alunos).


* **`GET /alunos/:id`**
* **O que faz:** Busca e exibe os dados de um aluno específico através do seu `id` passado na URL.
* **Retorno de Sucesso:** `200 OK` (Objeto JSON do aluno).
* **Retorno de Erro:** `404 Not Found` (Caso o aluno não exista).



### Rotas Protegidas (Exigem Header `Authorization`)

* **`POST /alunos`**
* **O que faz:** Cria e cadastra um novo aluno.
* **Corpo da Requisição (JSON):**
```json
{
  "nome": "Luke Skywalker",
  "curso": "Formação Jedi",
  "idade": 22
}

```


* **Retorno de Sucesso:** `201 Created` (Devolve o aluno criado com seu novo ID gerado).
* **Retorno de Erro:** `400 Bad Request` (Se nome ou curso não forem enviados).


* **`PUT /alunos/:id`**
* **O que faz:** Atualiza os dados de um aluno existente através do seu `id`.
* **Corpo da Requisição (JSON):** (Mesmo formato utilizado no método POST).
* **Retorno de Sucesso:** `200 OK`.
* **Retorno de Erro:** `404 Not Found`.


* **`DELETE /alunos/:id`**
* **O que faz:** Exclui um aluno do sistema através do seu `id`.
* **Retorno de Sucesso:** `200 OK` (Retorna a mensagem de sucesso e os dados apagados).
* **Retorno de Erro:** `404 Not Found`.



---

## Funcionalidade Extra: Logging Colorido

A API conta com um middleware de *logger* global que intercepta todas as requisições e imprime no terminal o método, a rota e o Status Code retornado. Foi utilizada a biblioteca `colors` para facilitar a identificação visual:

* **Verde:** Requisições processadas com sucesso (Status 2xx).
* **Amarelo/Vermelho:** Requisições com erro de validação, não encontradas ou não autorizadas (Status 4xx).
