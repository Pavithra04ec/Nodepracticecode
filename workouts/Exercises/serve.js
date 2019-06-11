var http=require('http');
var url=require('url');
var fs=require('fs');
http.createServer(function(req,res){
	//res.writeHead(200,{'Content-Type':'text/html'});
	var p=url.parse(req.url,true);
	var filename='.'+p.pathname;
	fs.readFile(filename,function(err,data){
		if(err){ 
			res.writeHead(404,{'Content-Type':'text/html'});
			return res.end('404 error');
		}
		
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(5000);
console.log('running');


	