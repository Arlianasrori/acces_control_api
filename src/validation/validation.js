import { responseError } from "../error/responseError.js"

const validate = async (schema,request) => {
    const result = schema.validate(request,{
        abortEarly : false,
        alloUknown : false
    })

    if(result.error){
        throw new responseError(400,result.error.message)
    }else{
        return result.value
    }
}
export {
    validate
}
