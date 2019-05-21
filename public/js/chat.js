
const $messageArea = document.querySelector('#messageArea');
const $messageForm = document.querySelector('#messageForm');
const $messageButton = document.querySelector('#messageButton');
const $messageInput = document.querySelector('#message');
const $chat = document.querySelector('#chat');
const $userFormArea = document.querySelector('#userFormArea');
const $userForm = document.querySelector('#userForm');
const $users = document.querySelector('#users');
const $username = document.querySelector('#username');

const socket = io();


socket.on('message',(message)=>{
console.log(message)
})


$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $messageButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (status)=>{
        $messageInput.value='';
        $messageInput.focus();
        $messageButton.removeAttribute('disabled')
        console.log('message status', status)
    });
})


