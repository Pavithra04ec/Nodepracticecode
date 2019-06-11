const joi = require('joi');
const ProductValidation = joi.object().keys({
    productId: joi.number().integer().min(1).max(100).required(),
    productName: joi.string().min(3).max(50).required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().min(4).required(),
    productPrice: joi.number().integer().required(),
    color: joi.string().required(),
    ReleasedDate: joi.date().required(),
    Warranty: joi.string().min(4).max(50).required(),
    productStatus: joi.string().min(10).max(100).required()
});
const productIdSchema = joi.object().keys({
    productName: joi.string().min(3).max(50).required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().min(4).required(),
    productPrice: joi.number().integer().required(),
    color: joi.string().required(),
    ReleasedDate: joi.date().required(),
    Warranty: joi.string().min(4).max(50).required(),
    productStatus: joi.string().min(10).max(100).required()
});
const productNameSchema = joi.object().keys({
    productId: joi.number().integer().min(1).max(100).required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Email: joi.string().email().lowercase().required(),
    Password: joi.string().min(4).required(),
    productPrice: joi.number().integer().required(),
    color: joi.string().required(),
    ReleasedDate: joi.date().required(),
    Warranty: joi.string().min(4).max(50).required(),
    productStatus: joi.string().min(10).max(100).required()
})
module.exports = {ProductValidation, productIdSchema, productNameSchema};