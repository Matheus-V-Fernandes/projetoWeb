/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Responsividade
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
  var MenuItens = document.getElementById("MenuItens")
  if (MenuItens) {
    MenuItens.style.maxHeight = "0px" // Garante que o menu para celular comece fechado
  }
})

function menucelular() {
  if (MenuItens.style.maxHeight == "0px") MenuItens.style.maxHeight = "500px"
  else MenuItens.style.maxHeight = "0px"
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Autenticação (CRUD de senha armazenada em localStorage)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var SENHA_KEY = "laco_linha_senha"
var SESSAO_KEY = "laco_linha_sessao"

function getSenhaAdmin() {
  // Retorna a senha salva, ou a senha padrão se ainda não foi definida
  return localStorage.getItem(SENHA_KEY) || "admin123"
}

function setSenhaAdmin(novaSenha) {
  localStorage.setItem(SENHA_KEY, novaSenha)
}

function iniciarSessao() {
  sessionStorage.setItem(SESSAO_KEY, "1")
}

function encerrarSessao() {
  sessionStorage.removeItem(SESSAO_KEY)
}

function sessaoAtiva() {
  return sessionStorage.getItem(SESSAO_KEY) === "1"
}

// --- Modal de login ---

function autenticar() {
  // Exibe o modal de login ao clicar em "Admin"
  criarModalLogin()
}

function criarModalLogin() {
  removerModal()

  var modal = document.createElement("div")
  modal.id = "modal-auth"
  modal.className = "modal-auth-overlay"
  modal.innerHTML = `
    <div class="modal-auth">
      <button class="popup-fechar" onclick="removerModal()">&#x2715;</button>
      <h2>Acesso Administrativo</h2>
      <div class="popup-campo">
        <label for="auth-senha">Senha</label>
        <input type="password" id="auth-senha" placeholder="Digite a senha" onkeydown="if(event.key==='Enter') confirmarLogin()">
      </div>
      <p id="auth-erro" style="color:#e55;font-size:13px;min-height:18px;margin-top:4px;"></p>
      <button class="btn" onclick="confirmarLogin()">Entrar</button>
    </div>
  `
  document.body.appendChild(modal)
  setTimeout(function () { modal.classList.add("ativo") }, 10)
  setTimeout(function () {
    var campo = document.getElementById("auth-senha")
    if (campo) campo.focus()
  }, 50)
}

function confirmarLogin() {
  var campo = document.getElementById("auth-senha")
  var erro = document.getElementById("auth-erro")
  if (!campo) return

  if (campo.value === getSenhaAdmin()) {
    iniciarSessao()
    modo = "admin"
    removerModal()
    mostrarPagina("home")
  } else {
    erro.textContent = "Senha incorreta. Tente novamente."
    campo.value = ""
    campo.focus()
  }
}

function sair() {
  encerrarSessao()
  modo = "visitante"
  mostrarPagina("home")
}

// --- Modal de alteração de senha (acessível na página de produtos) ---

function abrirModalAlterarSenha() {
  removerModal()

  var modal = document.createElement("div")
  modal.id = "modal-auth"
  modal.className = "modal-auth-overlay"
  modal.innerHTML = `
    <div class="modal-auth">
      <button class="popup-fechar" onclick="removerModal()">&#x2715;</button>
      <h2>Alterar Senha</h2>
      <div class="popup-campo">
        <label for="auth-senha-atual">Senha atual</label>
        <input type="password" id="auth-senha-atual" placeholder="Senha atual">
      </div>
      <div class="popup-campo">
        <label for="auth-senha-nova">Nova senha</label>
        <input type="password" id="auth-senha-nova" placeholder="Nova senha (mínimo 4 caracteres)">
      </div>
      <div class="popup-campo">
        <label for="auth-senha-confirmar">Confirmar nova senha</label>
        <input type="password" id="auth-senha-confirmar" placeholder="Repita a nova senha">
      </div>
      <p id="auth-erro" style="color:#e55;font-size:13px;min-height:18px;margin-top:4px;"></p>
      <p id="auth-ok" style="color:#3b9;font-size:13px;min-height:18px;margin-top:4px;"></p>
      <button class="btn" onclick="confirmarAlterarSenha()">Salvar nova senha</button>
    </div>
  `
  document.body.appendChild(modal)
  setTimeout(function () { modal.classList.add("ativo") }, 10)
}

function confirmarAlterarSenha() {
  var atual = document.getElementById("auth-senha-atual").value
  var nova = document.getElementById("auth-senha-nova").value
  var confirmar = document.getElementById("auth-senha-confirmar").value
  var erro = document.getElementById("auth-erro")
  var ok = document.getElementById("auth-ok")

  erro.textContent = ""
  ok.textContent = ""

  if (atual !== getSenhaAdmin()) {
    erro.textContent = "Senha atual incorreta."
    return
  }
  if (nova.length < 4) {
    erro.textContent = "A nova senha deve ter pelo menos 4 caracteres."
    return
  }
  if (nova !== confirmar) {
    erro.textContent = "As senhas não coincidem."
    return
  }

  setSenhaAdmin(nova)
  ok.textContent = "✔ Senha alterada com sucesso!"
  setTimeout(removerModal, 1500)
}

function removerModal() {
  var m = document.getElementById("modal-auth")
  if (m) {
    m.classList.remove("ativo")
    setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m) }, 300)
  }
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Dados
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var produtos = getProdutos()

