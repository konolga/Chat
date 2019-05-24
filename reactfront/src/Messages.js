import {Component} from "react";
import React from "react";
import socket from "./App";

class Messages extends Component {
  constructor(){
    super()
    this.state={
        messages:[]
        // this is where we are connecting to with sockets
    }
}

componentDidMount() {
  // this.loadMeassages(this.state.page);
   //socket.on('message', this.message);
   //socket.on('roomData', this.roomData);
   //socket.emit('sendMessage', this.sendMessage);
   //socket.emit('join', this.join);
 }

/* loadMeassages = page => {
  const list =() =>{
    return fetch(`${document.location.origin}/messages`,{
        method: "GET"
            })
        .then(response=>{
        return response.json();
    })
        .catch(err=>console.log(err))
  }

  list(page).then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
          this.setState({ messages: data });
      }
  });
};  */



renderMeassages = messages => {
  return this.state.messages.map(message => {

          return ( <div id="message-template" type="text/html">
                    <div class="message">
                    <p>
                        <span class="message__name">{message.username}</span>
                        <span class="message__meta">{message.createdAt}</span>
                    </p>
                    <p>{message.text}</p>
                </div>
            </div>
         )
       })}
    
  


render() {
  const {messages} = this.state;
  return (
      <div className="container">
      <h2 className="mt-5 mb-5">
      {!messages.length? "Loading...": "Recent Messages"}
      </h2>
      {this.renderMeassages(messages)}
     
      </div>
  );
}
}


export default Messages;

//client
import socket from "./App";
const Qs = require('qs');
const moment = require('moment');
const location = require('location')
const Mustache = require('Mustache')

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

