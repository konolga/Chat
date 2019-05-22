//server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const app = express();
const Filter = require('bad-words')
const { generateMessage } = require('./messages/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users/users')

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const server = require('http').Server(app);
const io = socketio(server);
const port = process.env.PORT||8080;

server.listen(port)


io.on('connection', (socket) => {

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }


        socket.join(user.room)
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback();
    });

    socket.on('unauthorized', (reason) => {
        console.log('Unauthorized:', reason);
    
        error = reason.message;
    
        socket.disconnect();
      });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})
//when login token can be socket.id
//socket.to(anotherSocket.id).emit('message');
//socketid is room