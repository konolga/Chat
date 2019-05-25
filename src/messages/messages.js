const moment = require ('moment');
const messages = [];
const generateMessage = (username, text) => { 
    const createdAt = moment(new Date().getTime()).format('h:mm a')
   // Store messages
   const message = { username, text, createdAt }
   messages.push(message)

   return {
    username,
    text,
    createdAt
}
}
const getMessages = () => {
    return messages
}


module.exports = {
    generateMessage,
    getMessages
}