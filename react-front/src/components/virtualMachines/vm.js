import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Navbar from '../navbar/navbar';
import VmList from './vmList';
import VmSearch from './vmSearch';

import './vm.css';


class Vm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machines: []
        }

        this.loadMachines = this.loadMachines.bind(this)
    }

  loadMachines = (vmsList) => {
    this.setState({ machines: vmsList });
}

  render() {
      return  (
        <div id="home_global">

            <Navbar page='Gestion des machines virtuelles'/>

            <div>
                <VmSearch machines={this.state.machines}/>
            </div>

            <div id="vmlist">
                <VmList exportMachines={this.loadMachines} />  
            </div>

        </div>
      );
  } 

}

export default Vm;
