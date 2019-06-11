const emitter = require ('events').EventEmitter;

function loopprocess(num){
	var em =new emitter();
	setTimeout(function(){
		for( var i=1;i<=num;i++)
		{
			em.emit('first_process' ,i);
			console.log('second process'+i);
			em.emit('third_process' , i);
	}},2000);
return em; }
		var lp = loopprocess(3);
		
		lp.on('first_process' ,function(data){
			console.log('first_process'+data);
		});
		
	lp.on('third_process',function(data){
console.log('third_process'+data)});
