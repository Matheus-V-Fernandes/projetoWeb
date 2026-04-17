# Laço & Linha — Loja de Artesanato

Aplicação web simples para gerenciamento e exibição de produtos artesanais, com sistema de manifestação de interesse por produto e painel administrativo básico.

---

## Descrição

O projeto **Laço & Linha** é uma aplicação web (no momento, apenas com front-end) que simula uma loja virtual de artesanato em barbante.

Ele se propõe a permitir:
* visualizar produtos
* manifestar interesse pela compra de produtos
* gerenciar produtos (modo administrador)

## Funcionalidades almejadas

### Visitante

* Visualizar catálogo de produtos
* Filtrar por:

  * Destaques
  * Ofertas
  * Catálogo geral
* Manifestar interesse via formulário (popup)

---

### Administrador

* Acessar área administrativa
* Criar novos produtos
* Editar produtos existentes
* Remover produtos
* Visualizar Leads (manifestações de interesse)
* Excluir pedidos

---

## Estrutura do Projeto

```
📁 projeto
│
├── index.html
├── style.css
├── loja.js
│
├── imgs/
│   └── (imagens dos produtos, banners e ícones)
│
└── paginas/
    ├── home.html
    ├── leads.html
    └── produtos.html
```

---

## Armazenamento

Os dados são apenas dummies de:

* lista de produtos
* lista de leads

---

## Limitações

* Não possui backend
* Não há autenticação segura
* Dados fixos e meramente ilustrativos
* Não funciona como sistema multiusuário

---

## Melhorias futuras

* Implementar backend
* Sistema de autenticação seguro
* Integração com banco de dados
* Integração com WhatsApp para manifestações de interesse
* Upload real de imagens
* Responsividade aprimorada

---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript

---

## Como executar

1. Baixe o projeto
2. Abra com um servidor local
3. Acesse no navegador

---


