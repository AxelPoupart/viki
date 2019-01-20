import React, { Component } from 'react';

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

            <Navbar page='Gestion des machines virtuelles'/>

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
