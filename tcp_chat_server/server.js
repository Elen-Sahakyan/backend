const net = require('node:net');
require('./dotenv.js')

const users = new Map();

const broadCast = (userName, message) => {
    
    for(const [user, socket] of users) {
        if(user !== userName) {
            socket.write(message);
        }
    }
}

const server = net.createServer((socket) => {

    socket.write(`[${new Date().toLocaleString()}] *** System: Hello! enter a username`);

    socket.on('data', (chunk) => {
        const message = chunk.toString().trim();
        
        if(!socket.username) {
            const username = message;

            if(users.has(username)) {
                socket.write(
                    `[${new Date().toLocaleString()}] 
                    *** System: Username '${username}' already exists, change it`
                );
                return;
            } 
            socket.write(
                `[${new Date().toLocaleString()}] *** System: Congratulations, you have connected the chat!
                Select an option: 
                - /dm <user> <message> → private message
                - /broadcast <message> → send to everyone`
            );

            broadCast(username, `[${new Date().toLocaleString()}] *** System: '${username}' joined the chat`);
            socket.username = username;
            users.set(username, socket);  
        } 

        if(message.startsWith('/dm')) {
            const parts = message.split(' ');
            const username = parts[1];
            const data = parts.slice(2).join(' ');

            if(!users.has(username)) {
                socket.write(
                    `[${new Date().toLocaleString()}] 
                    *** System: Error - username '${username}' does not exist`
                );
                return;
            }

            const userSocket = users.get(username);
            
            userSocket.write(`[${new Date().toLocaleString()}] (Private from <${socket.username}>): ${data}`);
            
            socket.write(`[${new Date().toLocaleString()}] *** System: Sent!`);
        }

        else if(message.startsWith('/broadcast')) {
            const data = message.slice(10);

            broadCast(socket.username, `[${new Date().toLocaleString()}] <${socket.username}> says ${data}`);
        }

        else if(message.startsWith('/options')) {
            socket.write(`
        Commands:
        - /dm <user> <message> → private message
        - /broadcast <message> → send to everyone    
        `)}
    });

    socket.on('close', () => {
        broadCast(socket.username, `[${new Date().toLocaleString()}] *** System: <${socket.username}> left the chat`);
        users.delete(socket.username);
    });
});

const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, host, () => {
    console.log(`Server starts running on port ${port}`);
});

