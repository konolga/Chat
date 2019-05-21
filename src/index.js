const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const redis = require('redis');
const app = express();



const port1 = process.env.PORT || 8080;
const port2 = process.env.PORT || 8081;

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));




const server1 = http.createServer(onRequest).listen(port1);
const server2 = http.createServer(onRequest).listen(port2);
function onRequest_b (req, res) {
    res.write(`Server is up on port ${port1}!`);
    res.end();
  }
function onRequest_b (req, res) {
  res.write(`Server is up on port ${port2}!`);
  res.end();
}


io.on('connection',()=>{
     console.log('new websocket connection')
})


// Store people in chatroom
let chatters = [];
// Store messages in chatroom
let chat_messages = [];


//??????
const io = socketio(server)
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