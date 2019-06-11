var joi = require('joi');
module.exports = joi.object().keys({
    CategoryName: joi.string().min(3).max(18).required(),
    Users: joi.array().items(joi.object().keys({
        EmpId: joi.number().integer().required(),
        Name: joi.string().min(3).max(18).required()
    }))
});
