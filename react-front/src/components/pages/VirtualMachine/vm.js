import { FormGroup, ControlLabel, FormControl, Panel, ListGroup, ListGroupItem, PanelGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from '../../navbar/navbar';


export default class vm extends Component {




  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchVm: '',
      vms: [], // contenant au moins title et description et un id
    };
  }

  addVms(e) {
    const vms = [{_id: "1", title: "My first vm", description: "This is an exemple"}, {_id: "2",title: "My second vm", description: "This is an other exemple"}];
    this.setState( {vms} );
  }

  handleChange(e) {
    this.setState({ searchVm: e.target.value });
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
      {this.state.vms.map(vm => (
        <Panel eventKey={vm._id}>
          <Panel.Heading>
            <Panel.Title toggle>{vm.title}</Panel.Title>
            <Button bsStyle="info">Info</Button>
          </Panel.Heading>
          <Panel.Body >{vm.description}</Panel.Body>
        </Panel>
      ))}
      </PanelGroup>

      <Button onClick={this.addVms.bind(this)}>Exemple</Button>

      </div>
    )
  }
}