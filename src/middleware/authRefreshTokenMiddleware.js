import { prismaClient } from "../config/database.js"
import auth from 'jsonwebtoken'
const refreshTokenMiddleware = async (req,res,next) => {
    const Header = req.get("Authorization")
    const token = Header && Header.split(' ')[1]

    if(token == null || token == undefined){
        return res.status(403).json({
            msg : "unauthorize"
        }).end()
    }
    const expires = auth.verify(token,process.env.REFRESH_KEY,(err,decode) => {
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


    req.refresh_token = token
    next()
}

export {
    refreshTokenMiddleware
}