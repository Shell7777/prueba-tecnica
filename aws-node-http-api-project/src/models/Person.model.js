const Joi = require('joi');

const validatePersonResponse = (data) => {
    const PersonReseponseschema = Joi.object({
        idreferencia: Joi.number().required(),
        nombre: Joi.string().required(),
    });

    return PersonReseponseschema.validate(data);
};


module.exports = { 
    validatePersonResponse ,
};