import model from "../models/lead.model.js"
import Product from "../models/product.model.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Obtenção de todas as leads
function findAll(request, response) {
    model.findAll({ include: Product })
        .then(function (res) {
            response.json(res).status(200)
        })
        .catch(function (err) {
            response.json(err).status(500)
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Obtenção de uma lead específica
function findById(request, response) {
  model
    .findByPk(request.params.id, { include: Product })
    .then(function (res) {
        getImageUrl(res.dataValues.image).then(function(imageUrl) {
          res.dataValues.image = imageUrl 
          response.json(res).status(200)
        })
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Criação (inserção) de uma nova lead
function create(request, response) {
    model.create({
        ProductId: request.body.ProductId,
        nome_cliente: request.body.nome_cliente,
        telefone: request.body.telefone,
        quantidade: parseInt(request.body.quantidade),
        cidade: request.body.cidade,
        endereco: request.body.endereco,
        status: 'pendente',
        data: new Date().toLocaleDateString('pt-BR'),
        obs: request.body.obs,
        preco: parseFloat(request.body.preco),
    })
    .then(function (res) {
        response.status(201).json(res)
    })
    .catch(function (err) {
        response.status(500).json(err)
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Atualização (manipulação do status) de uma lead existente
function update(request, response) {
    model.update(
        {
            status: request.body.status,
        },
        { where: { id: request.params.id } },
    )
    .then(function (res) {
        response.status(200).send()
    })
    .catch(function (e) {
        response.status(500).json(e)
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Deleção (remoção) de uma lead
function deleteByPk(request, response) {
  model
    .destroy({ where: { id: request.params.id } })
    .then(function (res) {
      response.status(200).send()
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default { findAll, findById, create, deleteByPk, update }
