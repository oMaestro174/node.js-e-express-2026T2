# Aula 01 - Introdução ao Node.js e Configuração do Ambiente

> ### 📦 Dependências da Aula
> Esta aula utiliza **exclusivamente módulos nativos do Node.js** (`fs`, `path`, `http`).  
> **Não é necessário rodar `npm install`** para instalar pacotes externos nesta aula.

---

Bem-vindo à primeira aula! Hoje vamos entender o que é o Node.js, por que ele é tão poderoso e como preparar seu computador para começar a desenvolver.

## Objetivos da Aula

- Compreender o que é o Node.js e como ele funciona.
- Entender os conceitos de **motor V8**, **Event Loop** e **assincronicidade**.
- Instalar o Node.js (versão LTS) em sua máquina.
- Executar seu primeiro script JavaScript no lado do servidor.

## Roteiro para o Aluno

1.  **Leitura**: Comece lendo os conceitos abaixo para se familiarizar com a teoria.
2.  **Laboratório**: Siga as instruções no arquivo [laboratorio.md](laboratorio.md).
3.  **Execução**: Execute o script `primeiro-script.js` que está na pasta `src` e veja a mágica acontecer no seu terminal!

## Conceitos Fundamentais

### O que é Node.js?

Node.js é um ambiente que permite executar código JavaScript fora do navegador. Ele usa o **motor V8**, o mesmo que o Google Chrome usa, o que o torna extremamente rápido.

### O que é o Event Loop?

Pense no Event Loop como o "coração" do Node.js. Ele permite que a aplicação lide com muitas tarefas ao mesmo tempo (como ler um arquivo ou consultar um banco de dados) sem travar. É por isso que dizemos que o Node.js é **não-bloqueante**.

**Analogia Rápida**: Imagine um garçom em um restaurante. Em vez de esperar o prato de um cliente ficar pronto para só então atender o próximo (bloqueante), ele anota o pedido, entrega na cozinha e já vai atender outra mesa. Quando o prato fica pronto, ele é "avisado" e o entrega. O Node.js funciona de forma parecida!

### O que é Assincronicidade?

É a capacidade de executar tarefas demoradas em "segundo plano", sem parar o fluxo principal do programa. Quando a tarefa termina, uma função de "callback" é chamada com o resultado.

---

Pronto para começar? Acesse o [laboratorio.md](laboratorio.md) e vamos configurar seu ambiente!
