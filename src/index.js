const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const fs = require('fs');
const redis = require('redis');
const app = express();


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


const server = require('http').Server(app);
const io = socketio(server);
const port = process.env.PORT;
server.listen(port)


io.on('connection',()=>{
    console.log('new websocket connection')
})

io.on('connection',(socket)=>{
    socket.emit('message', 'Welcome!') //emits the event to the single client
    
    socket.broadcast.emit('message', 'a new user joined') //emits the event to every connected client except this paticular client

    socket.on('sendMessage',(message, status)=>{
        io.emit('message', message) //emits the event to every connected client
        status('delivered')
    })

    socket.on('disconnect',()=>{
        io.emit('message', 'User left')
    })
})