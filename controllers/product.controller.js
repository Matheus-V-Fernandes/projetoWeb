import model from "../models/product.model.js"
import Lead from "../models/lead.model.js"
import mediaUploader from "../media/media.uploader.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Obtenção de todos os produtos
function findAll(request, response) {
    model.findAll()
        .then(function (results) {
            results.forEach(function (result) {
                result.dataValues.image = mediaUploader.getFileUrl(result.dataValues.image)
            })
            response.json(results).status(200)
        })
        .catch(function (err) {
            response.status(500).json(err)
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Obtençãp de um produto específico
function findById(request, response) {
    model.findByPk(request.params.id)
        .then(function (res) {
            res.dataValues.image = mediaUploader.getFileUrl(res.dataValues.image)
            response.json(res).status(200)
        })
        .catch(function (err) {
            response.status(500).json(err)
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Criação (inserção) de um novo produto
function create(request, response) {
    console.log("body:", request.body)
    console.log("file:", request.file)
    mediaUploader.saveFile(request.file)
        .then(function (fileName) {
            model.create({
                name: request.body.name,
                price: parseFloat(request.body.price),
                image: fileName,
                imageAlt: request.body.imageAlt,
                category: request.body.category,
            })
            .then(function (res) {
                res.dataValues.image = mediaUploader.getFileUrl(fileName)
                response.status(201).json(res)
            })
            .catch(function (err) {
                response.status(500).json(err)
            })
        })
        .catch(function (err) {
            response.status(500).json(err)
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Deleção (remoção) de um produto (o qual não deve possuir leads)
function deleteByPk(request, response) {
    Lead.count({ where: { ProductId: request.params.id } })
        .then(function (count) {
            if (count > 0) {
                return response.status(400).json({ 
                    message: `Este produto tem ${count} lead(s) vinculado(s) e não pode ser apagado.` 
                })
            }
            model.destroy({ where: { id: request.params.id } })
                .then(function () { response.status(200).send() })
                .catch(function (err) { response.status(500).json(err) })
        })
        .catch(function (err) { response.status(500).json(err) })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Atualização de um produto existente
function update(request, response) {
    const fields = {
        name: request.body.name,
        price: parseFloat(request.body.price),
        imageAlt: request.body.imageAlt,
        category: request.body.category,
    }
    if (request.file) {
        mediaUploader.saveFile(request.file)
            .then(function (fileName) {
                fields.image = fileName
                model.update(fields, { where: { id: request.params.id } })
                    .then(function () { response.status(200).send() })
                    .catch(function (err) { response.status(500).json(err) })
            })
    } else {
        model.update(fields, { where: { id: request.params.id } })
            .then(function () { response.status(200).send() })
            .catch(function (err) { response.status(500).json(err) })
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default { findAll, findById, create, deleteByPk, update }