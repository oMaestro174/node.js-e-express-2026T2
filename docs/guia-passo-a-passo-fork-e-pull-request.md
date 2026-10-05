# 🚀 Guia Prático: Como Entregar Atividades via Fork e Pull Request
> **Instituto de Tecnologia e Aprendizado Moderno — ITEAM**  
> **Curso:** Node.js e Express (Backend) — Turma 2026T2  
> **Instrutor:** Professor ITEAM  
> **Repositório da Turma:** `https://github.com/oMaestro174/node.js-e-express-2026T2`

---

## 🎯 Por que usamos Fork e Pull Request no curso de Node.js?

No mercado profissional de backend e nas empresas que desenvolvem APIs em Node.js, desenvolvedores **não enviam arquivos por e-mail, zip ou pendrive**, e nem sobem código direto na branch principal de um repositório compartilhado.

Adotamos o fluxo de **Fork & Pull Request (PR)** porque:
1. 🌟 **Seu Portfólio de Backend Ganha Vida:** Seu perfil do GitHub e seus commits ficam registrados permanentemente na aba **Contributors** do repositório da turma.
2. 🛡️ **Autonomia para sua API:** Você desenvolve seu código em uma cópia própria e segura do projeto, sem perigo de conflitos com os servidores de outros colegas.
3. 💬 **Code Review Profissional:** O professor revisa sua arquitetura de rotas, middlewares e controllers diretamente na interface do GitHub, deixando feedbacks linha por linha.

---

## 🗺️ O Mapa do Fluxo de Trabalho (Backend)

```text
[Repositório da Turma (Node.js 2026T2)]
         │
         │  1. Clicar em "Fork" (Gera uma cópia na sua conta)
         ▼
[Seu Fork Pessoal no GitHub] (github.com/SEU-USUARIO/node.js-e-express-2026T2)
         │
         │  2. git clone (Baixa para seu computador)
         ▼
[Seu Computador / VS Code]
         │
         ├── 3. git checkout -b entrega-a1-seunome
         ├── 4. Criar sua pasta em Atividades-A1/Turno/Seu-Nome/
         ├── 5. Desenvolver sua API (server.js, package.json)
         ├── 6. git add .
         └── 7. git commit -m "feat(api): entrega do projeto A1"
         │
         │  8. git push origin entrega-a1-seunome
         ▼
[Seu Fork Pessoal no GitHub]
         │
         │  9. "Compare & pull request" (Envia a entrega para o professor)
         ▼
[Repositório da Turma (Node.js 2026T2)] ➔ ✅ API Entregue e Registrada!
```

---


---

## ⚙️ Pré-requisito Obrigatório: Ter o Git Instalado e Configurado

Antes de rodar qualquer comando no seu terminal, certifique-se de que você tem o **Git instalado** na sua máquina:

1. **Como verificar se já está instalado:**  
   Abra seu terminal (PowerShell, Prompt de Comando ou Git Bash) e digite:
   ```bash
   git --version
   ```
   *Se aparecer algo como `git version 2.x.x`, você já está pronto para continuar!*

