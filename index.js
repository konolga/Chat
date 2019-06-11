//server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const app = express();
const Filter = require('bad-words')
const { generateMessage, getMessages} = require('./src/messages/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/users/users')
const redisAdapter = require('socket.io-redis');


app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", port);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "reactfront", "build")))

const server = require('http').Server(app);
const io = socketio(server);
const port = process.env.PORT||8080;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/reactfront/build/index.html"));
  }); 

server.listen(port)
io.adapter(redisAdapter(process.env.REDIS_URL));

io.on('connection', (socket) => {

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }


        socket.join(user.room)
        socket.emit('message', 
                    {message: generateMessage('Admin', `Welcome, ${user.username}!`),
                    messages: getMessages()})
        socket.broadcast.to(user.room).emit('message', {message: generateMessage('Admin', `${user.username} has joined!`), messages: getMessages()})
        io.in(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
            user: user
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

        if(user){
            io.to(user.room).emit('message', {
                message: generateMessage(user.username, message),
                messages: getMessages()
            })
        }
        
        callback()
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            socket.broadcast.to(user.room).emit('message', 
           { message: generateMessage('Admin', `${user.username} has left!`),
            messages: getMessages()} )

            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})
