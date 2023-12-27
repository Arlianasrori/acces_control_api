import { prismaClient } from "../config/database.js";
import auth from "jsonwebtoken"
const AuthMiddlewareAdmin = async (req,res,next) => {
    const Header = req.header("Authorization")
    
    const token = Header && Header.split(' ')[1]
 
    if(!Header){
        return res.status(403).json({
            msg : "unauthorize"
        }).end()
    }
 
    const user = await auth.verify(token,process.env.ACCES_KEY,(err,user) => {
        if(err){
           return {
            status : 403,
            msg : err.message
           }
        }
        req.user = user
        return user
    })

    if(user.status == 403){
        return res.status(403).json({
            msg : user.msg
        })
    }
    const Isrole = await prismaClient.user.findUnique({
        where : {
            email : user.email
        },
        select : {
            role : true
        }
    })

    if(Isrole.role !== "admin"){
        return res.status(403).json({
            keterangan : "hak akses anda dibatasi",
            msg : "anda tidak memiliki hak akses untuk melakukan akses tertentu"
        }).end()
    }
    next()
}
export {
    AuthMiddlewareAdmin
}