var fs=require('fs');
fs.writeFile('new.txt','hello everybody',function(err){
	if(err)
		console.log(err);
	else
		console.log('writing');
});