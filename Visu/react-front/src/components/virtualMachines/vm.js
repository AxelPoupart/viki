import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Navbar from '../navbar/navbar';
import VmList from './vmList';
import VmSearch from './vmSearch';

import './vm.css';


class Vm extends Component {

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
                <VmSearch />
            </div>

            <Divider />

            <div id="vmlist">
                <VmList />  
            </div>

        </div>
      );
  } 

}

export default Vm;
