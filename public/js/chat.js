const socket = io();
const $messageForm = document.querySelector('#message-form');
const $messageButton = document.querySelector('#message-button');
const $messageInput = document.querySelector('#message-input');

socket.on('message',(message)=>{
console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    $messageButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (status)=>{
        $messageInput.value='';
        $messageInput.focus();
        $messageButton.removeAttribute('disabled')
        console.log('message status', status)
    })
})


