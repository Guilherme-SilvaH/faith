# ✝️ Faith

**Faith** é uma aplicação web criada para ajudar no acompanhamento da leitura diária da Bíblia. O projeto nasceu de uma necessidade pessoal, onde eu e minha namorada procurávamos um lugar para registrar e organizar nossas leituras diárias. Assim, surgiu a ideia de criar este site.

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: para maior segurança e tipagem no desenvolvimento.
- **Node.js**: backend robusto e escalável.
- **React.js**: construção da interface do usuário.
- **Vite**: ferramenta para build e desenvolvimento rápido.
- **Sass**: estilização moderna e eficiente.

---

## 🌐 API

A API foi desenvolvida para gerenciar o fluxo de dados e autenticação no sistema. Abaixo estão as principais rotas:

### 🔐 Rota de Login
- **URL**: [`https://apibible.vercel.app/api/user/login`](https://apibible.vercel.app/api/user/login)
- Utilizada para autenticação do usuário.

### 📝 Rota de Cadastro
- **URL**: [`https://apibible.vercel.app/api/user/login`](https://apibible.vercel.app/api/user/login)
- Permite o registro de novos usuários.

### 📚 Rota de Adição de Livro
- **URL**: [`https://apibible.vercel.app/api/user/add-book`](https://apibible.vercel.app/api/user/add-book)
- Requer autenticação via **JWT** (token armazenado no `sessionStorage`, gerado no login).
- Responsável por adicionar livros lidos diariamente.

---

## 📜 Regras de Negócio

### 🛂 Cadastro

- Não é permitido cadastrar usando o mesmo e-mail ou nome de usuário.
- Senha deve ter pelo menos **9 dígitos** e é criptografada para maior segurança.

### 📖 Adição de Livros

- É obrigatório informar a **data** e os **livros lidos**.
- Não é possível adicionar um livro que já foi registrado para o mesmo dia.

---

## 🎯 Objetivo do Projeto

O objetivo do **Faith** é simplificar o acompanhamento da leitura da Bíblia, oferecendo um ambiente digital e organizado para registrar o progresso diário, incentivando assim a consistência e o comprometimento com o estudo das Escrituras.

---

Feito com ❤️ e muita fé 🙏 por [Guilherme Silva].

