import Joi from "joi"

export const validateRegistrationBody = (body)=> {
    const schema = Joi.object({
        
        email :Joi.string().email().required().messages({
            "string.email" :"email must be in a valid format"
        }),
        password : Joi.string().min(6).required().messages({
            "any.required" : "The password field is required",
            "string.min"  : "Password field requires at least 6 characters."
        }),

        confirm : Joi.string().min(6).required().messages({
            "any.required" : "The confirm field is required",
            "string.min"  : "Confirm field requires at least 6 characters."
        })
    })

    return schema.validate(body , {abortEarly : false})
}

export const validateLoginBody = (body)=> {
    const schema = Joi.object({
        email :Joi.string().email().required().messages({
            "string.email" :"email must be in a valid format"
        }),
        password : Joi.string().min(6).required().messages({
            "any.required" : "The password field is required",
            "string.min"  : "Password field requires at least 6 characters."
        })
    })

    return schema.validate(body , {abortEarly : false})
}