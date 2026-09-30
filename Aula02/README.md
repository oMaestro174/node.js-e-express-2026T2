# Aula 02 - Módulos e Gerenciamento de Pacotes com NPM

> ### 📦 Dependências da Aula
> Se você estiver criando esta aula em uma nova pasta, inicialize o projeto e instale a biblioteca de datas:
> ```powershell
> npm init -y
> npm install date-fns
> ```

---

Na aula anterior, você executou seu primeiro script. Agora, vamos aprender a organizar nosso código em partes menores e reutilizáveis, chamadas **módulos**, e a usar o **NPM** para gerenciar as dependências do nosso projeto.

## Objetivos da Aula

- Entender como organizar o código com o padrão **CommonJS** (`require` e `module.exports`).
- Criar e inicializar um projeto Node.js com o comando `npm init`.
- Compreender a estrutura e a finalidade do arquivo `package.json`.
- Instalar pacotes externos (dependências) da comunidade Node.js.

## Roteiro para o Aluno

1.  **Leitura**: Leia os conceitos abaixo sobre Módulos e NPM.
2.  **Laboratório**: Siga as instruções no arquivo [laboratorio.md](laboratorio.md) para criar seu primeiro projeto gerenciado pelo NPM.
3.  **Execução**: Ao final, você terá um pequeno utilitário de linha de comando que usa módulos locais e um pacote externo.

## Conceitos Fundamentais

### O que são Módulos?

Módulos são como "peças de Lego" para o seu código. Em vez de escrever todo o seu programa em um único arquivo gigante, você pode quebrar a lógica em arquivos menores e mais focados.

Em Node.js, usamos o padrão **CommonJS**:

- `require('./caminho/do/arquivo.js')`: Usado para **importar** um módulo.
- `module.exports`: Usado para **exportar** funções, objetos ou valores de um módulo para que outros possam usá-los.

**Exemplo Rápido:**

```javascript
// arquivo: calculadora.js
function somar(a, b) {
  return a + b;
}
module.exports = { somar };

// arquivo: index.js
const calculadora = require("./calculadora.js");
console.log(calculadora.somar(5, 3)); // Saída: 8
```

### O que é NPM e o `package.json`?

**NPM (Node Package Manager)** é o gerenciador de pacotes do Node.js. É uma ferramenta de linha de comando e um registro online com milhões de pacotes de código aberto que você pode usar em seus projetos.

O arquivo `package.json` é o "coração" de um projeto Node.js. Ele contém:

- **Metadados**: Nome do projeto, versão, autor, etc.
- **Dependências**: A lista de pacotes externos que seu projeto precisa para funcionar.
- **Scripts**: Atalhos para executar comandos comuns (como `npm start` ou `npm test`).

---

Pronto para organizar seu código e usar pacotes da comunidade? Vá para o [laboratorio.md](laboratorio.md)!
