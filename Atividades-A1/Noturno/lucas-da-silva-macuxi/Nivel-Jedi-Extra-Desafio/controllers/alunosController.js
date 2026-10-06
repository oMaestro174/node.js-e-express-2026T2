// Importamos nosso banco de dados em memória
const db = require('../data/database');

// Como já temos 2 alunos pré-cadastrados, o próximo ID deve ser o 3
let proximoId = 3;

const alunosController = {
    // 1. Listar todos os alunos (GET /alunos)
    listarTodos: (req, res) => {
        res.status(200).json(db.alunos);
    },

    // 2. Listar um aluno específico por ID (GET /alunos/:id)
    listarPorId: (req, res) => {
        // req.params pega o valor da URL. Convertendo para número:
        const id = parseInt(req.params.id); 
        const aluno = db.alunos.find(a => a.id === id);

        if (!aluno) {
            return res.status(404).json({ erro: 'Aluno não encontrado' });
        }
        
        res.status(200).json(aluno);
    },

    // 3. Criar um novo aluno (POST /alunos)
    criar: (req, res) => {
        // req.body pega o JSON enviado no corpo da requisição
        const { nome, curso, idade } = req.body; 

        // Validação simples
        if (!nome || !curso) {
            return res.status(400).json({ erro: 'Nome e curso são campos obrigatórios' });
        }

        const novoAluno = {
            id: proximoId++, // Atribui o ID e depois incrementa para o próximo
            nome,
            curso,
            idade
        };

        db.alunos.push(novoAluno); // Salva no array
        res.status(201).json(novoAluno); // 201 = Created
    },

    // 4. Atualizar um aluno existente (PUT /alunos/:id)
    atualizar: (req, res) => {
        const id = parseInt(req.params.id);
        const { nome, curso, idade } = req.body;

        const index = db.alunos.findIndex(a => a.id === id);

        if (index === -1) {
            return res.status(404).json({ erro: 'Aluno não encontrado' });
        }

        // Atualiza os dados no array mantendo o ID original
        db.alunos[index] = { id, nome, curso, idade };

        res.status(200).json(db.alunos[index]);
    },

    // 5. Deletar um aluno (DELETE /alunos/:id)
    deletar: (req, res) => {
        const id = parseInt(req.params.id);
        const index = db.alunos.findIndex(a => a.id === id);

        if (index === -1) {
            return res.status(404).json({ erro: 'Aluno não encontrado' });
        }

        // Remove 1 item a partir da posição encontrada (index)
        const alunoRemovido = db.alunos.splice(index, 1);
        
        res.status(200).json({ 
            mensagem: 'Aluno removido com sucesso', 
            aluno: alunoRemovido[0] 
        });
    }
};

module.exports = alunosController;