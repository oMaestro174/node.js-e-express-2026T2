# Atividade Avaliativa - Aula 07: Refatoração de API RESTful

## Objetivo

Avaliar a capacidade de diagnosticar e corrigir desvios dos padrões RESTful em uma API existente, aplicando os conceitos de URIs, métodos HTTP e códigos de status de forma semântica e correta.

## Contexto Técnico

Você foi alocado em um projeto para realizar a manutenção de uma API de gerenciamento de produtos. A API é funcional, porém foi desenvolvida sem seguir as convenções da arquitetura REST, o que está gerando dificuldades de integração e manutenção.

Sua tarefa é analisar o código-fonte da API, identificar as violações dos princípios REST e refatorar o código para adequá-lo às boas práticas do mercado.

## Instruções para Entrega

- **Formato:** Enviar um arquivo `.zip` contendo o projeto (incluindo `server.js` e `package.json`).
- **E-mail para:** `janei@taguardado.net`
- **Assunto do E-mail:** `Aula 07 - Atividade RESTful - [Seu Nome Completo] - [Vespertino ou Noturno]`
- **Prazo:** Final da aula de hoje.

---

## Código-Fonte da API (Não-RESTful)

Abaixo está o código da API de produtos que precisa ser refatorada. Copie este código para um arquivo `server.js` e comece a trabalhar.

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Banco de dados em memória
let produtos = [
  {
    id: 1,
    nome: "Notebook Gamer",
    preco: 7500,
    estoque: 30,
    categoria: "Eletrônicos",
  },
  {
    id: 2,
    nome: "Cadeira de Escritório",
    preco: 1200,
    estoque: 50,
    categoria: "Móveis",
  },
];

// 1. Endpoint para listar todos os produtos
app.get("/listarProdutos", (req, res) => {
  res.json(produtos);
});

// 2. Endpoint para buscar um produto específico
app.post("/buscarProduto", (req, res) => {
  const { id } = req.body;
  const produto = produtos.find((p) => p.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.send("Produto não encontrado.");
  }
});

// 3. Endpoint para adicionar um novo produto
app.get("/adicionarProduto", (req, res) => {
  const { nome, preco, estoque, categoria } = req.query;
  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    categoria,
  };
  produtos.push(novoProduto);
  res.send("Produto adicionado.");
});

// 4. Endpoint para modificar um produto
app.get("/modificarProduto/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...req.query };
    res.json(produtos[index]);
  } else {
    res.send("Produto não localizado.");
  }
});

// 5. Endpoint para remover um produto
app.post("/removerProduto", (req, res) => {
  const { id } = req.body;
  produtos = produtos.filter((p) => p.id !== id);
  res.send("Produto removido com sucesso.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

## Tarefa a ser Executada

1.  **Análise Crítica:** Analise cada um dos 5 endpoints do código acima.
2.  **Identificação de Problemas:** Para cada endpoint, identifique as violações dos princípios REST. Considere:
    - A URI (rota) é apropriada?
    - O método HTTP (verbo) é o mais adequado para a operação?
    - Os dados estão sendo enviados da forma correta (query, body, params)?
    - Os códigos de status HTTP de sucesso e erro estão sendo utilizados corretamente?
3.  **Refatoração:** Crie um novo arquivo `server.js` e reescreva a API, corrigindo todos os problemas identificados. A API refatorada deve ser robusta, semântica e seguir as convenções RESTful.
4.  **Teste:** Utilize o Postman ou Insomnia para testar cada um dos seus novos endpoints e garantir que eles funcionam conforme o esperado, retornando os dados e os códigos de status corretos para cada cenário (sucesso e erro).

O arquivo a ser entregue é apenas o `server.js` com o código final e corrigido.

### **3. ADICIONE validação**:

```javascript
// Exemplo que você DEVE incluir:
if (!req.body.nome || req.body.preco <= 0) {
  return res.status(400).json({ erro: "Nome e preço > 0 obrigatórios" });
}
```

### **4. BONUS (2 pontos extras)**:

- Middleware de logging
- PATCH para atualização parcial
- README.md documentando sua API

---

## 📋 COMO ENTREGAR (OBRIGATÓRIO)

**E-mail para**: taguardado.net@gmail.com  
**Assunto**: `Aula 07 - Atividade RESTful - [Seu Nome Completo] - [Vespertino ou Noturno]`

**Anexe**:

```
📁 minha-api-restful/
├── server-restful.js     ← SEU CÓDIGO REFACTORADO
├── package.json
└── README.md            ← Documente sua API

📸 screenshots-postman/   ← 10+ screenshots
   ├── GET-produtos.png
   ├── POST-criar.png (com 201!)
   ├── DELETE-204.png
   ├── erro-400.png
   └── etc...
```

---

## ✅ CRITÉRIOS (10 pontos)

```
[3pts] Rotas RESTful corretas (plural, sem verbos)
[3pts] Status codes SEMânticos (201, 204, 404, 400)
[2pts] Validação de entrada (400 quando inválido)
[1pt] Código limpo e comentários
[1pt] Screenshots Postman completos
[+2pts] PATCH + README bem feito
```

---

## 🧪 COMO TESTAR NO POSTMAN

**Cenários que você DEVE testar e screenshot**:

```
✅ GET /produtos                    → 200 + lista
✅ GET /produtos/999                → 404
✅ POST /produtos (dados válidos)   → 201 + produto criado
✅ POST /produtos (sem nome)        → 400 erro
✅ PUT /produtos/1                  → 200 atualizado
✅ DELETE /produtos/1               → 204 vazio
```
