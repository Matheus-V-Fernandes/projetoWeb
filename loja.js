// ================= MENU MOBILE =================

// Controla o menu no celular (abre/fecha)
var MenuItens = document.getElementById("MenuItens")
MenuItens.style.maxHeight = "0px"

function menucelular() {
  if (MenuItens.style.maxHeight == "0px") MenuItens.style.maxHeight = "500px"
  else MenuItens.style.maxHeight = "0px"
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// ================= PRODUTOS (localStorage) =================

// Busca produtos no navegador
function getProdutos() {
  var dados = localStorage.getItem("laco_produtos")

  // Se existir, retorna os dados convertidos de JSON
  if (dados) return JSON.parse(dados)

  // Caso contrário, retorna produtos padrão
  return [
    {
      id: 1,
      nome: "Tapete redondo de flor (Azul)",
      preco: 39.99,
      img: "imgs/produto1.jpeg",
      alt: "Tapete redondo de flor azul",
      categoria: "destaque",
    },
    {
      id: 2,
      nome: "Pano de prato natalino",
      preco: 19.99,
      img: "imgs/produto2.jpeg",
      alt: "Panos de prato natalino",
      categoria: "oferta",
    },
    {
      id: 3,
      nome: "Jogo de banheiro (Amarelo)",
      preco: 74.99,
      img: "imgs/produto3.png",
      alt: "Jogo de banheiro amarelo",
      categoria: "destaque",
    },
    {
      id: 4,
      nome: "Tapete de coração (Rosa)",
      preco: 39.99,
      img: "imgs/produto4.jpeg",
      alt: "Tapete de coração rosa",
      categoria: "catalogo",
    },
    {
      id: 5,
      nome: "Pano de prato Vegetais",
      preco: 15.99,
      img: "imgs/produto5.png",
      alt: "Panos de pratos de vegetais",
      categoria: "catalogo",
    },
    {
      id: 6,
      nome: "Tapete longo (Branco e Azul)",
      preco: 49.99,
      img: "imgs/produto6.png",
      alt: "Tapete longo branco e azul",
      categoria: "destaque",
    },
    {
      id: 7,
      nome: "Tapete pequeno (Cinza)",
      preco: 24.99,
      img: "imgs/produto7.jpeg",
      alt: "Tapetes pequenos cinzas",
      categoria: "destaque",
    },
    {
      id: 8,
      nome: "Tapete pequeno (Marrom)",
      preco: 22.99,
      img: "imgs/produto8.jpeg",
      alt: "Tapetes pequenos marrons",
      categoria: "catalogo",
    },
    {
      id: 9,
      nome: "Tapete pequeno florido (Marrom e Branco)",
      preco: 24.99,
      img: "imgs/produto9.jpeg",
      alt: "Tapete pequeno",
      categoria: "oferta",
    },
  ]
}

// Salva lista de produtos no navegador
function salvarProdutos(lista) {
  localStorage.setItem("laco_produtos", JSON.stringify(lista))
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// ================= PEDIDOS =================

// Busca pedidos salvos
function getPedidos() {
  var dados = localStorage.getItem("laco_pedidos")
  return dados ? JSON.parse(dados) : []
}

function salvarPedidos(lista) {
  localStorage.setItem("laco_pedidos", JSON.stringify(lista))
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// ================= NAVEGAÇÃO =================

// Controla qual página aparece
function mostrarPagina(pagina) {
  // Esconde todas
  document.getElementById("pagina-home").style.display = "none"
  document.getElementById("pagina-pedidos").style.display = "none"
  document.getElementById("pagina-admin").style.display = "none"
  document.getElementById("banner-hero").style.display = "none"

  // Mostra a escolhida
  if (pagina === "home") {
    document.getElementById("pagina-home").style.display = "block"
    document.getElementById("banner-hero").style.display = "flex"
    renderizarHome()
  } else if (pagina === "pedidos") {
    document.getElementById("pagina-pedidos").style.display = "block"
    renderizarPedidos()
  } else if (pagina === "admin") {
    document.getElementById("pagina-admin").style.display = "block"
    renderizarAdmin()
  }

  // Fecha menu mobile
  MenuItens.style.maxHeight = "0px"
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// ================= RENDERIZAÇÃO =================

// Cria HTML de um produto
function cardProduto(p) {
  return `<div class="col-4" onclick="abrirPopup(${p.id})">
            <img src="${p.img}" alt="${p.alt}">
            <h4>${p.nome}</h4>
            <p>R$ ${p.preco.toFixed(2)}</p>
        </div>
    `
}

// Junta vários produtos
function agruparEmLinhas(produtos) {
  return produtos.map(cardProduto).join("")
}

// Mostra produtos na home
function renderizarHome() {
  var produtos = getProdutos()

  // Filtra categorias
  var destaques = produtos.filter((p) => p.categoria === "destaque")
  var ofertas = produtos.filter((p) => p.categoria === "oferta")
  var todos = produtos

  // Atualiza HTML
  document.getElementById("destaque-grid").innerHTML = destaques.length
    ? agruparEmLinhas(destaques)
    : '<p class="sem-itens">Nenhum produto em destaque.</p>'

  document.getElementById("ofertas-grid").innerHTML = ofertas.length
    ? agruparEmLinhas(ofertas)
    : '<p class="sem-itens">Nenhuma oferta no momento.</p>'

  document.getElementById("catalogo-grid").innerHTML = todos.length
    ? agruparEmLinhas(todos)
    : '<p class="sem-itens">Nenhum produto cadastrado.</p>'
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// Pop-up de pedido
var produtoAtual = null

function abrirPopup(id) {
  var produtos = getProdutos()
  var produto = produtos.find(function (p) {
    return p.id === id
  })
  if (!produto) return
  produtoAtual = produto

  document.getElementById("popup-produto-nome").textContent = produto.nome
  document.getElementById("popup-produto-preco").textContent =
    "R$ " + produto.preco.toFixed(2)
  document.getElementById("pedido-nome").value = ""
  document.getElementById("pedido-telefone").value = ""
  document.getElementById("pedido-quantidade").value = ""
  document.getElementById("pedido-cidade").value = ""
  document.getElementById("pedido-endereco").value = ""
  document.getElementById("pedido-obs").value = ""

  document.getElementById("popup-overlay").classList.add("ativo")
}

function fecharPopupBtn() {
  document.getElementById("popup-overlay").classList.remove("ativo")
  produtoAtual = null
}

function fecharPopup(e) {
  if (e.target === document.getElementById("popup-overlay")) fecharPopupBtn()
}

function confirmarPedido() {
  var nome = document.getElementById("pedido-nome").value.trim()
  var telefone = document.getElementById("pedido-telefone").value.trim()
  var quantidade = document.getElementById("pedido-quantidade").value.trim()
  var cidade = document.getElementById("pedido-cidade").value.trim()
  var endereco = document.getElementById("pedido-endereco").value.trim()
  var obs = document.getElementById("pedido-obs").value.trim()

  if (!nome || !telefone || !quantidade) {
    alert("Por favor, preencha pelo menos seu nome, WhatsApp e quantidade.")
    return
  }
  var pedidos = getPedidos()
  var novoPedido = {
    id: Date.now(),
    produto: produtoAtual.nome,
    preco: produtoAtual.preco,
    nome: nome,
    telefone: telefone,
    quantidade: quantidade,
    cidade: cidade,
    endereco: endereco,
    obs: obs,
    data: new Date().toLocaleDateString("pt-BR"),
  }
  pedidos.push(novoPedido)
  salvarPedidos(pedidos)

  fecharPopupBtn()
  alert('Pedido de "' + novoPedido.produto + '" registrado com sucesso!')
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function renderizarPedidos() {
  // Renderização de pedidos
  var pedidos = getPedidos()
  var lista = document.getElementById("lista-pedidos")

  if (pedidos.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhum pedido registrado ainda.</p>'
    return
  }

  lista.innerHTML = pedidos
    .map(function (p) {
      return (
        '<div class="card-pedido">' +
        '<div class="card-pedido-info">' +
        "<h4>" +
        p.quantidade +
        " un. - " +
        p.produto +
        " — R$ " +
        (p.preco * p.quantidade).toFixed(2) +
        "</h4>" +
        "<p><strong>Cliente:</strong> " +
        p.nome +
        " | <strong>Tel:</strong> " +
        p.telefone +
        "</p>" +
        (p.cidade ? "<p><strong>Cidade:</strong> " + p.cidade + "</p>" : "") +
        (p.endereco
          ? "<p><strong>Endereço:</strong> " + p.endereco + "</p>"
          : "") +
        (p.obs ? "<p><strong>Obs:</strong> " + p.obs + "</p>" : "") +
        '<p style="font-size:12px; color:#aaa; margin-top:6px">Pedido em ' +
        p.data +
        "</p>" +
        "</div>" +
        '<button class="btn-apagar" onclick="apagarPedido(' +
        p.id +
        ')">&#x1F5D1; Apagar</button>' +
        "</div>"
      )
    })
    .join("")
}

function apagarPedido(id) {
  if (!confirm("Apagar este pedido?")) return
  var pedidos = getPedidos().filter(function (p) {
    return p.id !== id
  })
  salvarPedidos(pedidos)
  renderizarPedidos()
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// Administração dos produtos
function renderizarAdmin() {
  var produtos = getProdutos()
  var lista = document.getElementById("admin-lista-produtos")

  if (produtos.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhum produto cadastrado.</p>'
    return
  }

  var labelCat = {
    destaque: "Destaque",
    oferta: "Oferta",
    catalogo: "Catálogo",
  }

  lista.innerHTML = produtos
    .map(function (p) {
      return (
        '<div class="card-admin">' +
        '<div class="card-admin-info">' +
        "<strong>" +
        p.nome +
        "</strong>" +
        '<span class="badge">' +
        (labelCat[p.categoria] || p.categoria) +
        "</span>" +
        "<br>R$ " +
        p.preco.toFixed(2) +
        "</div>" +
        '<div class="card-admin-acoes">' +
        '<button class="btn-editar" onclick="editarProduto(' +
        p.id +
        ')">&#9998; Editar</button>' +
        '<button class="btn-apagar" onclick="apagarProduto(' +
        p.id +
        ')">&#x1F5D1; Apagar</button>' +
        "</div>" +
        "</div>"
      )
    })
    .join("")
}

function salvarProduto() {
  var id = document.getElementById("admin-id").value
  var nome = document.getElementById("admin-nome").value.trim()
  var preco = parseFloat(document.getElementById("admin-preco").value)
  var img = document.getElementById("admin-img").value.trim()
  var alt = document.getElementById("admin-alt").value.trim()
  var cat = document.getElementById("admin-cat").value

  if (!nome || isNaN(preco) || !img) {
    alert("Preencha pelo menos nome, preço e caminho da imagem.")
    return
  }

  var produtos = getProdutos()

  if (id) {
    // Edição de produto existente
    produtos = produtos.map(function (p) {
      if (p.id === parseInt(id)) {
        return {
          id: p.id,
          nome: nome,
          preco: preco,
          img: img,
          alt: alt,
          categoria: cat,
        }
      }
      return p
    })
  } else {
    // Inserção de novo produto
    var novoId = Date.now()
    produtos.push({
      id: novoId,
      nome: nome,
      preco: preco,
      img: img,
      alt: alt,
      categoria: cat,
    })
  }
  salvarProdutos(produtos)
  limparFormAdmin()
  renderizarAdmin()
  alert("Produto salvo com sucesso!")
}

function editarProduto(id) {
  var produtos = getProdutos()
  var p = produtos.find(function (x) {
    return x.id === id
  })
  if (!p) return

  document.getElementById("admin-id").value = p.id
  document.getElementById("admin-nome").value = p.nome
  document.getElementById("admin-preco").value = p.preco
  document.getElementById("admin-img").value = p.img
  document.getElementById("admin-alt").value = p.alt
  document.getElementById("admin-cat").value = p.categoria

  window.scrollTo({ top: 0, behavior: "smooth" })
}

function apagarProduto(id) {
  if (!confirm("Apagar este produto?")) return
  var produtos = getProdutos().filter(function (p) {
    return p.id !== id
  })
  salvarProdutos(produtos)
  renderizarAdmin()
}

function limparFormAdmin() {
  document.getElementById("admin-id").value = ""
  document.getElementById("admin-nome").value = ""
  document.getElementById("admin-preco").value = ""
  document.getElementById("admin-img").value = ""
  document.getElementById("admin-alt").value = ""
  document.getElementById("admin-cat").value = "destaque"
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

mostrarPagina("home")

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
