//controller, which is the logic of how the app handles the incoming request and outgoing response.

var db = require('../models/model');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
var bcrypt = require('bcryptjs');
var joi = require('joi');
var Schema = require('../models/joi');

const getProducts = (req, res) => {
    // find method is used to select all documents from collection
    db.products.find({}, (err, productDt) => {
        res.send(productDt);
    });
}
const getProductsByStatus = (req, res) => {
    // This find method is used to select the particular productStatus of the collection object
    if(req.query.productId){
        db.products.find({ productId: req.query.productId }, (err, productDt) => {
            if (!productDt.length > 0) {
                return res.status(404).send("The given id is not found.");
            }
            res.json(productDt);
        });
    }
    else if(req.query.productName){
        db.products.find({ productName: req.query.productName }, (err, productDt) => {
            if (!productDt.length > 0) {
                return res.status(404).send("The given name is not found.");
            }
            res.json(productDt);
        });
    }
    else if (req.query.productStatus){
    db.products.find({ productStatus: req.query.productStatus }, (err, productDt) => {
        if (!productDt.length > 0) {
            return res.status(404).send("The given productStatus is not found.");
        }
        res.json(productDt);
    });
}
}
const addProduct = (req, res) => {
    const data = {
        productId: req.body.productId,
        productName: req.body.productName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Password: req.body.Password,
        productPrice: req.body.productPrice,
        color: req.body.color,
        ReleasedDate: req.body.ReleasedDate,
        Warranty: req.body.Warranty,
        productStatus: req.body.productStatus
    };
    //console.log(data);
    joi.validate(data, Schema.ProductValidation, (err, result) => {
        //hashSync is used to encrypt the data.
        data.Password = bcrypt.hashSync(data.Password);
        if (err) {
            return res.status(404).send(err);
        }
        else {
            //Insert a document into a collection using create method.
            db.products.create(data, (err, productDt) => {
                if (!productDt) return res.status(404).send("there was a problem in adding product details");
                res.status(200).send({ auth: true, productDt });
            })
        }
    })
}
const updateProduct = (req, res) => {
    if (req.query.productId) {
        const Details = {
            productName: req.body.productName,
            MobileNo: req.body.MobileNo,
            Email: req.body.Email,
            Password: req.body.Password,
            productPrice: req.body.productPrice,
            color: req.body.color,
            ReleasedDate: req.body.ReleasedDate,
            Warranty: req.body.Warranty,
            productStatus: req.body.productStatus
        };
        joi.validate(Details, Schema.productIdSchema, (err, result) => {
            Details.Password = bcrypt.hashSync(Details.Password);
            if (err) {
                res.status(404).send(err);
            }
            else {
                // To update a document in a collection we use updateOne method
                db.products.updateOne({ productId: req.query.productId }, { $set: Details }, { new: true }, (err, productDt) => {
                    if (productDt.n == 0) {
                        return res.status(404).send("There was a problem updating the product.");
                    } else {
                        res.json(productDt);
                    }
                })
            }
        })
    }
    else if (req.query.productName) {
        const Details = {
            productId: req.body.productId,
            MobileNo: req.body.MobileNo,
            Email: req.body.Email,
            Password: req.body.Password,
            productPrice: req.body.productPrice,
            color: req.body.color,
            ReleasedDate: req.body.ReleasedDate,
            Warranty: req.body.Warranty,
            productStatus: req.body.productStatus
        };
        joi.validate(Details, Schema.productNameSchema, (err, result) => {
            Details.Password = bcrypt.hashSync(Details.Password);
            if (err) {
                res.status(404).send("joi validation failed");
            }
            else {
                db.products.updateOne({ productName: req.query.productName }, { $set: Details }, { new: true }, (err, productDt) => {
                    if (productDt.n == 0) {
                        return res.status(404).send("There was a problem in updating the product.");
                    } else {
                        res.json(productDt);
                    }
                })
            }
        })
    }
}
const deleteProduct = (req, res) => {
    if (req.query.productId) {
        //To delete a document in a collection we use deleteOne method.
        db.products.deleteOne({ productId: req.query.productId }, (err, productDt) => {
            if (productDt.n == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            res.json(productDt);
        });
    }
    else if (req.query.productName) {
        db.products.deleteOne({ productName: req.query.productName }, (err, productDt) => {
            if (productDt.n == 0) {
                return res.status(404).send("The given Name is not found for delete request.");
            }
            res.json(productDt);
        });
    }
}
module.exports = { getProducts, getProductsByStatus, addProduct, updateProduct, deleteProduct };