2. **Se não tiver instalado:**  
   Acesse o site oficial [git-scm.com](https://git-scm.com/downloads) e baixe a versão para o seu sistema operacional (Windows, macOS ou Linux). Durante a instalação, pode manter as opções padrão recomendadas.

3. **Configuração Inicial do Git (apenas na primeira vez):**  
   Configure seu nome e o **mesmo e-mail que você usa na sua conta do GitHub**, para que suas entregas fiquem corretamente associadas ao seu perfil:
   ```bash
   git config --global user.name "Seu Nome Completo"
   git config --global user.email "seu-email-cadastrado-no-github@exemplo.com"
   ```

---

## 📋 Passo a Passo Detalhado

### Passo 1: Criar o seu Fork no GitHub
1. Acesse o repositório oficial da nossa turma:  
   👉 `https://github.com/oMaestro174/node.js-e-express-2026T2`
2. No canto superior direito da página, clique no botão **Fork** (ícone de bifurcação):
   > ![Botão Fork](https://docs.github.com/assets/cb-32435/images/help/repository/fork-button.png)
3. Na tela de confirmação:
   * **Owner:** Selecione sua conta pessoal do GitHub.
   * **Repository name:** Mantenha `node.js-e-express-2026T2`.
   * **Copy the main branch only:** Mantenha marcado.
4. Clique no botão verde **Create fork**.
5. *Pronto!* Agora você está na sua cópia pessoal do repositório (repare que a URL agora é `github.com/SEU-USUARIO/node.js-e-express-2026T2`).

---

### Passo 2: Clonar o seu Fork para o seu Computador
> ⚠️ **Atenção Máxima:** Não clone o repositório do professor! Clone a URL do **seu fork** (onde aparece o seu nome de usuário).

1. Na página do seu fork, clique no botão verde **<> Code**.
2. Copie a URL HTTPS (exemplo: `https://github.com/SEU-USUARIO/node.js-e-express-2026T2.git`).
3. Abra o terminal (PowerShell, Git Bash ou terminal do VS Code) na sua pasta de projetos e digite:
   ```bash
   git clone https://github.com/SEU-USUARIO/node.js-e-express-2026T2.git
   ```
4. Entre na pasta clonada:
   ```bash
   cd node.js-e-express-2026T2
   ```
5. Abra no VS Code:
   ```bash
   code .
   ```

---

### Passo 3: Criar uma Branch com o seu Nome
Nunca faça alterações diretamente na branch `main`. Crie uma branch de trabalho para a sua entrega:

```bash
git checkout -b entrega-a1-seu-nome-sobrenome
```
*Exemplo real:* `git checkout -b entrega-a1-lucas-silva`

---

### Passo 4: Adicionar o seu Trabalho na Estrutura Correta
Para mantermos o repositório limpo e organizado entre todos os colegas:

1. Acesse a pasta **`Atividades-A1/`**.
2. Entre na pasta do seu turno: **`Vespertino/`** ou **`Noturno/`**.
3. Crie uma subpasta com o seu **Nome Completo** (ex: `Atividades-A1/Vespertino/Lucas-Silva/`).
4. Coloque seus arquivos da API dentro dessa pasta:
   * `server.js` (ou `app.js`)
   * `package.json`
   * `README.md` (com instruções de como rodar sua API e exemplos de endpoints)

> 🚫 **REGRA DE OURO DO NODE.JS:**  
> **NUNCA suba a pasta `node_modules` para o GitHub!** Ela contém milhares de arquivos pesados que não devem ser versionados.  
> Certifique-se de que a pasta `node_modules/` esteja listada no `.gitignore`. Quando o professor ou qualquer desenvolvedor for testar seu código, basta rodar `npm install`.

---

### Passo 5: Salvar, Commitar e Enviar para o GitHub
Depois de testar sua API (usando o Postman, Insomnia ou navegador) e garantir que as rotas estão respondendo corretamente:

1. Verifique os arquivos modificados no terminal:
   ```bash
   git status
   ```
2. Adicione os arquivos:
   ```bash
   git add .
   ```
3. Grave o seu commit:
   ```bash
   git commit -m "feat(a1): entrega da API do aluno Lucas Silva"
   ```
4. Envie sua branch para o seu Fork:
   ```bash
   git push origin entrega-a1-seu-nome-sobrenome
   ```

---

### Passo 6: Abrir o Pull Request (A Entrega Oficial!)
1. Volte ao seu navegador na página do seu fork no GitHub.
2. Você verá um banner amarelo no topo com o botão verde: **Compare & pull request**. Clique nele!
3. Na tela de abertura do Pull Request:
   * **Base repository:** `oMaestro174/node.js-e-express-2026T2` | **base:** `main`.
   * **Head repository:** `SEU-USUARIO/node.js-e-express-2026T2` | **compare:** `entrega-a1-seu-nome-sobrenome`.
4. **Título do PR:** Preencha no padrão oficial da turma:
   * `[Entrega A1] - Nome Completo - Turno`  
   * *Exemplo:* `[Entrega A1] - Lucas Silva - Vespertino`
5. **Descrição do PR:** Escreva um resumo da sua API:
   ```markdown
   ### Entrega da Avaliação A1 (Node.js & Express)
   - **Aluno:** Lucas Silva
   - **Turno:** Vespertino
   - **Nível do Desafio:** Avançado
   - **Endpoints Desenvolvidos:**
     - `GET /produtos` (Listagem com filtros)
     - `POST /produtos` (Cadastro com validação)
     - `PUT /produtos/:id` (Atualização)
     - `DELETE /produtos/:id` (Remoção)
   - **Middlewares:** Logger de requisições e validação de body JSON.
   ```
6. Clique no botão verde **Create pull request**!

🎉 **Pronto! Sua API está oficialmente entregue!**  
O professor receberá a notificação, avaliará o seu código no GitHub e fará o merge para registrar sua nota.

---

## 🔄 Como Atualizar seu Fork com Novas Aulas do Curso

Conforme o professor for adicionando novas aulas no repositório da turma:

1. Acesse a página do **seu fork** no GitHub.
2. Clique no botão **Sync fork** (abaixo dos botões verdes).
3. Clique em **Update branch**.
4. No seu computador, volte para a `main` e puxe as atualizações:
   ```bash
   git checkout main
   git pull origin main
   ```
