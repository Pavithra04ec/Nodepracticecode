var http=require('http');
var server= http.createServer(function (req, res) {
	if(req.url=='/data'){
		res.writeHead(200,{'Content-Type':'application/json'});
		res.write(JSON.stringfy({message:"hello world"}));
		res.end();
	}
});
server.listen(5050);
console.log('server is running');
