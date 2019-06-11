//Express framework allows to set up middleware to respond http request.
var express = require('express');
var app = express();
//var db = require('./db.js');
var router = require('./router.js');
// tell the app we can use router.
app.use('/employee', router); 
module.exports = app;