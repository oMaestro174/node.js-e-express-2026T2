const express = require("express");
const { produtos, gerarId } = require("./data/produtos");

const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.send("Bem-vindo à Loja de Informática");
});

// GET /produtos - Retorna todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// POST /produtos - Adiciona um novo produto
app.post("/produtos", (req, res) => {
    // Valida a descricao
    if (typeof req.body.descricao !== "string" || req.body.descricao.trim() === "") {
        return res.status(400).json({ error: "descricao é obrigatória e deve ser um texto"})
    }

    // Valida o preco
    if (typeof preco !== "number" || preco < 0) {
        return res.status(400).json({ erro: "preco é obrigatório e deve ser um número não negativo" });
    }

    const novoProduto = {
        id: gerarId(),
        descricao: req.body.descricao,
        preco: req.body.preco, 
    }

    produtos.push(novoProduto);
    res.status(201).json(novoProduto); // Retorna 201
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
