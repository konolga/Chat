# Chat app with React, Node, Socket.io

One Paragraph of project description goes here

## Getting Started

To run frontend use: 
```
npm start
```
To run backend you can use: npm run dev
or 
use Pm2 to run server on two different ports (ne on 8080 and the other on 8081): 
```
./node_modules/.bin/pm2-runtime start ecosystem.config.js
```

### Client side with React.js

Login and select room
[alt text](https://github.com/konolga/Chat/blob/master/public/img/ChatApp1.jpg)

Chat room with a list of online users, and if another user is logging in to the platform it will be displayed without refreshing the page
[alt text](https://github.com/konolga/Chat/blob/master/public/img/ChatApp2.jpg)

In this chat user communicate in the room.

TODO: Comunicate between two users on click the username
TODO: Authentication with Token

### Server side with Node.js, Express and Socket.io

The server manage sall the communication in the platform using bidirectional communication technologies.
The platform run on two different ports(one on 8080 and the other on 8081)
Using Redis to manage communications between the servers

TODO: Add direct messages as a room with two participiants
TODO: Use Redis to manage authorized users
