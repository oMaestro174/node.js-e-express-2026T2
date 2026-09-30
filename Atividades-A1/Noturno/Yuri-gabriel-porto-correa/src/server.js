// src/server.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// uma variável que importa nossa lista
const { lista, adicionar } = require('./alunos');


// Rota principal
app.get("/", (req, res) => {
  res.send("Bem-vindo à API dos alunos!");
});

// GET /alunos - Retorna lista de registros
app.get("/alunos", (req, res) => {
  res.status(200).json(lista());
});

app.post("/alunos", (req, res) => {
  const novo = adicionar(req.body);
  res.status(201).json(novo);
}); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});