const eventEmitter = require('events');
const myEmitter = new eventEmitter();
myEmitter.on('event',  (a,b) =>{
    console.log(a,b, this);
});
myEmitter.emit('event', 'a', 'b');
let m = 0;
myEmitter.on('events', () =>{
    console.log(++m);
});
myEmitter.emit('events');//prints 1
myEmitter.emit('events');//prints 2
myEmitter.emit('events');// prints 3
myEmitter.emit('events');//prints 4
myEmitter.once('event1', () => {
    console.log(++m)
});
myEmitter.emit('event1');//prints 5
myEmitter.emit('event1');//ignored because of using once