const express = require('express');
const router = express.Router();

// Importamos o controller que contém a lógica das funções
const alunosController = require('../controllers/alunosController');

// Importamos o middleware de autenticação
const authMiddleware = require('../middlewares/auth');

// ==========================================
// ROTAS PÚBLICAS (Não precisam de token)
// ==========================================

// GET /alunos - Listar todos os alunos
router.get('/', alunosController.listarTodos);

// GET /alunos/:id - Listar aluno específico por ID
router.get('/:id', alunosController.listarPorId);


// ==========================================
// ROTAS PROTEGIDAS (Precisam do token no header)
// ==========================================
// Repare que passamos o authMiddleware ANTES do alunosController

// POST /alunos - Criar um novo aluno
router.post('/', authMiddleware, alunosController.criar);

// PUT /alunos/:id - Atualizar um aluno
router.put('/:id', authMiddleware, alunosController.atualizar);

// DELETE /alunos/:id - Deletar um aluno
router.delete('/:id', authMiddleware, alunosController.deletar);

module.exports = router;