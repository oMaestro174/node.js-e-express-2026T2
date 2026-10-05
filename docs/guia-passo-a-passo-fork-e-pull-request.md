# 🚀 Guia Prático: Como Enviar suas Atividades via Fork e Pull Request no GitHub
> **Instituto de Tecnologia e Aprendizado Moderno — ITEAM**  
> **Instrutor:** Professor ITEAM  
> **Objetivo:** Ensinar o fluxo profissional de contribuição no GitHub para que seu nome e trabalho fiquem oficialmente registrados no histórico da turma!

---

## 🎯 Por que usamos Fork e Pull Request?

No mercado profissional de tecnologia e nas maiores empresas de software do mundo, desenvolvedores **não enviam arquivos por e-mail ou pendrive**, e nem sobem alterações direto na branch principal de um projeto compartilhado.

Adotamos o fluxo de **Fork & Pull Request (PR)** porque:
1. 🌟 **Seu Portfólio Ganha Destaque:** Sua foto e seu perfil do GitHub ficam registrados permanentemente na aba **Contributors** do repositório da instituição.
2. 🛡️ **Segurança e Autonomia:** Você trabalha em uma cópia própria e segura do projeto, sem risco de sobrescrever o trabalho de outros colegas.
3. 💬 **Feedback Direto:** O professor pode revisar suas linhas de código, fazer elogios e apontar melhorias diretamente na interface do GitHub!

---

## 🗺️ O Mapa do Fluxo de Trabalho

```text
[Repositório da Turma (ITEAM)]
         │
         │  1. Clicar em "Fork" (Gera uma cópia na sua conta)
         ▼
[Seu Fork Pessoal no GitHub] (github.com/SEU-USUARIO/...)
         │
         │  2. git clone (Baixa para seu computador)
         ▼
[Seu Computador / VS Code]
         │
         ├── 3. git checkout -b minha-entrega
         ├── 4. Desenvolver o código e salvar na sua pasta
         ├── 5. git add .
         └── 6. git commit -m "feat: entrega da atividade"
         │
         │  7. git push origin minha-entrega
         ▼
[Seu Fork Pessoal no GitHub]
         │
         │  8. "Compare & pull request" (Envia o pedido de entrega)
         ▼
[Repositório da Turma (ITEAM)] ➔ ✅ Trabalho Entregue e Registrado!
```

---

## 📋 Passo a Passo Detalhado

### Passo 1: Criar o seu Fork no GitHub
1. Abra o navegador e acesse a página do repositório oficial da sua turma:
   * **Node.js e Express:** `https://github.com/oMaestro174/node.js-e-express-2026T2`
   * **Fundamentos Web:** `https://github.com/oMaestro174/fundamentos-de-desenvolvimento-web-2026T1`
