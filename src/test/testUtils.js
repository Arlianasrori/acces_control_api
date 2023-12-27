import {prismaClient} from "../config/database.js"
import bcrypt from 'bcrypt'

const createTestUser = async () => {
    await prismaClient.user.create({
        data : {
            "name" : "habil",
            "email" : "aabiljrRegular@gmail.com",
            "password" : await bcrypt.hashSync('habil',10)
        }
    })
}
const createTestUserAdmin = async () => {
    await prismaClient.user.create({
        data : {
            "name" : "habil",
            "email" :  "aabiljr@gmail.com",
            "password" : await bcrypt.hashSync('habil',10),
            "role" : "admin"
        }
    })
}
const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where : {
            email : "aabiljr@gmail.com"
        }
    })
}
const removeTestUserRegular = async () => {
    await prismaClient.user.deleteMany({
        where : {
            email : "aabiljrRegular@gmail.com",
        }
    })
}
const findUser = async () => {
    return prismaClient.user.findUnique({
        where : {
            email : "aabiljr@gmail.com"
        }
    })
}
const findRegularUser = async () => {
    return prismaClient.user.findUnique({
        where : {
            email : "aabiljrRegular@gmail.com"
        }
    })
}

const removeProductTest = async () => {
    await prismaClient.products.deleteMany({
        where : {
            nama_product : "product test"
        }
    })
}
const removeProductAfterUpdateTest = async () => {
    await prismaClient.products.deleteMany({
        where : {
            nama_product : "test update"
        }
    })
}
const createTestProduct = async () => {
    await prismaClient.products.create({
        data : {
            nama_product : "product test",
            price : 60000,
            deksription : "product test",
            category : "product test",
            added_by : "aabiljr@gmail.com"
        }
    })
}
const findProductTest = async () => {
    return prismaClient.products.findFirst({
        where : {
            added_by : "aabiljr@gmail.com"
        }
    })
}
export default {
    removeTestUser,
    createTestUser,
    createTestUserAdmin,
    findUser,
    removeProductTest,
    findRegularUser,
    removeTestUserRegular,
    createTestProduct,
    findProductTest,
    removeProductAfterUpdateTest
}