var fs=require('fs');
fs.open('new.txt','r',function(err,fd){
	if(err) throw err;
	console.log("reading");
	
});