import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import {signin, authenticate} from '../auth';
import {socket} from './App';


class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            room: "",
            password: "",
            redirectToReferer: false
        }
    };


    handleChange=(name)=> (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})
    };


    clickSubmit=(event)=>{
        event.preventDefault();
        socket.emit('join', { username: this.state.username, room: this.state.room }, (error) => {
            console.log(this.state.username, this.state.room)
            if (error) {
                alert(error)
            }})
        this.setState({loading: true, redirectToReferer: true})
    };

    
    signinForm=(username, room)=>(
        <div className="centered-form">
            <form className="centered-form__box">
            <h1>Join</h1>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange = {this.handleChange("username")} type="text" value = {username}
                className="form-control" placeholder="Display name" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Room</label>
                <input type="text" name="room" placeholder="Room" required
                onChange = {this.handleChange("room")}
                value = {room} className="form-control"/>
            </div>
            <button onClick ={this.clickSubmit} className="btn btn-raised btn-primary">Join</button>
            </form>
        </div>
       
    )

    render() {
        const {username, room, redirectToReferer} = this.state;
        if(redirectToReferer){ return <Redirect to ="/chat" /> }           

        return (
           
            <div className="container">
                

               {this.signinForm(username, room)}
                
            </div>
        );
    }
}

export default Login;