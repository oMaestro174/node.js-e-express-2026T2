# Curso: Desenvolvimento de APIs com Node.js e Express — Turma 2026T2
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Bem-vindo ao repositório oficial do curso de desenvolvimento de APIs com Node.js e Express para a **Turma 2026T2**! Este espaço reúne o material didático, códigos, laboratórios e atividades práticas desenvolvidos em sala de aula.

---

## 🚀 Visão Geral do Curso

Neste curso, você aprenderá a construir APIs RESTful robustas, seguras e profissionais do zero. Partimos dos conceitos fundamentais do JavaScript no backend (Node.js e runtime) e do framework Express, evoluindo progressivamente para tópicos como middlewares, bancos de dados relacionais com PostgreSQL, autenticação com JWT e arquitetura limpa.

---

## 🛠️ Ferramentas e Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

- **[Node.js](https://nodejs.org/) (versão LTS recomendada):** Ambiente de execução JavaScript backend.
- **[Git](https://git-scm.com/):** Controle de versão para clonar este repositório e enviar suas atividades.
- **[Visual Studio Code](https://code.visualstudio.com/):** Editor de código recomendado.
- **[Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/):** Para testar as requisições HTTP da nossa API.
- **[PostgreSQL](https://www.postgresql.org/) e [DBeaver](https://dbeaver.io/):** Banco de dados relacional e cliente gráfico para consultas SQL.

---

## 📂 Estrutura do Repositório

- **`AulaXX/`**: Contém o guia teórico (`README.md`), o roteiro de prática (`laboratorio.md`) e atividades (`atividades.md`) de cada aula ministrada.
- 🗄️ **`database/schema.sql`**: Script SQL oficial unificado para criar todas as tabelas (`users`, `tasks`, `produtos`) e dados de teste no PostgreSQL/DBeaver.
- **`labNode1/`**: Laboratório prático da evolução do servidor HTTP nativo até a necessidade do Express.
- **`Atividades-A1/`**: Orientações e pastas destinadas para entrega das avaliações práticas via Pull Request.
- **`fundamentos-js-para-express.md`**: Guia preparatório de conceitos essenciais de JavaScript moderno para o Express.
- **`como-sincronizar-alteracoes.md`**: Guia passo a passo de como atualizar seu repositório local sem perder suas alterações.

---

## 🗺️ Roteiro de Aulas

Os materiais são publicados gradualmente conforme o avanço das aulas:

| Aula   | Tópico Principal                          | Status e Link                          |
| :----- | :---------------------------------------- | :------------------------------------- |
| **01** | Introdução ao Node.js e Primeiro Script   | [Disponível](./Aula01/README.md)       |
| **02** | Módulos, `require` e `npm`                | [Disponível](./Aula02/README.md)       |
| **03** | Introdução ao Express e Primeiro Servidor | [Disponível](./Aula03/README.md)       |
| **04** | Middlewares no Express                    | [Disponível](./Aula04/README.md)       |
| **05** | Bancos de Dados com PostgreSQL            | [Disponível](./Aula05/README.md)       |
| **06** | Conexão da API com PostgreSQL             | [Disponível](./Aula06/README.md)       |
| **07** | Princípios de APIs RESTful e Refatoração  | [Disponível](./Aula07/README.md)       |
| **08** | Documentação de APIs com Swagger e Postman | [Disponível](./Aula08/README.md)       |
| **09** | Arquitetura MVC e Refatoração             | *(Disponibilizado após a aula)*        |
| **10** | Documentação de APIs com Swagger          | *(Disponibilizado após a aula)*        |

---

## 🎯 Avaliação A1 — Atividade Prática

A avaliação **A1** já está disponível para envio! Esta atividade prática consolida todo o conteúdo estudado até a **Aula 04** (módulos, Express, métodos HTTP, parâmetros e middlewares).

* **Como fazer:** Escolha um dos níveis de desafio (Básico, Intermediário, Avançado ou Jedi), desenvolva a solução e envie via Fork e Pull Request.
* 👉 **Consulte as instruções completas de entrega:** [Guia de Entrega da Avaliação A1](./Atividades-A1/README.md)
* 💡 **Dúvidas frequentes de Git/GitHub:** [Guia de Resolução de Problemas (Troubleshooting)](./Atividades-A1/TROUBLESHOOTING.md)

---

## 💡 Como Usar este Repositório

### 1. Clonar o projeto
```bash
git clone https://github.com/oMaestro174/node.js-e-express-2026T2.git
cd node.js-e-express-2026T2
```

### 2. Navegar até a aula desejada
Entre na pasta da aula para consultar a teoria e executar os exemplos:
```bash
cd Aula06
# Consulte o roteiro do laboratorio.md
```

### 3. Sincronizar com atualizações
Sempre que novas aulas forem publicadas pelo professor, consulte o guia [como-sincronizar-alteracoes.md](./como-sincronizar-alteracoes.md) para puxar as novidades para sua máquina com segurança.

---
**Instituto de Tecnologia e Aprendizado Moderno - ITEAM**  
*Bons estudos e mãos no código!*
