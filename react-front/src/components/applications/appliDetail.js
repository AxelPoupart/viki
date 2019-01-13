import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Divider from '@material-ui/core/Divider';

import Navbar from '../navbar/navbar';
import ChatContainer from './chatContainer';
import ActionList from './actionsList';
import Button from '@material-ui/core/Button';

import ChatContainer from './chatContainer';

import { 
    
    } from '../../services/userService.js'


import './appliDetail.css';

export default class AppliDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return  (
          <div className="appliDetailGlobal">
  
              <Navbar>
                  <Link className="nav-link" to="/logout">
                      <Button variant="contained" color="secondary"> Logout </Button>
                  </Link>
              </Navbar>
  
              <div className="switchStatus">
                  {//this.switchStatus().bind(this)
                  }
              </div>
  
              <div className="grid" >

                  <div className="chat">
                      <ChatContainer tag={ }/>
                  </div>
  
                  <div className="actionList">
                      <ActionList variant="progress" />  
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