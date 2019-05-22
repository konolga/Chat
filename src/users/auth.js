const socketAuth = require('socketio-auth');


// dummy user verification
async function verifyUser (token) {
  return new Promise((resolve, reject) => {
    // setTimeout to mock a cache or database call
    setTimeout(() => {
      // this information should come from your cache or database
      const users = [
        {
          id: 1,
          name: 'mariotacke',
          token: 'secret token',
        },
      ];

      const user = users.find((user) => user.token === token);

      if (!user) {
        return reject('USER_NOT_FOUND');
      }

      return resolve(user);
    }, 200);
  });
}

socketAuth(io, {
  authenticate: async (socket, data, callback) => {
    const { token } = data;

    try {
      const user = await verifyUser(token);

      socket.user = user;

      return callback(null, true);
    } catch (e) {
      console.log(`Socket ${socket.id} unauthorized.`);
      return callback({ message: 'UNAUTHORIZED' });
    }
  },
  postAuthenticate: (socket) => {
    console.log(`Socket ${socket.id} authenticated.`);
  },
  disconnect: (socket) => {
    console.log(`Socket ${socket.id} disconnected.`);
  },
})

module.exports = {
    socketAuth
}