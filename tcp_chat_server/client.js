const net = require('node:net');
require('./dotenv.js');

const port = process.env.PORT;
const host = process.env.HOST;

const client = net.createConnection(port, host, () => {
    console.log('You have connected to the server');
});

client.on('data', (message) => {
    console.log(message.toString());
});

process.stdin.on('data', (message) => {
    client.write(message);
});

client.on('close', () => {
    console.log(`Disconnected from server`);
    process.exit();
});