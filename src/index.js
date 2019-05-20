const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const redis = require('redis');
const app = express();


const io = socketio(server)
const port1 = process.env.PORT || 8080;
const port2 = process.env.PORT || 8081;

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));




const server = http.createServer(app, onRequest).listen(onRequest);
http.createServer(app, onRequest_b).listen(port2);

function onRequest (req, res) {
    if(req.socket.localPort==port1){
        res.write(`Server is up on port ${port1}!`);

    }
else   res.write(`Server is up on port ${port2}!`);
res.end();
return req.PORT;

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