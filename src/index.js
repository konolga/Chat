const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port1 = 8080
const port2 = 8081

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));

io.on('connection',()=>{
     console.log('new websocket connection')
})



// Start the Server
server.listen(port1,()=>{
    console.log(`Server is up on port ${port1}!`)
})



// Store people in chatroom
let chatters = [];
// Store messages in chatroom
let chat_messages = [];