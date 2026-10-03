const express = require('express');
const router = express.Router();
const produtos = require('../data/produtos');
const auth = require('../middlewares/auth');

// GET: Listar todos os produtos
router.get('/', (req, res) => {
    res.status(200).json(produtos);
});

// GET: Buscar produto por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado!" });
    }
    
    res.json(produto);
});

// POST: Criar novo produto (Protegido por Autenticação)
router.post('/', auth, (req, res) => {
    const { nome, preco, estoque } = req.body;
    
    if (!nome || !preco || !estoque) {
        return res.status(400).json({ erro: "Preencha todos os campos obrigatórios (nome, preco, estoque)." });
    }

    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
        nome,
        preco,
        estoque
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// PUT: Atualizar produto (Protegido por Autenticação)
router.put('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado para atualização!" });
    }

    const { nome, preco, estoque } = req.body;
    if (nome) produto.nome = nome;
    if (preco) produto.preco = preco;
    if (estoque) produto.estoque = estoque;

    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", produto });
});

// DELETE: Remover produto (Protegido por Autenticação)
router.delete('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado para exclusão!" });
    }

    const produtoRemovido = produtos.splice(index, 1);
    res.status(200).json({ mensagem: "Produto removido com sucesso!", produtoRemovido });
});

module.exports = router;