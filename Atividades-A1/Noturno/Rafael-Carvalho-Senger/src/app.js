// requisição de módulos e instanciação da api
const express = require("express");
const app = express();
const loggin = require("./midleware");
require("colors");

app.use(express.json());

app.use(loggin);

// Teste com dados diretos
let produtos = [
    {id: 1, descricao: "tomate", validade: "2026-10-02"},
    {id: 2, descricao: "molho de tomate", validade: "2026-11-02"}
];

// Get público na raiz para iniciar
app.get("/", (req, res) => {
    res.send("Olá, esta é uma API de Produtos!")
});

// Get público dos dados da api
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.get("/produtos/:id", (req,res) => {
    const idProduto = parseInt(req.params.id);
    const produto = produtos.find((t) => t.id === idProduto);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado"});
    }

    res.json(produto);
});


// Post público para adicionar dados na api
app.post("/produtos", (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        descricao: req.body.descricao,
        validade: req.body.validade,
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Put público para atualizar os dados na api
app.put("/produtos/:id", (req,res) => {
    const idProduto = parseInt(req.params.id);
    const produto = produtos.find((t) => t.id === idProduto);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado"});
    }

    // Atualiza ou mantem os atributos já registrados
    produto.descricao = req.body.descricao || produto.descricao;
    produto.validade = req.body.validade || produto.validade;

    res.json(produto);
});

// Delete público para apagar os dados na api
app.delete("/produtos/:id", (req, res) => {
    const idProduto = parseInt(req.params.id);
    const index = produtos.findIndex((t) => t.id === idProduto);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado"});
    }

    produtos.splice(index, 1);
    res.status(204).send();
});

module.exports = app;

