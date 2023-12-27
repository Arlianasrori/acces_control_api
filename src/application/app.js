import express from "express"
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import { userRouter } from "../routes/userRouter.js"
import { productRouter } from "../routes/productRouter.js"
// import {logger} from "./src/config/logger.js"
import { errorMiddleware } from "../middleware/errorMiddleware.js"

export const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(userRouter)
app.use(productRouter)
app.use(errorMiddleware)