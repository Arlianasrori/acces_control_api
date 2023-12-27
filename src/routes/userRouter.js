import express from 'express'
import userController from '../controller/userController.js'
import { AuthMiddlewareAdmin } from '../middleware/authMiddlewareAdmin.js'
import { refreshTokenMiddleware } from '../middleware/authRefreshTokenMiddleware.js'



export const userRouter = express.Router()

userRouter.get("/users/:identify",userController.search)
userRouter.get("/users",AuthMiddlewareAdmin,userController.searchAll)
userRouter.post("/users/register",userController.register)
userRouter.post("/users/login",userController.login)
userRouter.post("/users/refresh",refreshTokenMiddleware,userController.refresh_token)
userRouter.post("/users/logout/:identify",userController.logout)
userRouter.delete("/users/delete/:identify",AuthMiddlewareAdmin,userController.deleteUser)

