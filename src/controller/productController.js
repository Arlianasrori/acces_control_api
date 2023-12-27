
import service from "../service/productService.js";

const add = async (req,res,next) => {
    try {
        const user = req.user
        const product = req.body
        const result = await service.add(product,user)
        res.status(201).json({
            msg : "add product succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}  

const findAll = async (req,res,next) => {
    try {
        const result = await service.findAllProduct()
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
} 
const update = async (req,res,next) => {
    try {
        const user = req.user
        const request = req.body
        const identify = parseInt(req.params.identify)
        const result = await service.update(user,request,identify)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
} 
const deleteProduct = async (req,res,next) => {
    try {
        const identify = parseInt(req.params.identify)
        const user = req.user
        const result = await service.deleteProduct(identify,user)
        res.status(200).json({
            msg : "ok",
            data : result
        })
    } catch (error) {
        next(error)
    }
} 

export default{
    add,
    findAll,
    update,
    deleteProduct
}