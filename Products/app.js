//Express framework allows to set up middleware to respond http request.
const express = require('express');
//intializing the express app.
const app = express();
//body-parser is a package used to handel json request.
var bodyParser = require('body-parser');
// tell the app we want to use body-parser json object.
app.use(bodyParser.json());
// {extende: true} means we can parse a nested json object , if{extends : false} then we can parse a string or arrays.
app.use(bodyParser.urlencoded({extended : true}));
const mongoose = require('mongoose');

app.use((req, res, next)=>{
    console.log("Req ", req.path);
    next();
});

var authController = require('./Authentication/Authcontroller');
app.use(authController)

var routers = require('./route/router');
app.use(routers);

var route = require('./route/nodemailer');
app.use(route);

//This create a database and connect to mongodb server runnig on port : 27017.
mongoose.connect("mongodb://localhost:27017/Product", {useCreateIndex : true, useNewUrlParser : true}, function(err,db){
    console.log('db connected');
});
var models = require('./models/model')
// we will make server configuration on the specified port.
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server connecting on the port ${port}`);
});

module.exports = app;