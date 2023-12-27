import Joi from "joi"

const registerValidation = Joi.object({
    name : Joi.string().max(255).required(),
    email : Joi.string().max(255).required(),
    password : Joi.string().max(255).required(),
    role : Joi.string().max(100).optional(),
    key : Joi.string().optional()
})

const loginValidation = Joi.object({
    email : Joi.string().max(255).required(),
    password : Joi.string().max(255).required(),
})
const deleteUserValidation = Joi.string().required()
export {
    registerValidation,
    loginValidation,
    deleteUserValidation
}