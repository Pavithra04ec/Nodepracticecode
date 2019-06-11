const joi = require('joi');

module.exports= joi.object().keys({
    ManagerId:joi.number().required(),
    Name: joi.string().alphanum().min(3).max(20).required(),
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().required(),
    Role:joi.string().required(),
});