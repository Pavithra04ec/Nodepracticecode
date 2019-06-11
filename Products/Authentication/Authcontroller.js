var express = require('express');
//Express framework allows to set up middleware to respond http request.
//intializing the express router.
var router = express();
// body-parser is a middleware function for handling json,raw text, url encoded form data.
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const path = require('path');
var joi = require('joi');
var db = require('../models/model');
var Schema = require('../models/joi');
var config = require('./config');
//jwt is a type of token based authentication. For every single request from the client to server can be accessed through jwt token
var jwt = require('jsonwebtoken');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
var bcrypt = require('bcryptjs');
//var dateFn = Date.now();

router.get('/', (req, res) => {
    // get the html file in the root directory.
    res.sendFile(path.join(__dirname + '/register.html'));
});

router.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/api/register', (req, res) => {
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
            db.products.create(data, (err, productDt) => {
                if (!productDt) return res.status(404).send("there was a problem in registering product details");
                res.status(200).send({ auth: true, productDt });
                //res.json('Registered successfully');
                //res.redirect('/');
            })
        }
    })
});
router.post('/login', (req, res) => {
    db.products.findOne({ Email: req.body.Email }, function (err, user) {
        if (!user) return res.status(404).send('No user found.');
        //compareSync is used to compare data and encrypted to be compared
        var passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        //jwt.sign will generate a JWT token and assign it to a user object.
        var token = jwt.sign({ Email: req.body.Email, id: user._id }, config.secret, {
            expiresIn: '24h'
        });
        //console.log(token); 
        res.status(200).send({ auth: true, token: token, user });
        //res.redirect('/api');
    })
});
module.exports = router;