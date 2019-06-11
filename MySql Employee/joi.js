var joi = require('joi');
// module.exports = joi.array().items(joi.object().keys({
//     EmpId: joi.number().integer().required(),
//     EmployeeName: joi.string().min(3).max(18).required(),
//     Role: joi.string().min(3).max(40).required(),
//     PreOrganization: joi.string().min(3).max(50).required(),
// }).min(1).required());
module.exports = joi.object().keys({
    EmpId: joi.number().integer().required(),
    EmpName: joi.string().min(3).max(18).required(),
    Role: joi.string().min(3).max(40).required(),
    ManagerId:joi.number().integer().required(),
    Email:joi.string().min(3).max(50).required(),
    Password:joi.string().min(3).max(50).required()
});