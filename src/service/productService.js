import { responseError } from "../error/responseError.js";
import { validate } from "../validation/validation.js";
import {prismaClient} from "../config/database.js"
import { addValidation, identifyValidation, updateProductValidation } from "../validation/productValidation.js";

const add = async (req,user) => {
    req = await validate(addValidation,req)

    req.added_by = user.email

    return prismaClient.products.create({
        data : req
    })
}
const update = async (user,req,identify) => {
    identify = await validate(identifyValidation,identify)
    req = await validate(updateProductValidation,req)

    const product = await prismaClient.products.findFirst({
        where : {
            id : identify
        }
    })

    if(!product){
        throw new responseError(404,"product is not found")
    }

    const isRegular = await prismaClient.user.findUnique({
        where : {
            email : product.added_by
        },
        select : {
            role : true,
            email : true
        }
    })

    if(isRegular.role != "regular"){
        if(isRegular.email !== user.email){
            throw new responseError(400,"anda tidak memiliki akses untuk mengupdate produk ini")
        }
    }

    return prismaClient.products.update({
        where : {
            id : product.id
        },
        data : req
    })
}
const deleteProduct = async (identify,user) => {
    identify = await validate(identifyValidation,identify)

    const product = await prismaClient.products.findFirst({
        where : {
            id : identify
        }
    })

    if(!product){
        throw new responseError(404,"product is not found")
    }

    const isRegular = await prismaClient.user.findUnique({
        where : {
            email : product.added_by
        },
        select : {
            role : true,
            email : true
        }
    })

    if(isRegular.role != "regular"){
        if(isRegular.email !== user.email){
            throw new responseError(400,"anda tidak memiliki akses untuk mengupdate produk ini")
        }
    }

    return prismaClient.products.delete({
        where : {
            id : product.id
        }
    })
}

const findAllProduct = async () => {
    const allProduct = await prismaClient.products.findMany({
    })
    if(!allProduct[0]){
        return {
            msg : "product is empty",
            product : [],
        }
    }

    return allProduct
}

export default {
    add,
    findAllProduct,
    update,
    deleteProduct
}