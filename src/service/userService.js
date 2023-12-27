import { responseError } from "../error/responseError.js";
import { deleteUserValidation, loginValidation, registerValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import {prismaClient} from "../config/database.js"
import auth from 'jsonwebtoken'
import bcrypt from "bcrypt"

const register = async (req) => { 
    const user = await validate(registerValidation,req)

    if(user.role == "admin"){
        if(user.key !== process.env.SECRET_ADMIN){
            throw new responseError(401,"unauthorize")
        }
    }
    const userCount = await prismaClient.user.count({
        where : {
            email : user.email
        }
    })

    if(userCount === 1){
        throw new responseError(400,"account already exist")
    }

    user.password = await bcrypt.hashSync(user.password,10)
  
    return prismaClient.user.create({
        data : {
            email : user.email,
            name : user.name,
            password : user.password,
            role : user.role
        },
        select : {
            name : true,
            email : true,
            role : true
        }
    })
}
const login = async (req) => {
    const userVal = await validate(loginValidation,req)

    const userDb = await prismaClient.user.findUnique({
        where : {
            email : userVal.email
        }
    })
    if(!userDb){
        throw new responseError(400,"email or password wrong")
    }
    
    const isPassword = await bcrypt.compareSync(userVal.password,userDb.password)

    if(!isPassword){
        throw new responseError(400,"email or password wrong")
    }
    
    const Accestoken = await auth.sign(userVal,process.env.ACCES_KEY,{expiresIn : "2d"})
    const Refreshtoken = await auth.sign(userVal,process.env.REFRESH_KEY)

    await prismaClient.user.update({
        where : {
            email : userDb.email
        },
        data :{
            token : Accestoken,
            refresh_token : Refreshtoken
        }
    })

    return {
        Accestoken,
        Refreshtoken
    }

}

const refresh_token = async (token) => {
    token = await validate(deleteUserValidation,token)

    const user = await auth.verify(token,process.env.REFRESH_KEY,(err,decode) => {
        if(err){
            throw new responseError(403,err.message)
        }
        return decode
    })
    const acces_token = auth.sign(user,process.env.ACCES_KEY,{expiresIn : "2d"})

    await prismaClient.user.update({
        where : {
            email : user.email
        },
        data : {
            token : acces_token
        }
    })
    return acces_token
}

const search = async (req) => {
    req = await validate(deleteUserValidation,req)

    const user = await prismaClient.user.findFirst({
        where : {
            OR : [
                {
                    email : req
                },
                {
                    name : req
                }
            ]
        }
    })
   
    if(!user){
        throw new responseError(404,"users is not found")
    }

    return prismaClient.user.findUnique({
        where : {
            email : user.email
        },
        select : {
            name : true,
            email : true,
            role : true,
            products : {
                where : {
                    added_by : user.email
                }
            }    
        }
    })
}

const searchAll = async () => {
    const allUser = await prismaClient.user.findMany({
    })
    if(!allUser[0]){
        return {
            msg : "user is empty",
            product : [],
        }
    }

    return allUser


}

const logout = async (req) => {
    req = await validate(deleteUserValidation,req)
    

    const user = await prismaClient.user.findFirst({
        where : {
            OR : [
                {
                    name : req
                },
                {
                    email : req
                }
            ]
        },
        select : {
            email : true,
            token : true,
            refresh_token : true
        }
    })

    if(!user){
        throw new responseError(404,"user is not found")
    }

    if(user.refresh_token === null && user.token == null){
        throw new responseError(400,"anda sedang dalam kondisi logout")
    }

    return prismaClient.user.update({
        where : {
            email : user.email
        },
        data : {
            token : null,
            refresh_token : null
        },
        select : {
            name : true,
            email : true,
            role : true,
            token : true,
            refresh_token : true
        }
    })
}

const deleteUser = async (req) => {
    req = await validate(deleteUserValidation,req)
    

    const user = await prismaClient.user.findFirst({
        where : {
            OR : [
                {
                    name : req
                },
                {
                    email : req
                }
            ]
        }
    })

    if(!user){
        throw new responseError(404,"user is not found")
    }
    if(user.role !== "regular"){
        throw new responseError(400,`anda tidak memiliki akses untuk medelete user ${user.name}`)
    }
    return prismaClient.user.delete({
        where : {
            email : user.email
        },
    })
}

export default{
    register,
    login,
    logout,
    search,
    searchAll,
    refresh_token,
    deleteUser
}
