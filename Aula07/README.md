# Aula 07: Princípios de APIs RESTful

## Material Complementar

Antes de começar, recomendamos assistir a estes vídeos para uma excelente introdução visual aos conceitos de API e REST:

- **[O que é API? REST e RESTful?](https://youtu.be/ghTrp1x_1As)** - Uma visão geral clara e concisa.
- **[APIs REST e RESTful - Entenda de uma vez por todas](https://youtu.be/S7MduKwvVGk)** - Um aprofundamento nos conceitos.

---

## Objetivos da Aula

- Compreender os princípios fundamentais da arquitetura REST.
- Aprender a utilizar os códigos de status HTTP de forma correta e semântica.
- Identificar e aplicar boas práticas no design de APIs RESTful.

---

## 1. O que é REST?

REST (**RE**presentational **S**tate **T**ransfer) não é um padrão ou um protocolo, mas sim um **conjunto de princípios de arquitetura** para projetar aplicações em rede. Uma API que segue esses princípios é chamada de "RESTful".

A ideia central do REST é tratar os dados da aplicação como **recursos**. Cada recurso pode ser acessado e manipulado através de uma URI (Uniform Resource Identifier) única.

### Princípios Fundamentais do REST

- **Cliente-Servidor:** A arquitetura é separada. O cliente (front-end, mobile) e o servidor (back-end) são independentes e se comunicam pela rede.
- **Stateless (Sem Estado):** Cada requisição do cliente para o servidor deve conter toda a informação necessária para ser entendida e processada. O servidor não armazena o "estado" da sessão do cliente.
- **Cacheable:** As respostas do servidor devem, sempre que possível, indicar se podem ou não ser armazenadas em cache pelo cliente. Isso melhora a performance e a escalabilidade.
- **Interface Uniforme:** Este é o princípio mais importante e se divide em quatro restrições:
  1.  **Identificação de Recursos (URIs):** Tudo é um recurso, e cada recurso tem um identificador único (a URI).
  2.  **Manipulação de Recursos Através de Representações:** O cliente interage com uma representação do recurso (geralmente JSON ou XML), não com o recurso em si.
  3.  **Mensagens Autodescritivas:** Cada mensagem (requisição/resposta) contém informação suficiente para se descrever (ex: `Content-Type: application/json`).
  4.  **HATEOAS (Hypermedia as the Engine of Application State):** As respostas da API podem conter links para outras ações ou recursos relacionados, permitindo que o cliente navegue pela API.

---

## 2. Recursos, URIs e Métodos HTTP

A base de uma API RESTful é a interação com recursos através de URIs e métodos HTTP.

### Recursos e URIs

- **Recurso:** É qualquer "coisa" na sua aplicação (um usuário, um produto, um pedido).
- **URI:** É o "endereço" do recurso.

**Boas Práticas para URIs:**

- **Use substantivos, não verbos:** A URI identifica o recurso, não a ação. A ação é definida pelo método HTTP.
  - **Ruim:** `/pegarUsuarios`, `/criarProduto`
  - **Bom:** `/usuarios`, `/produtos`
- **Use plural para coleções:** Para representar uma lista de recursos, use o plural.
  - **Bom:** `/usuarios` (todos os usuários), `/produtos` (todos os produtos)
- **Seja consistente:** Mantenha um padrão de nomenclatura (ex: tudo minúsculo, separado por hífens).

### Métodos (Verbos) HTTP

Os métodos HTTP definem a **ação** que você quer realizar sobre um recurso.

| Método     | Ação                                                                                                              | Exemplo de Uso                                                               |
| :--------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **GET**    | **Ler/Buscar** um ou mais recursos. É uma operação segura (não altera dados).                                     | `GET /usuarios` (lista todos) <br> `GET /usuarios/123` (busca um específico) |
| **POST**   | **Criar** um novo recurso.                                                                                        | `POST /usuarios` (cria um novo usuário com os dados no corpo da requisição)  |
| **PUT**    | **Atualizar** um recurso **por completo**. O cliente envia o recurso inteiro, mesmo que só um campo tenha mudado. | `PUT /usuarios/123` (substitui completamente os dados do usuário 123)        |
| **PATCH**  | **Atualizar** um recurso **parcialmente**. O cliente envia apenas os campos que deseja alterar.                   | `PATCH /usuarios/123` (atualiza apenas o nome do usuário 123, por exemplo)   |
| **DELETE** | **Remover** um recurso.                                                                                           | `DELETE /usuarios/123` (remove o usuário 123)                                |

---

## 3. Códigos de Status HTTP

Os códigos de status são a forma como o servidor informa ao cliente o resultado da sua requisição. Usá-los corretamente é essencial para uma API RESTful.

Eles são agrupados em categorias:

- **2xx (Sucesso):** A requisição foi recebida, entendida e aceita com sucesso.
- **3xx (Redirecionamento):** Ações adicionais são necessárias para completar a requisição.
- **4xx (Erro do Cliente):** A requisição contém sintaxe inválida ou não pode ser atendida.
- **5xx (Erro do Servidor):** O servidor falhou em atender a uma requisição aparentemente válida.

### Códigos Essenciais

| Código  | Mensagem                  | Significado e Uso Comum                                                                                                                           |
| :------ | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **200** | **OK**                    | Resposta padrão para requisições bem-sucedidas. Usado em `GET`, `PUT`, `PATCH`.                                                                   |
| **201** | **Created**               | A requisição foi bem-sucedida e um **novo recurso foi criado**. Usado em `POST`.                                                                  |
| **204** | **No Content**            | A requisição foi bem-sucedida, mas **não há conteúdo para retornar**. Usado em `DELETE` ou em `PUT`/`PATCH` que não retornam o objeto atualizado. |
| **400** | **Bad Request**           | O servidor não entendeu a requisição devido a uma sintaxe inválida (ex: JSON mal formatado, campo obrigatório faltando).                          |
| **401** | **Unauthorized**          | O cliente não está autenticado e precisa se autenticar para obter a resposta.                                                                     |
| **403** | **Forbidden**             | O cliente está autenticado, mas **não tem permissão** para acessar o recurso.                                                                     |
| **404** | **Not Found**             | O servidor não encontrou o recurso solicitado na URI (ex: `GET /usuarios/999` onde o usuário 999 não existe).                                     |
| **500** | **Internal Server Error** | Um erro inesperado aconteceu no servidor que o impediu de completar a requisição. É um erro genérico.                                             |
