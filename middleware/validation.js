const Joi = require('@hapi/joi');

//SIGNUP VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string().
            min(6,).
            required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        confirmPassword: Joi.string()
            .required(),
        firstName:Joi.string()
        .required(),
        lastName:Joi.string()
        .required(),
       
    });
    return schema.validate(data)
};

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string(),
        email: Joi.string().
            min(6).
            email(),
        password: Joi.string()
            .min(6)
            .required(),
       
      
    });
    return schema.validate(data)
};

const editProfile = (data )=>{
    const schema = Joi.object({
        username: Joi.string()
            .min(6),
        email: Joi.string().
            min(6).
            email(),
        lastName: Joi.string(),
        firstName: Joi.string(),
       


    });
    return schema.validate(data)
};

const productValidation = (data)=>{
    const schema=Joi.object({
        productName: Joi.string().required().min(3),
        productPrice:Joi.string().required(),
        description:Joi.string().required().min(10),
        categories:Joi.string().required(),
        size:Joi.string(),
        color:Joi.string(),

    })
    return schema.validate(data)
}


module.exports.editProfile = editProfile;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;