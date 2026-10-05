# Aula 10: Testes Unitários e Deploy

> ### 📦 Dependências da Aula
> Esta aula aborda testes automatizados na API. Instale o Express e o driver do banco, além dos frameworks de testes como dependências de desenvolvimento:
> ```powershell
> npm init -y
> npm install express pg
> npm install --save-dev jest supertest
> ```

---

## Conteúdo

- Testes Unitários e de Integração com Jest
- Simulação de Deploy em Produção

## Objetivos

- **Criar testes com Jest**: Aprender a configurar o ambiente de testes e escrever testes de integração para validar os endpoints da nossa API.
- **Simular deploy para produção**: Entender como usar variáveis de ambiente (especificamente `NODE_ENV`) para configurar a aplicação para diferentes cenários (desenvolvimento vs. produção).
- **A3 Final**: Apresentar o projeto final completo, incluindo a suíte de testes e a configuração de deploy.

> 📘 **Guia Recomendado:** Leia o [Guia Prático: Ambiente de Desenvolvimento vs. Produção](../docs/desenvolvimento-vs-producao.md) para entender a fundo o impacto de `NODE_ENV` em performance, caching e segurança.

## Desenvolvimento da Aula

1.  **Introdução ao Jest**:
    - O que é Jest e por que testar nosso código?
    - Tipos de testes: unitários, integração, e2e.
    - Configurando o Jest em um projeto Node.js.

2.  **Testes de Integração Básicos**:
    - Escreveremos testes para os endpoints da nossa API de tarefas.
    - Foco em validar os principais fluxos da aplicação:
      - Registro e Login de usuários.
      - CRUD de tarefas, garantindo a autorização.
    - Uso do `supertest` para simular requisições HTTP.

3.  **Configuração de Deploy (`NODE_ENV`)**:
    - A importância da variável de ambiente `NODE_ENV`.
    - Como a aplicação pode se comportar de maneira diferente em `development` vs. `production`.
    - Exemplo: desabilitar logs detalhados ou mensagens de erro em produção.

4.  **Pausa (15 minutos)**

5.  **Apresentações Finais (A3)**:
    - Cada aluno ou grupo apresentará seu projeto final.
    - A apresentação deve incluir:
      - Demonstração da API funcionando.
      - Execução da suíte de testes.
      - Explicação do código e das decisões de arquitetura.

## Materiais e Recursos

- Laboratório com Node.js e PostgreSQL instalados.
- Projeto da Aula 09 como base.
- Servidor simulado (usaremos o `supertest` para isso).

## Avaliação

- **A3 entregue**: O projeto final da Aula 09, agora com uma suíte de testes funcionais e configuração para deploy.
- A nota será composta pela qualidade do projeto, dos testes e pela apresentação.

## Duração

- **4 horas**
