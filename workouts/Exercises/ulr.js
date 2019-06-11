var http=require('http');
var server=http.createServer(function(req,res){
	if(res.url=='/'){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>This is home page</p></body></html>')
		res.end();
	}
	else if(req.url=="/student"){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>this is a student page</p></body></html>');
		res.end();
	}
	else if(req.url=='/admin'){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<html><body><p>this isadmin page</p></body></html>')
		res.end();
	}
	else
		res.end('invalid request');
});
server.listen(5000);
console.log('server is running');
		