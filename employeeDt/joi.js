var joi = require('joi');
module.exports = joi.object().keys({
    EmpId: joi.number().integer().min(1).max(100).required(),
    Name: joi.string().min(3).max(18).required(),
    Role: joi.string().min(3).max(40).required(),
    PreOrganization: joi.string().min(3).max(50).required(),
});
