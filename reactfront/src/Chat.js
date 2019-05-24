import React, { Component } from 'react';
import {socket} from './App';

class Chat extends Component{

    constructor(){
        super()
        this.state={
            message: "",
            messages: [],
            room: "",
            users: []
        }

        socket.on('roomData', ({ room, users }) => {
            this.setState({room: room, users: [...this.state.users, ...users]});
        })
   
    };
      handleChange=(name)=> (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})};


        sendMessage=(event)=>{
           
            event.preventDefault();
           
            socket.emit('sendMessage', this.state.message, (error) => {
                if (error) {return console.log(error)}   
            })
           this.setState({message: ""})

        };

    


            inputForm = (message)=>(
                <div className="chat__main">
                <div id="messages" className="chat__messages"></div>   
                <div className="compose">
                    <form id="message-form">
                        <input name="message" placeholder="Message" required autoComplete="off"
                        value = {message}
                        onChange = {this.handleChange("message")}
                        />
                        <button onClick={this.sendMessage}>Send</button>
                    </form>  
                </div>
            </div>   
            );

            roomForm = (room, users)=>(
                <div id="sidebar-template" type="text/html">
                <h2 className="room-title">Room:{room}</h2>
                <h3 className="list-title">Users</h3>
                <ul className="users">
                    {users.map((user, i)=>(<li key={i}>{i+1}: {user.username}</li>))}
                </ul>
                </div>
            )
               

    render(){     
        const {message, room, users} = this.state;      
            return ( 
            <div className="chat">
              <div id="sidebar" className="chat__sidebar">
              {this.roomForm(room, users)}</div>                  
              {this.inputForm(message)}</div> 

            
           )       
    }
}


export default Chat;