/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Responsividade
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

document.addEventListener("DOMContentLoaded", function () {
  var MenuItens = document.getElementById("MenuItens")
  if (MenuItens) {
    MenuItens.style.maxHeight = "0px" // Garante que o menu para celular comece fechado
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////

function menucelular() {
  if (MenuItens.style.maxHeight == "0px") MenuItens.style.maxHeight = "500px"
  else MenuItens.style.maxHeight = "0px"
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Toast Notification (substitui alert() nativo)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function mostrarToast(mensagem, tipo) {
  tipo = tipo || "erro"
  var icones = { sucesso: "✔", erro: "✖", aviso: "⚠" }

  var container = document.getElementById("toast-container")
  if (!container) {
    container = document.createElement("div")
    container.id = "toast-container"
    container.className = "toast-container"
    document.body.appendChild(container)
  }

  var toast = document.createElement("div")
  toast.className = "toast " + tipo
  toast.innerHTML = '<span class="toast-icone">' + (icones[tipo] || "") + '</span><span class="toast-msg">' + mensagem + "</span>"
  container.appendChild(toast)

  // Força o reflow para a transição funcionar, depois mostra
  toast.offsetHeight
  toast.classList.add("visivel")

  // Fica visível por 8 segundos, depois fade out de 0.5s e remove
  setTimeout(function () {
    toast.classList.remove("visivel")
    toast.classList.add("saindo")
  }, 8000)
  setTimeout(function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast)
  }, 8500)
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Autenticação via API (token JWT guardado no sessionStorage)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function getToken() {
  return sessionStorage.getItem("token")
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function iniciarSessao(token) {
  sessionStorage.setItem("token", token)
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function encerrarSessao() {
  sessionStorage.removeItem("token")
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function sessaoAtiva() {
  return !!getToken()
}
/////////////////////////////////////////////////////////////////////////////////////////////////*/
// Login do Administrador //
////////////////////////////

function autenticar() {
  criarModalLogin()
}
//////////////////////////////////////////////////////////////////////////////////////////////////

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
        <label for="auth-email">E-mail</label>
        <input type="email" id="auth-email" placeholder="Digite o e-mail" onkeydown="if(event.key==='Enter') confirmarLogin()">
      </div>
      <div class="popup-campo">
        <label for="auth-senha">Senha</label>
        <input type="password" id="auth-senha" placeholder="Digite a senha" onkeydown="if(event.key==='Enter') confirmarLogin()">
      </div>
      <p id="auth-erro" style="color:#e55;font-size:13px;min-height:18px;margin-top:4px;"></p>
      <button class="btn" onclick="confirmarLogin()">Entrar</button>
    </div>
  `
  document.body.appendChild(modal)
  setTimeout(function () {
    modal.classList.add("ativo")
  }, 10)
  setTimeout(function () {
    var campo = document.getElementById("auth-email")
    if (campo) campo.focus()
  }, 50)
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function confirmarLogin() {
  var email = document.getElementById("auth-email").value.trim()
  var senha = document.getElementById("auth-senha").value
  var erro = document.getElementById("auth-erro")

  if (!email) {
    erro.textContent = "Preencha o e-mail."
    return
  }
  // Valida formato básico de e-mail
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    erro.textContent = "Formato de e-mail inválido."
    return
  }
  if (email.length > 100) {
    erro.textContent = "O e-mail deve ter no máximo 100 caracteres."
    return
  }
  if (!senha) {
    erro.textContent = "Preencha a senha."
    return
  }
  if (senha.length < 4) {
    erro.textContent = "A senha deve ter pelo menos 4 caracteres."
    return
  }
  if (senha.length > 100) {
    erro.textContent = "A senha deve ter no máximo 100 caracteres."
    return
  }

  try {
    const res = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: senha }),
    })

    if (res.ok) {
      const data = await res.json()
      iniciarSessao(data.token)
      modo = "admin"
      removerModal()
      mostrarPagina("home")
    } else {
      erro.textContent = "E-mail ou senha incorretos."
      document.getElementById("auth-senha").value = ""
      document.getElementById("auth-senha").focus()
    }
  } catch (e) {
    erro.textContent = "Erro ao conectar com o servidor."
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function sair() {
  encerrarSessao()
  modo = "visitante"
  mostrarPagina("home")
}
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
// Alteração de senha do Administrador //
/////////////////////////////////////////

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
  setTimeout(function () {
    modal.classList.add("ativo")
  }, 10)
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function confirmarAlterarSenha() {
  var atual = document.getElementById("auth-senha-atual").value
  var nova = document.getElementById("auth-senha-nova").value
  var confirmar = document.getElementById("auth-senha-confirmar").value
  var erro = document.getElementById("auth-erro")
  var ok = document.getElementById("auth-ok")

  erro.textContent = ""
  ok.textContent = ""

  if (!atual) {
    erro.textContent = "Preencha a senha atual."
    return
  }
  if (!nova) {
    erro.textContent = "Preencha a nova senha."
    return
  }
  if (nova.length < 10) {
    erro.textContent = "A nova senha deve ter pelo menos 10 caracteres."
    return
  }
  if (nova.length > 100) {
    erro.textContent = "A nova senha deve ter no máximo 100 caracteres."
    return
  }
  if (!/[A-Za-z]/.test(nova)) {
    erro.textContent = "A nova senha deve conter pelo menos uma letra."
    return
  }
  if (!/[0-9]/.test(nova)) {
    erro.textContent = "A nova senha deve conter pelo menos um número."
    return
  }
  if (nova !== confirmar) {
    erro.textContent = "As senhas não coincidem."
    return
  }

  try {
    const res = await fetch("/auth/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ senhaAtual: atual, novaSenha: nova }),
    })

    if (res.ok) {
      ok.textContent = "✔ Senha alterada com sucesso!"
      setTimeout(removerModal, 1500)
    } else {
      erro.textContent = "Senha atual incorreta."
    }
  } catch (e) {
    erro.textContent = "Erro ao conectar com o servidor."
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function removerModal() {
  var m = document.getElementById("modal-auth")
  if (m) {
    m.classList.remove("ativo")
    setTimeout(function () {
      if (m.parentNode) m.parentNode.removeChild(m)
    }, 300)
  }
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Produtos via API
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var produtos = [] // cache em memória, carregado via API

async function carregarProdutos() {
  try {
    const res = await fetch("/products")
    produtos = await res.json()
  } catch (e) {
    console.error("Erro ao carregar produtos:", e)
    produtos = []
  }
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Leads via API
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

async function atualizarStatusLead(id, novoStatus) {
  try {
    await fetch(`/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status: novoStatus }),
    })
    await renderizarLeads()
  } catch (e) {
    console.error("Erro ao atualizar status:", e)
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function apagarLead(id) {
  try {
    await fetch(`/leads/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await renderizarLeads()
  } catch (e) {
    console.error("Erro ao apagar lead:", e)
  }
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
//////////////////////////////////////////////////////////////////////////////////////////////////

async function mostrarPagina(pagina) {
  document.getElementById("banner-principal").style.display = "none"
  var itensAdmin = document.querySelectorAll(".admin")
  var itensVisitante = document.querySelectorAll(".visitante")

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
    await carregarProdutos() 
    renderizarHome()
  } else if (pagina === "leads") {
    await load("paginas/leads.html")
    await renderizarLeads()
  } else if (pagina === "produtos") {
    await load("paginas/produtos.html")
    await carregarProdutos() 
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
            <img src="${p.image}" alt="${p.imageAlt}">
            <h4>${p.name}</h4>
            <h5>R$ ${p.price.toFixed(2)}</h5>
          </div>`
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function renderizarHome() {
  var destaques = produtos.filter(function (p) { return p.category === "destaque" })
  var ofertas = produtos.filter(function (p) { return p.category === "oferta" })
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
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Pop-up de demonstração de interesse
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var produtoAtual = null

function abrirPopup(id) {
  var produto = produtos.find(function (p) { return p.id === id })
  if (!produto) return

  produtoAtual = produto
  document.getElementById("popup-produto-nome").textContent = produto.name  
  document.getElementById("popup-produto-preco").textContent = "R$ " + produto.price.toFixed(2) 
  document.getElementById("lead-nome").value = ""
  document.getElementById("lead-telefone").value = ""
  document.getElementById("lead-quantidade").value = "1"
  document.getElementById("lead-cidade").value = ""
  document.getElementById("lead-endereco").value = ""
  document.getElementById("lead-obs").value = ""

  document.getElementById("popup-overlay").classList.add("ativo")
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function fecharPopupBtn() {
  document.getElementById("popup-overlay").classList.remove("ativo")
  produtoAtual = null
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function fecharPopup(e) {
  if (e.target === document.getElementById("popup-overlay")) fecharPopupBtn()
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function confirmarInteresse() {
  var nome = document.getElementById("lead-nome").value.trim()
  var telefone = document.getElementById("lead-telefone").value.trim()
  var quantidade = parseInt(document.getElementById("lead-quantidade").value) || 1
  var cidade = document.getElementById("lead-cidade").value
  var endereco = document.getElementById("lead-endereco").value.trim()
  var obs = document.getElementById("lead-obs").value.trim()

  // Validações de entrada
  if (!nome) {
    mostrarToast("Preencha seu nome.", "aviso")
    return
  }
  if (nome.length < 3) {
    mostrarToast("O nome deve ter pelo menos 3 caracteres.", "aviso")
    return
  }
  if (nome.length > 100) {
    mostrarToast("O nome deve ter no máximo 100 caracteres.", "aviso")
    return
  }
  if (!telefone) {
    mostrarToast("Preencha seu WhatsApp.", "aviso")
    return
  }
  // Aceita formatos: (14) 99999-9999, 14 99999-9999, 14999999999, etc.
  var telLimpo = telefone.replace(/\D/g, "")
  if (telLimpo.length < 10 || telLimpo.length > 11) {
    mostrarToast("WhatsApp inválido. Use DDD + número (10 ou 11 dígitos).", "aviso")
    return
  }
  // Formata o telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  var telefoneFormatado
  if (telLimpo.length === 11) {
    telefoneFormatado = "(" + telLimpo.substring(0, 2) + ") " + telLimpo.substring(2, 7) + "-" + telLimpo.substring(7)
  } else {
    telefoneFormatado = "(" + telLimpo.substring(0, 2) + ") " + telLimpo.substring(2, 6) + "-" + telLimpo.substring(6)
  }
  if (!cidade) {
    mostrarToast("Selecione sua cidade.", "aviso")
    return
  }
  if (quantidade < 1) {
    mostrarToast("A quantidade deve ser pelo menos 1.", "aviso")
    return
  }
  if (quantidade > 99) {
    mostrarToast("A quantidade máxima é 99.", "aviso")
    return
  }
  if (endereco && endereco.length > 200) {
    mostrarToast("O endereço deve ter no máximo 200 caracteres.", "aviso")
    return
  }
  if (obs && obs.length > 500) {
    mostrarToast("As observações devem ter no máximo 500 caracteres.", "aviso")
    return
  }
  if (!produtoAtual) return

  try {
    const res = await fetch("/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_cliente: nome,
        telefone: telefoneFormatado,
        quantidade: quantidade,
        cidade: cidade,
        endereco: endereco,
        obs: obs,
        preco: produtoAtual.price,
        ProductId: produtoAtual.id,
      }),
    })

    if (res.ok) {
      // Salva dados antes de fechar (fecharPopupBtn zera produtoAtual)
      var nomeProduto = produtoAtual.name
      var precoProduto = produtoAtual.price

      fecharPopupBtn()
      mostrarToast("Interesse registrado com sucesso! Entraremos em contato em breve.", "sucesso")

      // Abre WhatsApp com resumo do pedido
      var total = (precoProduto * quantidade).toFixed(2).replace(".", ",")
      var texto = "Ola! Tenho interesse no produto:\n" +
        "- " + nomeProduto + "\n" +
        "Preco unitario: R$ " + precoProduto.toFixed(2).replace(".", ",") + "\n" +
        "Quantidade: " + quantidade + "\n" +
        "Total: R$ " + total + "\n" +
        "Cliente: " + nome + "\n" +
        "WhatsApp: " + telefoneFormatado + "\n" +
        "Cidade: " + cidade
      if (endereco) texto += "\nEndereco: " + endereco
      if (obs) texto += "\nObs: " + obs
      texto += "\n\nAguardando contato!"
      window.open("https://wa.me/5514997208570?text=" + encodeURIComponent(texto), "_blank")
    } else {
      mostrarToast("Erro ao registrar interesse. Tente novamente.", "erro")
    }
  } catch (e) {
    mostrarToast("Erro ao conectar com o servidor.", "erro")
  }
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização de leads (página admin)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var STATUS_CONFIG = {
  pendente: { label: "Pendente", cor: "#f0a500" },
  contato: { label: "Em contato", cor: "#3b89ff" },
  efetivado: { label: "Venda efetivada", cor: "#27ae60" },
  cancelado: { label: "Cancelado", cor: "#e74c3c" },
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function badgeStatus(status) {
  var cfg = STATUS_CONFIG[status] || { label: status, cor: "#aaa" }
  return `<span class="badge-status" style="background:${cfg.cor}">${cfg.label}</span>`
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function opcoesStatus(leadId, statusAtual) {
  var opts = Object.keys(STATUS_CONFIG)
    .map(function (s) {
      var sel = s === statusAtual ? "selected" : ""
      return `<option value="${s}" ${sel}>${STATUS_CONFIG[s].label}</option>`
    })
    .join("")
  return `<select class="select-status" onchange="atualizarStatusLead(${leadId}, this.value)">${opts}</select>`
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function renderizarLeads() {
  var lista = document.getElementById("lista-leads")
  var leads = []

  try {
    const res = await fetch("/leads", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    leads = await res.json()
  } catch (e) {
    lista.innerHTML = '<p class="sem-itens">Erro ao carregar leads.</p>'
    return
  }

  if (leads.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhuma indicação de interesse registrada ainda.</p>'
    return
  }

  lista.innerHTML = leads
    .map(function (p) {
      var nomeProduto = p.Product ? p.Product.name : "Produto"
      return (
        '<div class="card-lead">' +
        '<div class="card-lead-info">' +
        '<div class="card-lead-header">' +
        "<h4>" + p.quantidade + " un. - " + nomeProduto + " — R$ " + (p.preco * p.quantidade).toFixed(2) + "</h4>" +
        badgeStatus(p.status) +
        "</div>" +
        "<p><strong>Cliente:</strong> " + p.nome_cliente + " | <strong>Tel:</strong> " + p.telefone + "</p>" +
        (p.cidade ? "<p><strong>Cidade:</strong> " + p.cidade + "</p>" : "") +
        (p.endereco ? "<p><strong>Endereço:</strong> " + p.endereco + "</p>" : "") +
        (p.obs ? "<p><strong>Obs:</strong> " + p.obs + "</p>" : "") +
        '<p style="font-size:12px;color:#aaa;margin-top:6px">Registrado em ' + p.data + "</p>" +
        "</div>" +
        '<div class="card-lead-acoes">' +
        '<div class="card-lead-status">' +
        '<label style="font-size:12px;color:#777;margin-bottom:4px;display:block">Status do pedido</label>' +
        opcoesStatus(p.id, p.status) +
        "</div>" +
        '<button class="btn-apagar" onclick="apagarLead(' + p.id + ')">&#x1F5D1; Apagar</button>' +
        "</div>" +
        "</div>"
      )
    })
    .join("")
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Renderização dos produtos (painel admin)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

async function renderizarProdutos() {
  var lista = document.getElementById("produtos-lista-produtos")

  if (produtos.length === 0) {
    lista.innerHTML = '<p class="sem-itens">Nenhum produto cadastrado.</p>'
    return
  }

  var labelCat = { destaque: "Destaque", oferta: "Oferta", catalogo: "Catálogo" }

  lista.innerHTML = produtos
    .map(function (p) {
      return (
        '<div class="card-produtos">' +
        '<div class="card-produtos-info">' +
        "<strong>" + p.name + "</strong>" +                   
        '<span class="badge">' + (labelCat[p.category] || p.category) + "</span>" +  
        "<br>R$ " + p.price.toFixed(2) +                            
        "</div>" +
        '<div class="card-produtos-acoes">' +
        '<button class="btn-editar" onclick="editarProduto(' + p.id + ')">&#9998; Editar</button>' +
        '<button class="btn-apagar" onclick="apagarProduto(' + p.id + ')">&#x1F5D1; Apagar</button>' +
        "</div>" +
        "</div>"
      )
    })
    .join("")
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function salvarProduto() {
  var id = document.getElementById("produtos-id").value
  var nome = document.getElementById("produtos-nome").value.trim()
  var preco = parseFloat(document.getElementById("produtos-preco").value)
  var alt = document.getElementById("produtos-alt").value.trim()
  var categoria = document.getElementById("produtos-cat").value
  var inputFile = document.getElementById("produtos-file")

  // Validações de entrada
  if (!nome) {
    mostrarToast("Preencha o nome do produto.", "aviso")
    return
  }
  if (nome.length < 2) {
    mostrarToast("O nome do produto deve ter pelo menos 2 caracteres.", "aviso")
    return
  }
  if (nome.length > 100) {
    mostrarToast("O nome do produto deve ter no máximo 100 caracteres.", "aviso")
    return
  }
  if (isNaN(preco) || preco <= 0) {
    mostrarToast("Informe um preço válido (maior que zero).", "aviso")
    return
  }
  if (preco > 99999.99) {
    mostrarToast("O preço máximo é R$ 99.999,99.", "aviso")
    return
  }
  if (alt && alt.length > 200) {
    mostrarToast("A descrição da imagem deve ter no máximo 200 caracteres.", "aviso")
    return
  }
  if (!id && inputFile.files.length === 0) {
    mostrarToast("Selecione uma imagem para o produto.", "aviso")
    return
  }

  // Monta o FormData com o telefone já limpo (caso seja um lead — não se aplica aqui, mas por segurança)
  var formData = new FormData()
  formData.append("name", nome)
  formData.append("price", preco)
  formData.append("imageAlt", alt)
  formData.append("category", categoria)
  if (inputFile.files.length > 0) {
    formData.append("image", inputFile.files[0])
  }

  var method = id ? "PUT" : "POST"
  var url = id ? `/products/${id}` : "/products"

  try {
    const res = await fetch(url, {
      method: method,
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    })

    if (res.ok) {
      await carregarProdutos()
      limparFormProduto()
      renderizarProdutos()
      mostrarToast("Produto salvo com sucesso!", "sucesso")
    } else {
      mostrarToast("Erro ao salvar produto.", "erro")
    }
  } catch (e) {
    mostrarToast("Erro ao conectar com o servidor.", "erro")
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function editarProduto(id) {
  var produto = produtos.find(function (p) { return p.id === id })
  if (!produto) return

  document.getElementById("produtos-id").value = produto.id
  document.getElementById("produtos-nome").value = produto.name        
  document.getElementById("produtos-preco").value = produto.price     
  document.getElementById("produtos-alt").value = produto.imageAlt     
  document.getElementById("produtos-cat").value = produto.category     

  var texto = document.getElementById("drop-text-img")
  texto.textContent = "Imagem atual do produto (clique para trocar)"
  var preview = document.getElementById("preview-img")
  preview.src = produto.image  
  preview.style.display = "block"
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function limparFormProduto() {
  document.getElementById("produtos-id").value = ""
  document.getElementById("produtos-nome").value = ""
  document.getElementById("produtos-preco").value = ""
  document.getElementById("produtos-alt").value = ""
  document.getElementById("produtos-cat").value = "destaque"

  document.getElementById("drop-text-img").textContent = "Arraste a imagem aqui ou clique para selecionar"
  var preview = document.getElementById("preview-img")
  preview.src = ""
  preview.style.display = "none"
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function apagarProduto(id) {
    try {
        const res = await fetch(`/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        if (res.ok) {
            await carregarProdutos()
            renderizarProdutos()
        } else {
            try {
                const data = await res.json()
                mostrarToast(data.message || "Erro ao apagar produto.", "erro")
            } catch {
                mostrarToast("Este produto tem leads vinculados e não pode ser apagado.", "erro")
            }
        }
    } catch (e) {
        console.error("Erro ao apagar produto:", e)
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function configurarDropImage() {
  var dropArea = document.getElementById("drop-area")
  var inputFile = document.getElementById("produtos-file")
  var preview = document.getElementById("preview-img")
  var texto = document.getElementById("drop-text-img")

  if (!dropArea) return

  dropArea.addEventListener("click", function () { inputFile.click() })

  inputFile.addEventListener("change", function () {
    if (this.files.length > 0) mostrarPreview(this.files[0])
  })

  dropArea.addEventListener("dragover", function (e) {
    e.preventDefault()
    dropArea.classList.add("drag-over")
  })
  dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("drag-over")
  })
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
      var imgTeste = new Image()
      imgTeste.src = e.target.result
      imgTeste.onload = function () {
        var larguraMaxima = 800
        var alturaMaxima = 800
        if (imgTeste.width > larguraMaxima || imgTeste.height > alturaMaxima) {
          mostrarToast(`Imagem recusada! O limite é ${larguraMaxima}x${alturaMaxima} pixels. A sua tem ${imgTeste.width}x${imgTeste.height}.`, "aviso")
          inputFile.value = ""
          preview.src = ""
          preview.style.display = "none"
          texto.textContent = "Arraste a imagem aqui ou clique para selecionar"
        } else {
          preview.src = e.target.result
          preview.style.display = "block"
          texto.textContent = "Imagem carregada! (Clique para trocar)"
        }
      }
    }
    reader.readAsDataURL(file)
  }
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Conexão com o Whatsapp (botão)
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function abrirWhatsapp() {
    window.open("https://wa.me/5514997208570", "_blank")
}
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
// Inicialização
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

var modo = sessaoAtiva() ? "admin" : "visitante"
mostrarPagina("home")
