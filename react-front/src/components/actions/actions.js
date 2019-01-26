import React, { Component } from 'react';
import { Link } from "react-router-dom";



import Navbar from '../navbar/navbar';
import ChatContainer from './chatContainer';
import ActionList from './actionsList';
import Button from '@material-ui/core/Button';

import { 
    
    } from '../../services/userService.js'


import './actions.css';

class Action extends Component {

  state = { user: null, actions: []  }


    switchStatus() {
        if (this.state.user.status === "admin") {
            return (
                <Link className="navLink" to="/logout">
                    <Button variant="contained"> Switch status </Button>
                </Link>
            )
        }
    }
    

    render() {
      return  (
        <div className="homeGlobal">

            <Navbar history={this.props.history} page='Liste des actions' />

            <div className="switchStatus">
                {//this.switchStatus().bind(this)
                }
            </div>

            <div className="chatList" >
                <div className="chat">
                    <ChatContainer tag = "general" />
                </div>

                <div className="progressList">
                    <ActionList variant="progress"/>  
                </div>

                

                <div className="doneList">
                    <ActionList variant="done"/>  
                </div>
                
            </div>
            

        </div>
      );
  } 

}

export default Action;
