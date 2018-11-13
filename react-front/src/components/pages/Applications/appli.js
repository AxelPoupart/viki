import Users from "../../auth/users.js";
import { FormGroup, ControlLabel, FormControl, Panel, ListGroup, ListGroupItem, PanelGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from '../../navbar/navbar';


export default class appli extends Component {




  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchAppli: '',
      applis: [], // contenant au moins title et description et un id
    };
  }

  addApplis(e) {
    const applis = [{_id: "1", title: "My first action", description: "This is an exemple"}, {_id: "2",title: "My second action", description: "This is an other exemple"}];
    this.setState( {applis} );
  }

  handleChange(e) {
    this.setState({ searchAppli: e.target.value });
  }


  render() {
    return (
      <div>

        <div id="navbar">
              <Navbar>
                <Link className="nav-link" to="/newApp">
                  <Button bsStyle="success">Add application</Button>
                </Link>
              </Navbar>
          </div>

        <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Search for an appli</ControlLabel>
          <FormControl
            type="text"
            value={this.state.searchAppli}
            placeholder="Search..."
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>

      <PanelGroup accordion
        id="accordion-uncontrolled-example"
        defaultActiveKey="1"
        >
      {this.state.applis.map(app => (
        <Panel eventKey={app._id}>
          <Panel.Heading>
            <Panel.Title toggle>{app.title}</Panel.Title>
            <Button bsStyle="info">Info</Button>
          </Panel.Heading>
          <Panel.Body >{app.description}</Panel.Body>
        </Panel>
      ))}
      </PanelGroup>

        <Button onClick={this.addApplis.bind(this)}>Exemple</Button>



      </div>
    )
  }
}
