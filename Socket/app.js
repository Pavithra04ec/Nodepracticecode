var express = require('express');
var app = express();
var ws = require('./ws');
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
})

app.listen(2000, function (){
    console.log('server is listening');
})