function getProdutos() {
  return [
    { id: 1, nome: "Tapete redondo de flor (Azul)",        preco: 39.99, img: "imgs/produto1.jpeg", alt: "Tapete redondo de flor azul",        categoria: "destaque" },
    { id: 2, nome: "Pano de prato natalino",               preco: 19.99, img: "imgs/produto2.jpeg", alt: "Panos de prato natalino",             categoria: "oferta"   },
    { id: 3, nome: "Jogo de banheiro (Amarelo)",           preco: 74.99, img: "imgs/produto3.png",  alt: "Jogo de banheiro amarelo",            categoria: "destaque" },
    { id: 4, nome: "Tapete de coração (Rosa)",             preco: 39.99, img: "imgs/produto4.jpeg", alt: "Tapete de coração rosa",              categoria: "catalogo" },
    { id: 5, nome: "Pano de prato Vegetais",               preco: 15.99, img: "imgs/produto5.png",  alt: "Panos de pratos de vegetais",         categoria: "catalogo" },
    { id: 6, nome: "Tapete longo (Branco e Azul)",         preco: 49.99, img: "imgs/produto6.png",  alt: "Tapete longo branco e azul",          categoria: "destaque" },
    { id: 7, nome: "Tapete pequeno (Cinza)",               preco: 24.99, img: "imgs/produto7.jpeg", alt: "Tapetes pequenos cinzas",             categoria: "destaque" },
    { id: 8, nome: "Tapete pequeno (Marrom)",              preco: 22.99, img: "imgs/produto8.jpeg", alt: "Tapetes pequenos marrons",            categoria: "catalogo" },
    { id: 9, nome: "Tapete pequeno florido (Marrom/Branco)",preco: 24.99, img: "imgs/produto9.jpeg", alt: "Tapete pequeno",                     categoria: "oferta"   },
  ]
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Leads — com status e persistência em localStorage
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var LEADS_KEY = "laco_linha_leads"

function getLeads() {
  var salvo = localStorage.getItem(LEADS_KEY)
  if (salvo) {
    try { return JSON.parse(salvo) } catch (e) {}
  }
  // Dados iniciais (dummy) — apenas carregados uma vez
  var iniciais = [
    { id: 1, produto: "Tapete redondo de flor (Azul)",  preco: 39.99, nome: "Carlos Magno", telefone: "(14) 99712-8750", quantidade: 1, cidade: "Ourinhos",  endereco: "Rua X, nºY, Bairro Z", obs: "Nenhuma",                                                                    data: "15/04/2026", status: "pendente"   },
    { id: 2, produto: "Pano de prato natalino",         preco: 19.99, nome: "Maria Silva",  telefone: "(14) 99722-8340", quantidade: 2, cidade: "Chavantes", endereco: "Rua A, nºB, Bairro C", obs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",                    data: "13/04/2026", status: "contato"    },
    { id: 3, produto: "Jogo de banheiro (Amarelo)",     preco: 74.99, nome: "Ana Silva",    telefone: "(14) 99622-5710", quantidade: 1, cidade: "Chavantes", endereco: "Rua A, nºB, Bairro C", obs: "Nenhuma observação!",                                                        data: "13/04/2026", status: "efetivado"  },
    { id: 4, produto: "Tapete de coração (Rosa)",       preco: 39.99, nome: "Joaquim",      telefone: "(14) 99784-2243", quantidade: 1, cidade: "Canitar",   endereco: "Rua P, nºQ, Bairro R", obs: "",                                                                           data: "11/04/2026", status: "pendente"   },
    { id: 5, produto: "Tapete longo (Branco e Azul)",   preco: 49.99, nome: "Maria Silva",  telefone: "(14) 99722-8340", quantidade: 1, cidade: "Chavantes", endereco: "Rua A, nºB, Bairro C", obs: "Lorem ipsum dolor sit amet.",                                                data: "13/04/2026", status: "cancelado"  },
  ]
  salvarLeads(iniciais)
  return iniciais
}

function salvarLeads(leads) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
}

function atualizarStatusLead(id, novoStatus) {
  var leads = getLeads()
  var lead = leads.find(function (l) { return l.id === id })
  if (lead) {
    lead.status = novoStatus
    salvarLeads(leads)
    renderizarLeads()
  }
}

function apagarLead(id) {
  var leads = getLeads()
  leads = leads.filter(function (l) { return l.id !== id })
  salvarLeads(leads)
  renderizarLeads()
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Carregamento das páginas
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

async function load(caminho) {
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
  document.getElementById("banner-principal").style.display = "none"
  var itensAdmin    = document.querySelectorAll(".admin")
  var itensVisitante = document.querySelectorAll(".visitante")

  // Sincroniza modo com sessão ao recarregar
  if (sessaoAtiva()) modo = "admin"

  if (modo === "visitante") {
    itensAdmin.forEach(function (item) { item.classList.add("oculto") })
    itensVisitante.forEach(function (item) { item.classList.remove("oculto") })
  } else if (modo === "admin") {
    itensAdmin.forEach(function (item) { item.classList.remove("oculto") })
    itensVisitante.forEach(function (item) { item.classList.add("oculto") })
  }

  if (pagina === "home") {
    await load("paginas/home.html")
    document.getElementById("banner-principal").style.display = "flex"
    renderizarHome()
  } else if (pagina === "leads") {
    await load("paginas/leads.html")
    renderizarLeads()
  } else if (pagina === "produtos") {
    await load("paginas/produtos.html")
    renderizarProdutos()
    configurarDropImage()
  }
  MenuItens.style.maxHeight = "0px"
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização dos produtos (catálogo)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function cardProduto(p) {
  return `<div class="col-4" onclick="abrirPopup(${p.id})">
            <img src="${p.img}" alt="${p.alt}">
            <h4>${p.nome}</h4>
            <h5>R$ ${p.preco.toFixed(2)}</h5>
          </div>`
}

function renderizarHome() {
  var destaques = produtos.filter(function (p) { return p.categoria === "destaque" })
  var ofertas   = produtos.filter(function (p) { return p.categoria === "oferta"   })
  var todos     = produtos

  document.getElementById("destaque-grid").innerHTML  = destaques.length ? destaques.map(cardProduto).join("") : '<p class="sem-itens">Nenhum produto em destaque.</p>'
  document.getElementById("ofertas-grid").innerHTML   = ofertas.length   ? ofertas.map(cardProduto).join("")   : '<p class="sem-itens">Nenhuma oferta no momento.</p>'
  document.getElementById("catalogo-grid").innerHTML  = todos.length     ? todos.map(cardProduto).join("")     : '<p class="sem-itens">Nenhum produto cadastrado.</p>'
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Pop-up de demonstração de interesse
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var produtoAtual = null

function abrirPopup(id) {
  var produto = produtos.find(function (p) { return p.id === id })
  if (!produto) return

  produtoAtual = produto
  document.getElementById("popup-produto-nome").textContent  = produto.nome
  document.getElementById("popup-produto-preco").textContent = "R$ " + produto.preco.toFixed(2)
  document.getElementById("lead-nome").value       = ""
  document.getElementById("lead-telefone").value   = ""
  document.getElementById("lead-quantidade").value = "1"
  document.getElementById("lead-cidade").value     = ""
  document.getElementById("lead-endereco").value   = ""
  document.getElementById("lead-obs").value        = ""

  document.getElementById("popup-overlay").classList.add("ativo")
}

function fecharPopupBtn() {
  document.getElementById("popup-overlay").classList.remove("ativo")
  produtoAtual = null
}

function fecharPopup(e) {
  if (e.target === document.getElementById("popup-overlay")) fecharPopupBtn()
}

function confirmarInteresse() {
  var nome       = document.getElementById("lead-nome").value.trim()
  var telefone   = document.getElementById("lead-telefone").value.trim()
  var quantidade = parseInt(document.getElementById("lead-quantidade").value) || 1
  var cidade     = document.getElementById("lead-cidade").value
  var endereco   = document.getElementById("lead-endereco").value.trim()
  var obs        = document.getElementById("lead-obs").value.trim()

  if (!nome || !telefone || !cidade) {
    alert("Preencha nome, WhatsApp e cidade!")
    return
  }
  if (!produtoAtual) return

  var leads = getLeads()
  var novoId = leads.length > 0 ? Math.max.apply(null, leads.map(function (l) { return l.id })) + 1 : 1
  var hoje   = new Date()
  var data   = hoje.toLocaleDateString("pt-BR")

  var novoLead = {
    id:        novoId,
    produto:   produtoAtual.nome,
    preco:     produtoAtual.preco,
    nome:      nome,
    telefone:  telefone,
    quantidade: quantidade,
    cidade:    cidade,
    endereco:  endereco,
    obs:       obs,
    data:      data,
    status:    "pendente",
  }

  leads.push(novoLead)
  salvarLeads(leads)
  fecharPopupBtn()
  alert("✔ Interesse registrado com sucesso! Entraremos em contato em breve.")
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização de leads (página admin)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var STATUS_CONFIG = {
  pendente:  { label: "Pendente",          cor: "#f0a500" },
  contato:   { label: "Em contato",        cor: "#3b89ff" },
  efetivado: { label: "Venda efetivada",   cor: "#27ae60" },
  cancelado: { label: "Cancelado",         cor: "#e74c3c" },
}

function badgeStatus(status) {
  var cfg = STATUS_CONFIG[status] || { label: status, cor: "#aaa" }
  return `<span class="badge-status" style="background:${cfg.cor}">${cfg.label}</span>`
}

function opcoesStatus(leadId, statusAtual) {
  var opts = Object.keys(STATUS_CONFIG).map(function (s) {
    var sel = s === statusAtual ? "selected" : ""
    return `<option value="${s}" ${sel}>${STATUS_CONFIG[s].label}</option>`
  }).join("")
  return `<select class="select-status" onchange="atualizarStatusLead(${leadId}, this.value)">${opts}</select>`
}

function renderizarLeads() {
  var leads = getLeads()
  var lista  = document.getElementById("lista-leads")

  if (leads.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhuma indicação de interesse registrada ainda.</p>'
    return
  }

  lista.innerHTML = leads.map(function (p) {
    return (
      '<div class="card-lead">' +
        '<div class="card-lead-info">' +
          '<div class="card-lead-header">' +
            '<h4>' + p.quantidade + ' un. - ' + p.produto + ' — R$ ' + (p.preco * p.quantidade).toFixed(2) + '</h4>' +
            badgeStatus(p.status) +
          '</div>' +
          '<p><strong>Cliente:</strong> ' + p.nome + ' | <strong>Tel:</strong> ' + p.telefone + '</p>' +
          (p.cidade   ? '<p><strong>Cidade:</strong> '   + p.cidade   + '</p>' : '') +
          (p.endereco ? '<p><strong>Endereço:</strong> ' + p.endereco + '</p>' : '') +
          (p.obs      ? '<p><strong>Obs:</strong> '      + p.obs      + '</p>' : '') +
          '<p style="font-size:12px;color:#aaa;margin-top:6px">Registrado em ' + p.data + '</p>' +
        '</div>' +
        '<div class="card-lead-acoes">' +
          '<div class="card-lead-status">' +
            '<label style="font-size:12px;color:#777;margin-bottom:4px;display:block">Status do pedido</label>' +
            opcoesStatus(p.id, p.status) +
          '</div>' +
          '<button class="btn-apagar" onclick="apagarLead(' + p.id + ')">&#x1F5D1; Apagar</button>' +
        '</div>' +
      '</div>'
    )
  }).join("")
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização dos produtos (painel admin)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function renderizarProdutos() {
  var lista = document.getElementById("produtos-lista-produtos")

  if (produtos.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhum produto cadastrado.</p>'
    return
  }

  var labelCat = { destaque: "Destaque", oferta: "Oferta", catalogo: "Catálogo" }

  lista.innerHTML = produtos.map(function (p) {
    return (
      '<div class="card-produtos">' +
        '<div class="card-produtos-info">' +
          '<strong>' + p.nome + '</strong>' +
          '<span class="badge">' + (labelCat[p.categoria] || p.categoria) + '</span>' +
          '<br>R$ ' + p.preco.toFixed(2) +
        '</div>' +
        '<div class="card-produtos-acoes">' +
          '<button class="btn-editar" onclick="editarProduto(' + p.id + ')">&#9998; Editar</button>' +
          '<button class="btn-apagar" onclick="apagarProduto(' + p.id + ')">&#x1F5D1; Apagar</button>' +
        '</div>' +
      '</div>'
    )
  }).join("")
}

function salvarProduto() {
  var id        = document.getElementById("produtos-id").value
  var nome      = document.getElementById("produtos-nome").value
  var preco     = parseFloat(document.getElementById("produtos-preco").value)
  var alt       = document.getElementById("produtos-alt").value
  var categoria = document.getElementById("produtos-cat").value
  var img       = document.getElementById("preview-img").src

  if (!nome || !preco) {
    alert("Preencha nome e preço!")
    return
  }

  if (id) {
    var produto = produtos.find(function (p) { return p.id == id })
    if (produto) {
      produto.nome      = nome
      produto.preco     = preco
      produto.alt       = alt
      produto.categoria = categoria
      produto.img       = img
    }
  } else {
    produtos.push({ id: Date.now(), nome: nome, preco: preco, img: img, alt: alt, categoria: categoria })
  }

  limparFormProduto()
  renderizarProdutos()
}

function editarProduto(id) {
  var produto = produtos.find(function (p) { return p.id === id })
  if (!produto) return

  document.getElementById("produtos-id").value    = produto.id
  document.getElementById("produtos-nome").value  = produto.nome
  document.getElementById("produtos-preco").value = produto.preco
  document.getElementById("produtos-alt").value   = produto.alt
  document.getElementById("produtos-cat").value   = produto.categoria

  var texto   = document.getElementById("drop-text-img")
  texto.textContent = "Imagem atual do produto (clique para trocar)"
  var preview = document.getElementById("preview-img")
  preview.src = produto.img
  preview.style.display = "block"
}

function limparFormProduto() {
  document.getElementById("produtos-id").value    = ""
  document.getElementById("produtos-nome").value  = ""
  document.getElementById("produtos-preco").value = ""
  document.getElementById("produtos-alt").value   = ""
  document.getElementById("produtos-cat").value   = "destaque"

  document.getElementById("drop-text-img").textContent = "Arraste a imagem aqui ou clique para selecionar"
  var preview = document.getElementById("preview-img")
  preview.src = ""
  preview.style.display = "none"
}

function apagarProduto(id) {
  produtos = produtos.filter(function (p) { return p.id !== id })
  renderizarProdutos()
}

function configurarDropImage() {
  var dropArea  = document.getElementById("drop-area")
  var inputFile = document.getElementById("produtos-file")
  var preview   = document.getElementById("preview-img")
  var texto     = document.getElementById("drop-text-img")

  if (!dropArea) return

  dropArea.addEventListener("click", function () { inputFile.click() })

  inputFile.addEventListener("change", function () {
    if (this.files.length > 0) mostrarPreview(this.files[0])
  })

  dropArea.addEventListener("dragover",  function (e) { e.preventDefault(); dropArea.classList.add("drag-over") })
  dropArea.addEventListener("dragleave", function ()  { dropArea.classList.remove("drag-over") })
  dropArea.addEventListener("drop", function (e) {
    e.preventDefault()
    dropArea.classList.remove("drag-over")
    var file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      inputFile.files = e.dataTransfer.files
      mostrarPreview(file)
    }
  })

  function mostrarPreview(file) {
    var reader = new FileReader()
    reader.onload = function (e) {
      preview.src = e.target.result
      preview.style.display = "block"
      texto.textContent = "Imagem carregada! (Clique para trocar)"
    }
    reader.readAsDataURL(file)
  }
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Inicialização
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var modo = sessaoAtiva() ? "admin" : "visitante"
mostrarPagina("home")
