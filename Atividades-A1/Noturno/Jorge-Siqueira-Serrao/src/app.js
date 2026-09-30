// Importa o framework usado para criar o servidor e as rotas da API.
const express = require('express');
// Permite destacar a mensagem de inicializacao do servidor no terminal.
const colors = require('colors');
// Importa os modulos responsaveis pelo logging e pelas rotas de alunos.
const loggerMiddleware = require('./middlewares/logger');
const alunosRoutes = require('./routes/alunos');

// Cria a aplicacao Express e define a porta de acesso da API.
const app = express();
const PORT = 3000;

// Permite que a API leia dados JSON enviados no corpo das requisicoes.
app.use(express.json());

// Registra cada requisicao depois que ela passa pela aplicacao.
// Deve ser registrado antes das rotas para acompanhar todos os endpoints.
app.use(loggerMiddleware);

// Todas as rotas definidas em alunos.js ficam disponiveis sob /alunos.
// Exemplo: alunosRoutes.get('/') responde a GET /alunos.
app.use('/alunos', alunosRoutes);

// Inicia o servidor e informa no terminal o endereco para acesso local.
app.listen(PORT, () => {
  console.log(colors.green.bold(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`));
});
