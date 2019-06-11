const express = require('express');
const app = express();
var mysql = require('mysql');
const router = require('./router')
// body-parser is a middleware function for handling json,raw text, url encoded form data.
var  bodyParser = require('body-parser');
app.use(bodyParser.json());
const routers = require('./authcontroller');

app.use(routers);
app.use(router);
//app.use(con);
app.listen(5000, () =>{
    console.log('server listening on port');
});
module.exports = app;