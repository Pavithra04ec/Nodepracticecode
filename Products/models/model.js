const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    MobileNo: { type: Number, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    productPrice: { type: Number, required: true },
    color: { type: String, required: true },
    ReleasedDate: { type: Date, required: true },
    Warranty: { type: String, required: true },
    productStatus: { type: String, required: true }
});
var products = mongoose.model('products', productSchema);
module.exports =  {products};