import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Navbar from '../navbar/navbar';
import UserList from './userList';
import Button from '@material-ui/core/Button';


import './users.css';

class User extends Component {

  state = { user: null, actions: []  }
  



  render() {
      return  (
        <div className="homeGlobal">

            <Navbar>

                <div className="switch">
                   <Link className="nav-link" to="/actions">
                        <Button variant="contained"> Switch status </Button>
                    </Link>
                </div>
                <div className = "logout">

                    <Link className="nav-link" to="/logout">
                        <Button variant="contained" color="secondary"> Logout </Button>
                    </Link> 
                </div>
                
            </Navbar>

            <div className="userList">
                <UserList />  
            </div>

        </div>
      );
  } 

}

export default User;
