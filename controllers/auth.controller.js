import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/admin.model.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

const secret = process.env["AUTH_SECRET"]
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Obtenção do token de sessão (login do administrador)
function getToken(uid, uemail) {
    const meuToken = jwt.sign(
        {
            sub: uid,
            email: uemail,
        },
        secret,
        {
            expiresIn: "30d",
        },
    )
    return meuToken
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Autenticação do administrador
async function login(request, response) {
    // valores vazios
    if (!request.body.password || !request.body.email) {
        return response.status(400).send("Informe e-mail e senha.")
    }

    // inválido
    const user = await User.findOne({
        where: { email: request.body.email },
    })
    if (!user) {
        return response.status(400).send("E-mail ou senha incorretos.")
    }

    // compara senha
    const isEqual = bcrypt.compareSync(request.body.password, user.password)
    // inválida
    if (!isEqual) {
        return response.status(401).send("E-mail ou senha incorretos.")
    }
    // usuário e senha válidos, cria token
    const meuToken = getToken(user.id, user.email)
    response
        .status(200)
        .json({ id: user.id, email: user.email, token: meuToken })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Validação do token da sessão
async function validateToken(request, response, next) {
    let token = request.headers.authorization
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length)
            const decodedToken = jwt.verify(token, secret)
            next()
        } else {
            return response.status(401).send({ message: "Unauthorized" })
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" })
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Mudança de senha (no caso, apenas para o admin)
async function changePassword(request, response) {
    const token = request.headers.authorization.substring(7)
    const decoded = jwt.verify(token, process.env["AUTH_SECRET"])
    
    const user = await User.findOne({ where: { email: decoded.email } })
    if (!user) {
        return response.status(400).send("Erro: Email Admin.")
    }

    const isEqual = bcrypt.compareSync(request.body.senhaAtual, user.password)
    if (!isEqual) {
        return response.status(401).send("Senha atual incorreta.")
    }

    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(request.body.novaSenha, salt)

    User.update({ password: hashedPassword }, { where: { email: decoded.email } })
        .then(function () {
            return response.status(200).send("Senha alterada com sucesso!")
        })
        .catch(function (err) {
            return response.status(500).json(err)
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default { login, validateToken, changePassword }
