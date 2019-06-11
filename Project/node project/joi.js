var joi = require('joi');
const SchemaValidation = joi.object().keys({
    //id: joi.number().integer().min(1).max(100).required(),
    Name: joi.string().min(3).max(18).required(),
    Gender: joi.string().min(3).max(18).required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().min(4).required(),
    ConfirmPassword: joi.string().min(4).required(),
    Country: joi.string().min(3).max(50).required(),
    Language: joi.string().min(3).max(18).required(),
    DOB: joi.string().required()
});

const mobileschema = joi.object().keys({
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
})
module.exports =  { SchemaValidation, mobileschema} ;