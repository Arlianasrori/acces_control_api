import Joi from "joi"

const addValidation = Joi.object({
    nama_product : Joi.string().max(255).required(),
    price : Joi.number().positive().required(),
    deksription : Joi.string().max(255).optional(),
    category : Joi.string().max(100).required(),
})

const identifyValidation = Joi.required()
const updateProductValidation = Joi.object({
    nama_product : Joi.string().max(255).optional(),
    price : Joi.number().positive().optional(),
    deksription : Joi.string().max(255).optional(),
    category : Joi.string().max(100).optional(),
})

export {
    addValidation,
    updateProductValidation,
    identifyValidation
}