import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import Admin from "./models/admin.model.js"
import Product from "./models/product.model.js"
import Lead from "./models/lead.model.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

dotenv.config()

await Admin.sync()      //({ force: true })
await Product.sync()    //({ force: true })
await Lead.sync()       //({ force: true })
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Cria o admin se ainda não existir
const adminExistente = await Admin.findOne({ where: { email: process.env['ADMIN_EMAIL'] } })
if (!adminExistente) {
    await Admin.create({
        email: process.env['ADMIN_EMAIL'],
        password: bcrypt.hashSync(process.env['ADMIN_PASSWORD'], bcrypt.genSaltSync())
    })
    console.log("Admin criado com sucesso!")
} else {
    console.log("Admin já existe.")
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Confere o banco
console.log("\n--- ADMIN ---")
const admins = await Admin.findAll()
for (let admin of admins) {
    console.log(admin.dataValues)
}
//////////////////////////////////////

console.log("\n--- PRODUCTS ---")
const products = await Product.findAll()
for (let product of products) {
    console.log(product.dataValues)
}
//////////////////////////////////////

console.log("\n--- LEADS ---")
const leads = await Lead.findAll()
for (let lead of leads) {
    console.log(lead.dataValues)
}