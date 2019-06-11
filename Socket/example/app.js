var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
http.listen(3000, function () {
    console.log('server listening');
});
// io.on('connection', function (socket) {
//     console.log("connection established");
//     socket.on('disconnect', function () {
//         console.log('disconnected');
//     })
// })
// io.emit('some event', {for : 'everyone'});
// io.on('connection', function(socket){
//     socket.broadcast.emit('hi');
// })
function sendTime (){
    io.emit('time', {time : new Date().toJSON()});
}
setInterval(sendTime, 8000);
io.on('connection', function (socket){
    socket.emit('welcome', {message : 'welcome back'});
    socket.on('i am client', console.log);
});

