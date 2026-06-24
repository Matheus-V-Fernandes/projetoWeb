import express from "express"
import productController from "../controllers/product.controller.js"
import leadController from "../controllers/lead.controller.js"
import authController from "../controllers/auth.controller.js"
import mediaUploader from "../media/media.uploader.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

const router = express.Router()
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Auth (público)
router.post("/signin", authController.login)
router.put("/auth/password", authController.validateToken, authController.changePassword)
//////////////////////////////////////////////////////////////////////////////////////////////////

// Products (leitura pública, escrita protegida)
router.get("/products", productController.findAll)
router.post("/products", 
    function(req, res, next) {
        console.log("chegou no POST /products")
        next()
    }, 
    mediaUploader.uploadFile.single('image'),
    authController.validateToken, 
    productController.create
)
router.put("/products/:id", authController.validateToken, mediaUploader.uploadFile.single('image'), productController.update)
router.delete("/products/:id", authController.validateToken, productController.deleteByPk)
//////////////////////////////////////////////////////////////////////////////////////////////////

// Leads (criação pública, leitura e deleção protegidas)
router.put("/leads/:id", authController.validateToken, leadController.update)
router.post("/leads", leadController.create)
router.get("/leads", authController.validateToken, leadController.findAll)
router.delete("/leads/:id", authController.validateToken, leadController.deleteByPk)
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default router