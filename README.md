# Laço & Linha — Loja de Artesanato

Aplicação web para gerenciamento e exibição de produtos artesanais, com sistema de manifestação de interesse por produto e painel administrativo.

---

## Descrição

O projeto **Laço & Linha** é uma aplicação web full-stack para uma loja virtual de artesanato em barbante. Permite que visitantes visualizem produtos e demonstrem interesse via formulário, enquanto a administradora gerencia o catálogo e acompanha os pedidos recebidos.

---

## Funcionalidades

### Visitante
- Visualizar catálogo de produtos
- Filtrar por Destaques, Ofertas e Catálogo geral
- Manifestar interesse via formulário (popup)

### Administrador
- Login seguro com e-mail e senha
- Criar, editar e remover produtos (com upload de imagem)
- Visualizar leads (manifestações de interesse)
- Atualizar status dos pedidos (Pendente, Em contato, Venda efetivada, Cancelado)
- Excluir pedidos
- Alterar senha de acesso

---

## Estrutura do Projeto

```
📁 backend/
│
├── index.js
├── dbsync.js
├── package.json
├── .env
│
├── 📁 models/
│   ├── admin.model.js
│   ├── product.model.js
│   ├── lead.model.js
│   └── dbconfig.js
│
├── 📁 controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
│   └── lead.controller.js
│
├── 📁 routes/
│   └── api.routes.js
│
├── 📁 media/
│   └── media.uploader.js
│
└── 📁 public/              ← frontend
    ├── index.html
    ├── style.css
    ├── loja.js
    ├── 📁 imgs/
    └── 📁 paginas/
        ├── home.html
        ├── leads.html
        └── produtos.html
```

---

## Tecnologias utilizadas

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)

### Backend
- Node.js + Express
- Sequelize ORM + PostgreSQL (Supabase)
- JWT (autenticação)
- bcryptjs (criptografia de senhas)
- Multer (upload de arquivos)
- Supabase Storage (armazenamento de imagens)

---

## Como executar

### Pré-requisitos
- Node.js instalado
- Conta no Supabase (banco de dados e bucket de imagens)

### Configuração

1. Clone o repositório
2. Entre na pasta `backend/`
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie o arquivo `.env` com as variáveis:
   ```
   PGHOST=...
   PGUSER=...
   PGDATABASE=...
   PGPASSWORD=...
   SUPABASE_URL=...
   SUPABASE_KEY=...
   SUPABASE_BUCKET=...
   AUTH_SECRET=...
   ADMIN_EMAIL=...
   ADMIN_PASSWORD=...
   ```
5. Execute o setup inicial (cria tabelas e admin):
   ```bash
   npm run setup
   ```
6. Inicie o servidor:
   ```bash
   npm start
   ```
7. Acesse no navegador: `http://localhost:3000`

---

## API REST

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | /signin | Login do admin | ❌ |
| PUT | /auth/password | Alterar senha | ✅ |
| GET | /products | Listar produtos | ❌ |
| POST | /products | Criar produto | ✅ |
| PUT | /products/:id | Editar produto | ✅ |
| DELETE | /products/:id | Remover produto | ✅ |
| GET | /leads | Listar leads | ✅ |
| POST | /leads | Criar lead | ❌ |
| PUT | /leads/:id | Atualizar status | ✅ |
| DELETE | /leads/:id | Remover lead | ✅ |
