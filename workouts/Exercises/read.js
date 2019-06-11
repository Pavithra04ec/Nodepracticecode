var fs=require('fs');
fs.readFile('new1.txt',function(err,data){
	if(err) throw err;
	console.log(data);
});