import { FormGroup, ControlLabel, FormControl, Panel, ListGroup, ListGroupItem, PanelGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from '../../navbar/navbar';
import AddVm from './AddVm';
import { get_vms, get_vmsBySearch } from '../../../services/VmService';

import './vm.css';

export default class vm extends Component {




  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchVm: '',
      vms: [], // contenant au moins title et description et un id
      searchResult: []
    };
  }



  handleChange(e) {
    const searchResult = [];
    this.setState( {searchResult} );
    const term = e.target.value
    this.setState({ searchVm: term });
    if(term !== "" ) {
      get_vmsBySearch(term).then(vm => {
        for (var e in vm) {
            const current_vm = vm[e];
            const searchResult = this.state.searchResult.concat([current_vm]);
            this.setState( {searchResult} );
        }
      })
    }
    

  }

  componentWillMount() {
    this.display_vms()
  }

  display_vms() {
    get_vms().then(vm => {
        for (var e in vm) {
            const current_vm = vm[e];
            const vms = this.state.vms.concat([current_vm]);
            this.setState( {vms} );
        }
    })
  } 


  render() {
    return (
      <div>

        <div id="navbar">
          <Navbar>
            <Link className="nav-link" to="/newApp">
              <Button bsStyle="success">Add a VM</Button>
            </Link>
          </Navbar>
        </div>

        <div id="vm">


          <div id="add_vm"> 
            <AddVm></AddVm>
          </div>

          <div id="vm_list"> 
          <form>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Search for a Virtual Machine</ControlLabel>
              <FormControl
                type="text"
                value={this.state.searchVm}
                placeholder="Search..."
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>

          <PanelGroup accordion
            id="accordion-uncontrolled-example"
            defaultActiveKey="1"
            >
          {this.state.searchResult.map(vm => (
            <Panel eventKey={vm._id}>
              <Panel.Heading>
                <Panel.Title toggle>{vm.Label}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible >{vm.Comment}</Panel.Body>
            </Panel>
          ))}
          </PanelGroup>



          <h4>All virtuals machines</h4>
          <PanelGroup accordion
            id="accordion-uncontrolled-example"
            defaultActiveKey="1"
            >
          {this.state.vms.map(vm => (
            <Panel eventKey={vm._id}>
              <Panel.Heading>
                <Panel.Title toggle>{vm.Label}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible >{vm.Comment}</Panel.Body>
            </Panel>
          ))}
          </PanelGroup>

          </div>

        </div>
      </div>
    )
  }
}