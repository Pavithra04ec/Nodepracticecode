var http = require('http');
var Primus = require('primus');
var express = require('express');
var app = express();
var server = http.createServer(app);
var options = {
    transformer : 'engine.io'
};
var primus = Primus(server, options);
primus.on('connection', function (spark){
    spark.write('hello world');
})
var fs = require('fs');
primus.on('connection', function(spark){
    fs.createReadStream('/package.json').pipe(spark);
})
primus.write({some : 'data'});
server.listen(1000, function (){
    console.log('server connected');
})