2. No canto superior direito da página, clique no botão **Fork** (ícone de bifurcação):
   > ![Botão Fork](https://docs.github.com/assets/cb-32435/images/help/repository/fork-button.png)
3. Na tela de confirmação:
   * **Owner:** Selecione sua conta pessoal do GitHub.
   * **Repository name:** Mantenha o mesmo nome sugerido.
   * **Copy the main branch only:** Pode deixar marcado.
4. Clique no botão verde **Create fork**.
5. *Pronto!* Agora você está na sua própria cópia do projeto (observe que a URL agora mostra `github.com/SEU-USUARIO/...`).

---

### Passo 2: Clonar o seu Fork para o seu Computador
> ⚠️ **Atenção Máxima:** Não clone o repositório do professor! Clone o link do **seu fork** (onde aparece seu nome de usuário).

1. Na página do seu fork, clique no botão verde **<> Code**.
2. Copie a URL HTTPS (exemplo: `https://github.com/SEU-USUARIO/nome-do-repositorio.git`).
3. Abra o terminal (Git Bash, PowerShell ou Terminal do VS Code) em uma pasta de sua preferência (ex: `C:\Projetos` ou `~/Projetos`).
4. Execute o comando:
   ```bash
   git clone https://github.com/SEU-USUARIO/nome-do-repositorio.git
   ```
5. Entre na pasta clonada:
   ```bash
   cd nome-do-repositorio
   ```
6. Abra o projeto no VS Code:
   ```bash
   code .
   ```

---

### Passo 3: Criar uma Branch com o seu Nome
Nunca faça alterações diretamente na branch `main`. Crie uma branch de trabalho específica para a sua entrega:

```bash
git checkout -b entrega-a1-seu-nome-sobrenome
```
*Exemplo real:* `git checkout -b entrega-a1-lucas-silva`

---

### Passo 4: Adicionar o seu Trabalho na Estrutura Correta
Cada disciplina possui uma convenção de pastas para evitar conflito de arquivos entre os colegas:

#### No Curso de Node.js:
1. Acesse a pasta `Atividades-A1/`.
2. Entre na pasta do seu turno: `Vespertino` ou `Noturno`.
3. Crie uma pasta com o seu **Nome Completo** (ex: `Lucas-Silva/`).
4. Coloque seus arquivos dentro desta pasta (`server.js`, `package.json`, `README.md`, etc.).
> 🚫 **Importante:** NUNCA envie a pasta `node_modules`. Garanta que exista um arquivo `.gitignore` com a linha `node_modules/`.

#### No Curso de Fundamentos Web:
1. Acesse a pasta `Avaliacoes/` (ou a pasta indicada no enunciado da atividade).
2. Dentro de `A1/` (ou `A2/`, `A3/`), crie a pasta do seu turno e nome: `Vespertino/Lucas-Silva/`.
3. Coloque seus arquivos HTML, CSS e imagens nessa pasta.

---

### Passo 5: Salvar, Commitar e Enviar para o GitHub
Depois de testar seu código e ter certeza de que tudo está funcionando:

1. Verifique os arquivos modificados:
   ```bash
   git status
   ```
2. Adicione todos os seus arquivos:
   ```bash
   git add .
   ```
3. Grave o seu commit com uma mensagem clara e profissional:
   ```bash
   git commit -m "feat(entrega): adiciona projeto A1 do aluno Lucas Silva"
   ```
4. Envie a sua branch para o seu Fork no GitHub:
   ```bash
   git push origin entrega-a1-seu-nome-sobrenome
   ```

---

### Passo 6: Abrir o Pull Request (A Entrega Oficial!)
1. Volte ao seu navegador e acesse a página do seu fork no GitHub.
2. Você verá um aviso amarelo no topo com o botão verde: **Compare & pull request**. Clique nele!
   > *Se o banner não aparecer, vá na aba **Pull requests** e clique no botão verde **New pull request**.*
3. Na tela de abertura do Pull Request:
   * **Base repository:** Repositório da turma (`oMaestro174/...`) | **base:** `main`.
   * **Head repository:** Seu fork (`SEU-USUARIO/...`) | **compare:** `entrega-a1-seu-nome-sobrenome`.
4. **Título do PR:** Preencha de forma clara:
   * `[Entrega A1] - Nome Completo - Turno`  
   * *Exemplo:* `[Entrega A1] - Lucas Silva - Vespertino`
5. **Descrição do PR:** Escreva um breve resumo do que você fez:
   ```markdown
   ### Entrega da Avaliação A1
   - **Aluno:** Lucas Silva
   - **Turno:** Vespertino
   - **Desafio Escolhido:** Nível Avançado (API com Validação e Filtros)
   - **O que foi implementado:**
     - Rotas de listagem, cadastro e busca por ID.
     - Middleware de validação dos campos obrigatórios.
     - Tratamento amigável de erros HTTP.
   ```
6. Clique no botão verde **Create pull request**!

🎉 **Parabéns! Sua entrega está oficialmente registrada!**  
O professor receberá uma notificação, avaliará seu código e poderá aprovar o *merge* para incorporar sua entrega ao histórico oficial da turma.

---

## 🔄 Como Manter seu Fork Atualizado (Dica de Ouro)

Quando o professor disponibilizar novos materiais ou aulas no repositório da turma, você pode atualizar seu fork com apenas um clique:

1. Entre na página inicial do **seu fork** no GitHub.
2. Logo abaixo dos botões verdes, clique no botão **Sync fork**.
3. Clique em **Update branch**.
4. No seu computador, volte para a branch `main` e puxe as atualizações:
   ```bash
   git checkout main
   git pull origin main
   ```
Pronto! Seu computador estará 100% sincronizado com o repositório do professor!

---

## 🆘 Dúvidas Frequentes & Erros Comuns

* **"Professor, clonei o repositório do senhor e quando dou `git push` pede permissão de escrita e dá erro 403!"**  
  👉 *Causa:* Você clonou o repositório da turma (`oMaestro174`) em vez do seu fork pessoal.  
  👉 *Solução:* Acesse seu fork pessoal, copie a URL com seu nome de usuário e rode `git remote set-url origin https://github.com/SEU-USUARIO/nome-do-repo.git`.

* **"Esqueci de colocar um arquivo e já abri o Pull Request. Preciso fechar o PR e abrir outro?"**  
  👉 *Não!* O GitHub é inteligente: basta fazer as alterações na sua máquina, rodar `git add .`, `git commit -m "fix: ajuste no arquivo"` e `git push origin sua-branch`. O Pull Request que já está aberto será atualizado automaticamente!
