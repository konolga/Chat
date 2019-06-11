# Chat app with React, Node, Socket.io



## Getting Started

To run frontend use: 
```
npm start
```
To run backend:
 ```
 npm run dev`
 ``
Also there is an option to use Pm2 to run server on two different ports (ne on 8080 and the other on 8081): 
```
./node_modules/.bin/pm2-runtime start ecosystem.config.js
```

### Client side with React.js

Login and select room


![alt text](https://github.com/konolga/Chat/blob/master/public/img/ChatApp1.jpg)

Chat room with a list of online users, and if another user is logging in to the platform it will be displayed without refreshing the page


![alt text](https://github.com/konolga/Chat/blob/master/public/img/ChatApp2.jpg)

In this chat user communicate in the room.


### Server side with Node.js, Express and Socket.io

The server manages all the communication in the platform using bidirectional communication technologies.
Using Redis to manage communications between the sockets

