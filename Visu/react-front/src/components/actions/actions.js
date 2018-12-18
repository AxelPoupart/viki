import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Divider from '@material-ui/core/Divider';

import Navbar from '../navbar/navbar';
import ChatContainer from './chatContainer';
import ActionList from './actionsList';
import Button from '@material-ui/core/Button';

import { 
    getUserById
    } from '../../services/userService.js'


import './actions.css';

class Action extends Component {

  state = { user: null, actions: []  }


    switchStatus() {
        if (this.state.user.status === "admin") {
            return (
                <Link className="nav-link" to="/logout">
                    <Button variant="contained"> Switch status </Button>
                </Link>
            )
        }
    }






    render() {
      return  (
        <div className="home_global">

            <Navbar>
                <Link className="nav-link" to="/logout">
                    <Button variant="contained" color="secondary"> Logout </Button>
                </Link>
            </Navbar>

            <div className="switchStatus">
                {//this.switchStatus().bind(this)
                }
            </div>

            <div className="chat_list" >
                <div className="chat">
                    <ChatContainer/>
                </div>

                <div className="progressList">
                    <ActionList variant="progress"/>  
                </div>

                <div className = "divider" >
                    <Divider />
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