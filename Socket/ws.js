var WebSocketServer = require('ws').Server;
//var wss = new WebSocketServer({ port: 40510 });
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('meaasge received', message);
    })
    setInterval(
        () => ws.send(`${new Date()}`),100
    )
});