/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Responsividade
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
  var MenuItens = document.getElementById("MenuItens")
  if (MenuItens) {
    MenuItens.style.maxHeight = "0px" // Garante que o menu para celular comece fechado
  }
})

function menucelular() {
  // Função para abrir e fechar menu para celular
  if (MenuItens.style.maxHeight == "0px") MenuItens.style.maxHeight = "500px"
  else MenuItens.style.maxHeight = "0px"
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Dados Dummy
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
var produtos = getProdutos() // carrega os dados iniciais

function getProdutos() {
  // Produtos padrão
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

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function getLeads() {
  // Demonstrações de interesse padrão
  return [
    {
      id: 1,
      produto: "Tapete redondo de flor (Azul)",
      preco: 39.99,
      nome: "Carlos Magno",
      telefone: "(14) 99712-8750",
      quantidade: 1,
      cidade: "Ourinhos",
      endereco: "Rua X, nºY, Bairro Z",
      obs: "Nenhuma",
      data: "15/04/2026",
    },
    {
      id: 1,
      produto: "Pano de prato natalino",
      preco: 39.98,
      nome: "Maria Silva",
      telefone: "(14) 99722-8340",
      quantidade: 2,
      cidade: "Chavantes",
      endereco: "Rua A, nºB, Bairro C",
      obs: "NenhLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ex sed quam efficitur mattis.",
      data: "13/04/2026",
    },
    {
      id: 3,
      produto: "Jogo de banheiro (Amarelo)",
      preco: 74.99,
      nome: "Ana Silva",
      telefone: "(14) 99622-5710",
      quantidade: 1,
      cidade: "Chavantes",
      endereco: "Rua A, nºB, Bairro C",
      obs: "Nenhuma observação!",
      data: "13/04/2026",
    },
    {
      id: 4,
      produto: "Tapete de coração (Rosa)",
      preco: 39.99,
      nome: "Joaquim",
      telefone: "(14) 99784-2243",
      quantidade: 1,
      cidade: "Canitar",
      endereco: "Rua P, nºQ, Bairro R",
      obs: "",
      data: "11/04/2026",
    },
    {
      id: 5,
      produto: "Tapete longo (Branco e Azul)",
      preco: 49.99,
      nome: "Maria Silva",
      telefone: "(14) 99722-8340",
      quantidade: 1,
      cidade: "Chavantes",
      endereco: "Rua A, nºB, Bairro C",
      obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      data: "13/04/2026",
    },
  ]
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Carregamento das páginas
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

async function load(caminho) {
  // Função para o carregamento das páginas em conteúdo
  try {
    const pagina = await fetch(caminho)
    if (!pagina.ok) throw new Error(`Erro HTTP: ${pagina.status}`)
    const textoHtml = await pagina.text()
    document.getElementById("conteudo").innerHTML = textoHtml
  } catch (erro) {
    console.error("Erro ao carregar conteúdo:", erro)
  }
}
async function mostrarPagina(pagina) {
  // Função para renderização das informações da página

  document.getElementById("banner-principal").style.display = "none" // Oculta banner principal
  var itensAdmin = document.querySelectorAll(".admin") // Guarda itens de Admin do menu
  var itensVisitante = document.querySelectorAll(".visitante") // Guarda iten de Visitante do menu

  if (modo === "visitante") {
    // Se o modo for de visitante
    itensAdmin.forEach(function (item) {
      item.classList.add("oculto") // Oculta itens de Admin
    })
    itensVisitante.forEach(function (item) {
      item.classList.remove("oculto") // Expões itens de Visitante
    })
  } else if (modo === "admin") {
    itensAdmin.forEach(function (item) {
      item.classList.remove("oculto") // Expões itens de Admin
    })
    itensVisitante.forEach(function (item) {
      item.classList.add("oculto") // Oculta itens de Visitante
    })
  }
  if (pagina === "home") {
    await load("paginas/home.html") // Carregamento da home
    document.getElementById("banner-principal").style.display = "flex" // Mostra banner principal
    renderizarHome() // Renderização do catálogo de produtos da home
  } else if (pagina === "leads") {
    await load("paginas/leads.html") // Carregamento da página de visualização de lead-4s
    renderizarLeads()
  } else if (pagina === "produtos") {
    await load("paginas/produtos.html") // carrega o HTML

    renderizarProdutos() // renderiza a lista

    configurarDropImage() // ativa drag & drop (DEPOIS do load)
  }
  MenuItens.style.maxHeight = "0px" // Fechamento do menu de celular
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização dos produtos
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function cardProduto(p) {
  // Estrutura do card de produto
  return `<div class="col-4" onclick="abrirPopup(${p.id})">
            <img src="${p.img}" alt="${p.alt}">
            <h4>${p.nome}</h4>
            <h5>R$ ${p.preco.toFixed(2)}</h5>
        </div>
    `
}
function renderizarHome() {
  // Função para renderizar os produtos Dummy na home

  var destaques = produtos.filter((p) => p.categoria === "destaque")
  var ofertas = produtos.filter((p) => p.categoria === "oferta")
  var todos = produtos

  document.getElementById("destaque-grid").innerHTML = destaques.length
    ? destaques.map(cardProduto).join("")
    : '<p class="sem-itens">Nenhum produto em destaque.</p>'

  document.getElementById("ofertas-grid").innerHTML = ofertas.length
    ? ofertas.map(cardProduto).join("")
    : '<p class="sem-itens">Nenhuma oferta no momento.</p>'

  document.getElementById("catalogo-grid").innerHTML = todos.length
    ? todos.map(cardProduto).join("")
    : '<p class="sem-itens">Nenhum produto cadastrado.</p>'
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Pop-up de demonstração de interesse
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var produtoAtual = null

function abrirPopup(id) {
  var produto = produtos.find(function (p) {
    return p.id === id
  })
  if (!produto) return

  produtoAtual = produto
  document.getElementById("popup-produto-nome").textContent = produto.nome
  document.getElementById("popup-produto-preco").textContent =
    "R$ " + produto.preco.toFixed(2)
  document.getElementById("lead-nome").value = ""
  document.getElementById("lead-telefone").value = ""
  document.getElementById("lead-quantidade").value = ""
  document.getElementById("lead-cidade").value = ""
  document.getElementById("lead-endereco").value = ""
  document.getElementById("lead-obs").value = ""

  document.getElementById("popup-overlay").classList.add("ativo")
}

function fecharPopupBtn() {
  document.getElementById("popup-overlay").classList.remove("ativo")
  produtoAtual = null
}

function fecharPopup(e) {
  if (e.target === document.getElementById("popup-overlay")) fecharPopupBtn()
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização de indicações de interesse
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function renderizarLeads() {
  // Função para renderizar os leads Dummy na página de leads
  var leads = getLeads()
  var lista = document.getElementById("lista-leads")

  if (leads.length === 0) {
    lista.innerHTML =
      '<p class="sem-itens">Nenhuma indicação de interesse registrada ainda.</p>'
    return
  }
  lista.innerHTML = leads
    .map(function (p) {
      return (
        '<div class="card-lead">' +
        '<div class="card-lead-info">' +
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
        '<p style="font-size:12px; color:#aaa; margin-top:6px">Registrado em ' +
        p.data +
        "</p>" +
        "</div>" +
        '<button class="btn-apagar" onclick="">&#x1F5D1; Apagar</button>' +
        "</div>"
      )
    })
    .join("")
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização dos produtos
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function renderizarProdutos() {
  // Função para renderizar os produtos Dummy na página de gerenciamento de produtos

  var lista = document.getElementById("produtos-lista-produtos")

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
        '<div class="card-produtos">' +
        '<div class="card-produtos-info">' +
        "<strong>" +
        p.nome +
        "</strong>" +
        '<span class="badge">' +
        (labelCat[p.categoria] || p.categoria) +
        "</span>" +
        "<br>R$ " +
        p.preco.toFixed(2) +
        "</div>" +
        '<div class="card-produtos-acoes">' +
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
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Pseudo-autenticação
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function autenticar() {
  // Função para ilustrar autenticação do administrador
  modo = "admin"
  mostrarPagina("home")
}

function sair() {
  // Função para ilustrar logout do administrador
  modo = "visitante"
  mostrarPagina("home")
}
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var modo = "visitante" // Inicia a aplicação no modo Visitante
mostrarPagina("home") // Inicia a aplicação exibindo a home

/*=========================== MUDANÇAS AQUI =============================*/
function salvarProduto() {
  var id = document.getElementById("produtos-id").value
  var nome = document.getElementById("produtos-nome").value
  var preco = parseFloat(document.getElementById("produtos-preco").value)
  var alt = document.getElementById("produtos-alt").value
  var categoria = document.getElementById("produtos-cat").value

  // imagem simples (por enquanto)
  var img = (document.getElementById("preview-img")).src

  if (!nome || !preco) {
    alert("Preencha nome e preço!")
    return
  }

  if (id) {
    // EDITAR
    var produto = produtos.find((p) => p.id == id)
    if (produto) {
      produto.nome = nome
      produto.preco = preco
      produto.alt = alt
      produto.categoria = categoria
      produto.img = img
    }
  } else {
    //  NOVO PRODUTO
    var novoProduto = {
      id: Date.now(), // id único simples
      nome: nome,
      preco: preco,
      img: img,
      alt: alt,
      categoria: categoria,
    }

    produtos.push(novoProduto)
  }

  limparFormProduto()
  renderizarProdutos()
}

function editarProduto(id) {
  var produto = produtos.find((p) => p.id === id)
  if (!produto) return

  document.getElementById("produtos-id").value = produto.id
  document.getElementById("produtos-nome").value = produto.nome
  document.getElementById("produtos-preco").value = produto.preco
  document.getElementById("produtos-alt").value = produto.alt
  document.getElementById("produtos-cat").value = produto.categoria

  // preview opcional
  var texto = document.getElementById("drop-text-img")
  texto.textContent = "Imagem atual do produto (clique para trocar)"
  var preview = document.getElementById("preview-img")
  preview.src = produto.img
  preview.style.display = "block"
}

// Função responsável por zerar o forms de adição/edição de produtos
function limparFormProduto() {
  document.getElementById("produtos-id").value = ""
  document.getElementById("produtos-nome").value = ""
  document.getElementById("produtos-preco").value = ""
  document.getElementById("produtos-alt").value = ""
  document.getElementById("produtos-cat").value = "destaque"

  document.getElementById("drop-text-img").textContent =
    "Arraste a imagem aqui ou clique para selecionar"
  var preview = document.getElementById("preview-img")
  preview.src=""
  preview.style.display = "none"
}

function apagarProduto(id) {
  produtos = produtos.filter((p) => p.id !== id)
  renderizarProdutos()
}

function configurarDropImage() {
  const dropArea = document.getElementById("drop-area")
  const inputFile = document.getElementById("produtos-file")
  const preview = document.getElementById("preview-img")
  const texto = document.getElementById("drop-text-img")

  if (!dropArea) return // evita erro quando não está na página

  //  Clique abre seletor
  dropArea.addEventListener("click", () => {
    inputFile.click()
  })

  //  Quando selecionar arquivo
  inputFile.addEventListener("change", function () {
    if (this.files.length > 0) {
      mostrarPreview(this.files[0])
    }
  })

  //  Arrastar sobre a área
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropArea.classList.add("drag-over")
  })

  //  Sai da área
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-over")
  })

  //  Soltar arquivo
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault()
    dropArea.classList.remove("drag-over")

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      inputFile.files = e.dataTransfer.files
      mostrarPreview(file)
    }
  })

  function mostrarPreview(file) {
    const reader = new FileReader()

    reader.onload = function (e) {
      preview.src = e.target.result
      preview.style.display = "block"

      texto.textContent = "Imagem carregada! (Clique para trocar)"
    }

    reader.readAsDataURL(file)
  }
}
