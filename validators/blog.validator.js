const Joi = require("joi")

const blogValidator = joi.object({
    title: Joi.string()
        .min(3)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .trim()
        .required(),
    
})