
const $messageArea = document.querySelector('#messageArea');
const $messageForm = document.querySelector('#messageForm');
const $messageButton = document.querySelector('#messageButton');
const $messageInput = document.querySelector('#message');
const $chat = document.querySelector('#chat');
const $userFormArea = document.querySelector('#userFormArea');
const $userForm = document.querySelector('#userForm');
const $users = document.querySelector('#users');
const $username = document.querySelector('#username');

let connectButton;
let disconnectButton;
let socket;
let statusInput;
let tokenInput;


const connect = () => {
    socket = io();

socket.on('connect', () => {
    console.log('Connected');
    statusInput.value = 'Connected';
    connectButton.disabled = true;
    disconnectButton.disabled = false;
});

socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
    statusInput.value = `Disconnected: ${reason}`;
    connectButton.disabled = false;
    disconnectButton.disabled = true;
});

socket.open();
};
socket.on('message',(message)=>{
console.log(message)
   // $chat.appendChild(divSystemContentElement(message)); --??
})

socket.on('users',(data)=>{
    let html = '';
    for(let i=0; i<data.length; i++){
//this.html +='<li class="list-group-item">'
    }
})

const updateUsernames = (()=>{
io.emit('users', users);
})

const divSystemContentElement = (message=>{
   //  return $('<div></div>').html('<i>'+message+'</i>');
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



/* $userForm.submit(e=>{
    e.preventDefault();
    socket.emit('user',$username.val(),(data)=>{
        if(data){
            $userFormArea.hide();
            $messageArea.show()
        }
    });
    $username.val(''); */
//})


