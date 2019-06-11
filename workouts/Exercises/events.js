const event = require ('events');

var em = new event.EventEmitter();

em.on('Firstform',function(data){
	console.log('first subscriber' + data);
});
em.addListener('Secondevent',function(data){
	console.log('scond subscriber'+data);
});

em.emit('Firstform' , 'this is the first form');

em.emit('Secondevent' ,'this is second form');