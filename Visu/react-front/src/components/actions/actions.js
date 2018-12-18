import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Divider from '@material-ui/core/Divider';

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
    //verif de /content
    componentDidMount(){
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("http://localhost:5000/auth/authenticate", requestOptions)
        .then(res =>  console.log(res))
    }


    

    render() {
      return  (
        <div className="homeGlobal">

            <Navbar>
                <Link className="nav-link" to="/logout">
                    <Button variant="contained" color="secondary"> Logout </Button>
                </Link>
            </Navbar>

            <div className="switchStatus">
                {//this.switchStatus().bind(this)
                }
            </div>

            <div className="chatList" >
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
