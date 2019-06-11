var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, function () {
  console.log('server connected');
})
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ws.html');
});
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});