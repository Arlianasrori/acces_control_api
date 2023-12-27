
import service from "../service/userService.js"
import NodeCache from "node-cache"
const cache = new NodeCache( { stdTTL: 0 } )


const register = async (req,res,next) => {
    try {
        const user = req.body
        const result = await service.register(user)
        res.status(201).json({
            msg : "register succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req,res,next) => {
    try {
        const user = req.body
        const result = await service.login(user)
        res.status(200).json({
            msg : "login succes",
            token : result
        })
    } catch (error) {
        next(error)
    }
} 
const refresh_token = async (req,res,next) => {
    try {
        const token = req.refresh_token
        const result = await service.refresh_token(token)
        res.status(200).json({
            token : result
        })
    } catch (error) {
        next(error)
    }
} 

const logout = async (req,res,next) => {
    try {
        const user = req.params.identify
        const result = await service.logout(user)
        res.status(200).json({
            msg : "logout succes",
            token : result
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req,res,next) => {
    try {       
        const user = req.params.identify
        const result = await service.search(user)
        res.status(200).json({
            data : result
        })
        
    } catch (error) {
        next(error)
    }
}
const searchAll = async (req,res,next) => {
    try {
        const result = await service.searchAll()
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req,res,next) => {
    try {
        const user = req.params.identify
        const result = await service.deleteUser(user)
        res.status(200).json({
            msg : "ok"
        })
    } catch (error) {
        next(error)
    }
}

export default{
    register,
    login,
    refresh_token,
    search,
    searchAll,
    logout,
    deleteUser
}