const alunos = [
    { id: 1, nome: "Rafael", matricula: 2222, ativo: true },
    { id: 2, nome: "Daniel", matricula: 6767, ativo: false }
];

function lista(){
    return alunos;
}

function adicionar(dados){
    const novo = { id: alunos.length +1, nome: dados.nome, matricula: dados.matricula, ativo: dados.ativo ?? true};
    alunos.push(novo);
    return novo;
}

module.exports = { lista, adicionar };