
import React, { Component } from 'react';
import './App.css';

import Chat from "./Chat";
import io from 'socket.io-client';


class App extends Component {

  constructor() {
    super()
    this.state = {
       messages: [],
       message: ''
    }
  };

  render() {
    return (
      <div className="app">
       <Chat/>
     </div>
    )
  }
}

 
export const socket = io('http://localhost:8080');
export default App