const express = require("express");
const logger = require("./middlewares/logger");
const { produtos, gerarId } = require("./data/produtos");

const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Middleware de log
app.use(logger);

// Rota de teste
app.get("/", (req, res) => {
    res.send("Bem-vindo à Loja de Informática");
});

// GET /produtos - Retorna todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// GET /produtos/:id - Retorna um produto específico
app.get("/produtos/:id", (req, res) => {
    const idProduto = parseInt(req.params.id); // converte o id para numero
    const produto = produtos.find((p) => p.id === idProduto);

    if (!produto) {
        return res.status(404).json({ erro: "produto não encontrado" });
    }

    res.status(200).json(produto);
})

// POST /produtos - Adiciona um novo produto
app.post("/produtos", (req, res) => {
    // Valida a descricao
    if (typeof req.body.descricao !== "string" || req.body.descricao.trim() === "") {
        return res.status(400).json({ erro: "descricao é obrigatória e deve ser um texto" });
    }

    // Valida o preco
    if (typeof req.body.preco !== "number" || req.body.preco < 0) {
        return res.status(400).json({ erro: "preco é obrigatório e deve ser um número não negativo" });
    }

    const novoProduto = {
        id: gerarId(),
        descricao: req.body.descricao,
        preco: req.body.preco, 
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto); // Retorna 201
});

// DELETE /produtos/:id - Deleta um produto
app.delete("/produtos/:id", (req, res) => {
    const idProduto = parseInt(req.params.id); // converte o id para numero
    const index = produtos.findIndex((p) => p.id === idProduto);

    // se nao achar, responde 404 e para
    if (index === -1) {
        return res.status(404).json({ erro: "produto não encontrado" });
    }

    produtos.splice(index, 1); // remove item do array
    res.status(204).send(); // 204 no content
});

// PUT /produtos/:id - Modifica um produto
app.put("/produtos/:id", (req, res) => {
    const idProduto = parseInt(req.params.id); // converte o id para numero
    const index = produtos.findIndex((p) => p.id === idProduto);  

    // se nao achar, responde 404 e para
    if (index === -1) {
        return res.status(404).json({ erro: "produto não encontrado" });
    }

    // Valida a descricao
    if (typeof req.body.descricao !== "string" || req.body.descricao.trim() === "") {
        return res.status(400).json({ erro: "descricao é obrigatória e deve ser um texto" });
    }

    // Valida o preco
    if (typeof req.body.preco !== "number" || req.body.preco < 0) {
        return res.status(400).json({ erro: "preco é obrigatório e deve ser um número não negativo" });
    }

    const produto = produtos[index];
    produto.descricao = req.body.descricao;
    produto.preco = req.body.preco;
    res.status(200).json(produto);
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
