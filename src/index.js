const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const app = express();
const adapter  = require('socket.io-redis');
const io = socketio(server);
const server = require('http').Server(app);
const port = process.env.PORT;// port injection from PM2

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


// Store people in chatroom
let chatters = [];
// Store messages in chatroom
let chat_messages = [];
let connections =[];


server.listen(port)

//io.adapter(redisAdapter({ host: 'localhost', port: port }));



io.on('connection',()=>{
    console.log('new websocket connection')
    

    io.on('connection',(socket)=>{
    connections.push(socket);
    console.log('connected: %s', connections.length)

    socket.emit('message', 'Welcome!') //emits the event to the single client
    
    socket.broadcast.emit('message', 'a new user joined') //emits the event to every connected client except this paticular client

    socket.on('sendMessage',(message, status)=>{
        io.emit('message', message) //emits the event to every connected client
        status('delivered')
    })

    //Disconnect
    socket.on('disconnect',()=>{
        io.emit('message', 'User left')
        $users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket),1);
        console.log('1 disconnected, %s connected', connections.length)
    })

    socket.on('user',(username, callback)=>{
        callback(true);
        socket.username=data;
        $users.push(socket.username);
        })

})
})

const redisAdapter = adapter({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || 'password',
  });
  io.adapter(redisAdapter);