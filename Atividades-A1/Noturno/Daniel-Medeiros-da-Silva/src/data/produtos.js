// Array inicial de produtos
let produtos = [
    {id: 1, descricao: "Processador", preco: 1500},
    {id: 2, descricao: "Placa Mãe", preco: 1200},
];

// Contador de IDs
let proximoId = 3;

// Funcao para gerar um id novo e avancar o contador
function gerarId() {
    const id = proximoId;
    proximoId++;
    return id;
};

// Exportando o objeto
module.exports = { produtos, gerarId };