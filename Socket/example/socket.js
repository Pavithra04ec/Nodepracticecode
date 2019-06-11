var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/socket.html');
});
http.listen(5000, function () {
    console.log('server listening');
});
function sendTime (){
    io.emit('time', {time : new Date().toJSON()});
}
setInterval(sendTime, 8000);
io.on('connection', function (socket){
    socket.emit('welcome', {message : 'welcome back'});
    socket.on('i am client', console.log);
});