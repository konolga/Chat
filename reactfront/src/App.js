
import React, { Component } from 'react';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom';
import './css/App.css';
import './css/styles.min.css';
import io from 'socket.io-client';


class App extends Component {

  constructor() {
    super()
    this.state = {
       messages: [],
       message: '',
       users:[],
       room:""
    }
  };

  render() {
    return (
      <div className="app">
       <BrowserRouter>
       <MainRouter/>
       </BrowserRouter>
     </div>
    )
  }
}

 
export const socket = io(process.env.REACT_APP_API_URL||'localhost:8080');
export default App