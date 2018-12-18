import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Navbar from '../navbar/navbar';
import AppliList from './appliList';
import AppliSearch from './appliSearch';

import './appli.css';


class Appli extends Component {

  state = { user: null, actions: []  }

  handleLogout = (event) => {
      this.props.history.push('/login');
  }

  render() {
      return  (
        <div id="home_global">

            <Navbar>
                <Button variant="contained" color="secondary"> Logout </Button>
            </Navbar>

            <div>
                <AppliSearch />
            </div>

            <Divider />

            <div id="applilist">
                <AppliList />  
            </div>

        </div>
      );
  } 

}

export default Appli;
