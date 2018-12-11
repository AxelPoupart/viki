import { FormGroup, ControlLabel, FormControl, Panel, PanelGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from '../../navbar/navbar';

const AppService = require('../../../services/AppliService');

export default class appli extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAppli = this.handleSubmitAppli.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      searchAppli: '',
      applis: [], // contenant au moins title et description et un id
      activeKey: ""
    };
  }

  addApplis(e) {
    const applis = [{_id: "1", title: "My first action", description: "This is an exemple"}, {_id: "2",title: "My second action", description: "This is an other exemple"}];
    this.setState( {applis} );
  }

  handleChange(e) {
    this.setState({ searchAppli: e.target.value });
  }

  handleSubmitAppli = app => {
    console.log(app);
    const applis = this.state.actions.concat([{title: app.appLabel, id: app.appCode}]);
    this.setState( {applis} );
  };

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }


  render() {
    return (
      <div>

        <div id="navbar">
              <Navbar>
                <Link onSubmit={this.handleSubmitAppli} applis={this.state.applis} className="nav-link" to="/newApp">
                  <Button bsStyle="success">New application</Button>
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
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        defaultActiveKey="1"
      >
      {this.state.activeKey}
      {this.state.applis.map(app => (
        <Panel eventKey={app._id} key={app._id} >
          <Panel.Heading>
            <Panel.Title toggle>{app.title} {app._id}</Panel.Title>
            <Button bsStyle="info">Info</Button>
          </Panel.Heading>
          <Panel.Body collapsible >{app.description}</Panel.Body>
        </Panel>
      ))}
      </PanelGroup>

        <Button onClick={this.addApplis.bind(this)}>Exemple</Button>



      </div>
    )
  }
}
