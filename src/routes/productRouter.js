import express from 'express'
import productController from '../controller/productController.js'
import { accesTokenMiddleware } from '../middleware/authAccesTokenMiddleware.js'
import { AuthMiddlewareAdmin } from '../middleware/authMiddlewareAdmin.js'

export const productRouter = express.Router()

productRouter.get("/product",accesTokenMiddleware,productController.findAll)
productRouter.post("/product/add",AuthMiddlewareAdmin,productController.add)
productRouter.put("/product/:identify",AuthMiddlewareAdmin,productController.update)
productRouter.delete("/product/:identify",AuthMiddlewareAdmin,productController.deleteProduct)