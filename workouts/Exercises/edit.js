const emitter = require('events').EventEmitter;

function  Loopprocessor(num){
    var a = new emitter();
    
        for (var i=1;i<=num;i++){
            setTimeout( function() {
                a.emit("message sent",i);
            
            },1000)
        }
    return a;
}
    var loop= Loopprocessor(10);
        
        loop.on('message sent',function(data){
            console.log("message sent"+ data);
        });