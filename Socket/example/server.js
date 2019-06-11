var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})
// io.connect('connection', function(socket){
//     console.log('new connection established');
// })
io.on('connection', function(socket){
    console.log('new connection established');
})
setInterval (function (){
    var stockprice = Math.floor(Math.random()*1000);
    io.emit('stock price update', stockprice);
},100)
http.listen(8000, function (){
    console.log('sever listening');
})
