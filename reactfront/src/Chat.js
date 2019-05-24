import React from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

class Chat extends React.Component{

    constructor(){
        super()
        this.state={
            message: {},
            messages: []
        }   
socket.on('message', (username, text)=>{
          generateMessage(username, text);
      });


    const generateMessage = (username, text) => {
            this.setState(  {message: {
                                        username: username,
                                        text: text,
                                        createdAt: new Date().getTime()
                                     }
                             })} 


    this.sendMessage = ev =>{
        ev.preventDefault();
        socket.emit('sendMessage',  {
            message: this.state.message
        })
        this.setState({message: ''});
    }
 }
    render(){           
            return (              
            <div className="chat">
            <div id="sidebar" className="chat__sidebar">    
            </div>
            <div className="chat__main">
                <div id="messages" className="chat__messages"></div>   
                <div className="compose">
                    <form id="message-form">
                        <input name="message" placeholder="Message" required autoComplete="off" onChange={ev => this.setState({message: ev.target.value})}/>
                        <button onClick={this.sendMessage}>Send</button>
                    </form>  
                </div>
            </div>
            <p>
                    <span className="message__name">{this.state.message.username}</span>
                    <span className="message__meta">{this.state.message.createdAt}</span>
                    </p>
                    <p>{this.state.message.text}</p>
            </div> 
           )
        
    }
}


export default Chat;