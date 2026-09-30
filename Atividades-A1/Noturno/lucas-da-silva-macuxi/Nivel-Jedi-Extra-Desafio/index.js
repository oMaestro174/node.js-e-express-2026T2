const express = require('express');
const colors = require('colors');

// Importação das rotas e middlewares
const alunosRouter = require('./routes/alunosRouter');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 3000;

// 1. Middlewares Globais
app.use(express.json()); // Permite que a API receba dados em formato JSON no req.body
app.use(logger);         // Ativa o nosso logger colorido para todas as requisições

// 2. Configuração das Rotas
// Todas as rotas definidas no alunosRouter estarão disponíveis a partir de "/alunos"
app.use('/alunos', alunosRouter);

// 3. Iniciar o servidor
app.listen(PORT, () => {
    console.log(` Servidor Jedi em execução na porta ${PORT}...`.bgBlue.white);
    console.log(`Pode testar em: http://localhost:${PORT}/alunos`.gray);
});