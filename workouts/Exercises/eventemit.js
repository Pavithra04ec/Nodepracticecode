const emitter = require('events').EventEmitter;
const emitEvnt = new emitter();

function Loopprocessor(num) {
    for (let i = 1; i <= num; i++) {
        setTimeout(() => {
            emitEvnt.emit("message sent", i);
        }, 5000);
    }
    Loopprocessor(10);
    emitEvnt.on('message sent', function (data) {
        console.log("message sent" + data);
    });
}

//console.log("all message is sent");