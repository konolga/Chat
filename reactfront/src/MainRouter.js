import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login'
import Chat from './Chat'

const MainRouter =()=>(
    <div>
        <Switch>
        <Route exact path="/" component = {Login} />
        <Route exact path="/chat" component = {Chat} />                    
        </Switch>
    </div>
);

export default MainRouter;