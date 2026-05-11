const CustomEventEmitter = require('./events.js');

const emitter = new CustomEventEmitter();

emitter.on('sum', (a, b) => a + b);
emitter.emit('sum', 1, 2);

emitter.on('print', () => console.log('1st listener'));

emitter.on('print', () => console.log('2nd listener'));

const named_print = () => console.log('3rd listener');

emitter.on('print', named_print);

emitter.off('print', named_print);

emitter.emit('print');