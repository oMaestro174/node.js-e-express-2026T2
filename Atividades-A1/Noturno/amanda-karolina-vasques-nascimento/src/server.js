const express = require("express");
const logger = require('./middlewares/logger');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(logger);

// Rota principal
app.get("/", (req, res) => {
    res.send("API Controle de Estoque da Papelaria rodando com sucesso!");
});

// Rotas da API
app.use("/produtos", produtoRoutes);

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});