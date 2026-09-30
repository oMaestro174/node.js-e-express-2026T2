const express = require('express');

// Cria um roteador independente para organizar os endpoints de alunos.
const router = express.Router();

// Os registros sao mantidos em memoria para simplificar a atividade.
// Eles sao perdidos sempre que o servidor e reiniciado.
let alunos = [
  { id: 1, nome: 'Ana Silva', curso: 'Engenharia de Software' },
  { id: 2, nome: 'Carlos Souza', curso: 'Sistemas de Informação' }
];

// GET /alunos
// Retorna todos os alunos cadastrados e o status HTTP 200.
router.get('/', (req, res) => {
  return res.status(200).json(alunos);
});

// GET /alunos/:id
// O valor :id e recebido em req.params e usado para localizar um aluno.
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // find retorna o primeiro aluno correspondente ou undefined se nao encontrar.
  const aluno = alunos.find((a) => a.id === parseInt(id));

  if (!aluno) {
    // Informa ao cliente que o ID solicitado nao existe na lista.
    return res.status(404).json({ mensagem: `Aluno com ID ${id} não encontrado.` });
  }

  // Retorna o aluno encontrado com status HTTP 200.
  return res.status(200).json(aluno);
});

// POST /alunos
// Recebe nome e curso no corpo JSON e cria um novo registro.
router.post('/', (req, res) => {
  const { nome, curso } = req.body;

  // Impede o cadastro quando algum dos campos obrigatorios nao foi enviado.
  if (!nome || !curso) {
    return res.status(400).json({ mensagem: 'Nome e curso são obrigatórios.' });
  }

  // Usa o ultimo ID existente como base; se a lista estiver vazia, inicia em 1.
  const novoAluno = {
    id: alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1,
    nome,
    curso
  };

  // Adiciona o aluno a memoria e retorna o registro criado com status 201.
  alunos.push(novoAluno);
  return res.status(201).json(novoAluno);
});

// PUT /alunos/:id
// Atualiza os dados de um aluno identificado pelo parametro de rota.
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, curso } = req.body;

  // findIndex e usado porque a atualizacao precisa da posicao do aluno na lista.
  const alunoIndex = alunos.findIndex((a) => a.id === parseInt(id));

  if (alunoIndex === -1) {
    // Indice -1 significa que nenhum aluno possui o ID informado.
    return res.status(404).json({ mensagem: `Aluno com ID ${id} não encontrado.` });
  }

  // Mantem o ID e os valores antigos quando nome ou curso nao forem enviados.
  alunos[alunoIndex] = {
    ...alunos[alunoIndex],
    nome: nome || alunos[alunoIndex].nome,
    curso: curso || alunos[alunoIndex].curso
  };

  // Retorna o registro atualizado com status HTTP 200.
  return res.status(200).json(alunos[alunoIndex]);
});

// DELETE /alunos/:id
// Remove da lista o aluno correspondente ao ID informado.
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const alunoIndex = alunos.findIndex((a) => a.id === parseInt(id));

  if (alunoIndex === -1) {
    // Evita remover uma posicao inexistente e informa o erro ao cliente.
    return res.status(404).json({ mensagem: `Aluno com ID ${id} não encontrado.` });
  }

  // splice remove um item a partir do indice encontrado.
  alunos.splice(alunoIndex, 1);
  return res.status(200).json({ mensagem: `Aluno com ID ${id} removido com sucesso.` });
});

// Exporta o roteador para ser montado em /alunos no arquivo app.js.
module.exports = router;
