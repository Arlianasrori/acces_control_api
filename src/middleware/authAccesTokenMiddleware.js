import { prismaClient } from "../config/database.js"
import auth from 'jsonwebtoken'
const accesTokenMiddleware = async (req,res,next) => {
    const Header = req.get("Authorization")
    const token = Header && Header.split(' ')[1]
    if(!token){
        return res.status(403).json({
            msg : "unauthorize"
        }).end()
    }
    const expires = auth.verify(token,process.env.ACCES_KEY,(err,decode) => {
        if(err){
           return {status : 401,
                   msg : err.message}
        }
        return decode
    })
   
    if(expires.status == 401){
        return res.status(401).json({
            msg : expires.msg
        })
    }
    const user = await prismaClient.user.findFirst({
        where : {
            token : token
        }
    })

    if(!user){
        return res.status(403).json({
            status : "unauthorize",
            msg : "token is invalid"
        }).end()
    }

    req.Acces_token = token
    next()
}

export {
    accesTokenMiddleware
}