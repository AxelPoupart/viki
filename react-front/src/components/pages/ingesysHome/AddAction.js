import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Table, Checkbox } from 'react-bootstrap';

import {post_action} from '../../../services/ActionService'

    function FieldGroup({ id, label, help, ...props }) {
        return (
          <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </FormGroup>
        );
    }




class AddAction extends Component {

    state = {
        title: "",
        code: "",
        file: "",
        campus: "",
        vm:[],
        description: "",
        creator:"",
        submitted: false
}

    handleLogout = (event) => {
        this.props.history.push('/login');
    };

    handleBack = (event) => {
        this.props.history.push('/');
    };

    addAction = (action) => {
        post_action(action)
        .then(console.log('POST lançé'))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addAction(this.state);
        this.props.onSubmit(this.state);
        const newAction = {
            title: "",
            code: "",
            file: "",
            campus: "",
            vm:[],
            description: "",
            creator:"",
            submitted: false
    }
        this.setState({ newAction })
    };

    handleInputChange = e => {
        console.log(e.target.value)
        console.log(e.target.id)
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        return(
            <div>

                <div id="container">

                <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="title"
            type="text"
            label="Action Title"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />

          <FieldGroup
            id="code"
            type="text"
            label="Action Code"
            placeholder="Enter Action Code"
            value={this.state.code}
            onChange={this.handleInputChange}
          />

          <FieldGroup
            id="file"
            type="file"
            label="File"
            help="Attached document."
            value={this.state.file}
            onChange={this.handleInputChange}
          />
      

          <FormGroup>
            <ControlLabel>Campus</ControlLabel>
            <FormControl 
            id="campus"
            componentClass="select" 
            placeholder="select"
            value={this.state.campus}
            onChange={this.handleInputChange}
            >
                <option value="Paris-Saclay">Paris-Saclay</option>
                <option value="Rennes">Rennes</option>
                <option value="Metz">Metz</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
          <ControlLabel>All Virtual Machines used</ControlLabel>
            <FormControl 
              id="vm"
              componentClass="Checkbox"
              value = {['', '']}
              onChange={this.handleInputChange}
            >
            <Checkbox inline>VM1</Checkbox> <Checkbox inline>VM2</Checkbox>
            <Checkbox inline>VM3</Checkbox>
            </FormControl>
          </FormGroup>
      
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Description of the Action"
              value={this.state.campus}
              onChange={this.handleInputChange}
            />
          </FormGroup>
      
          <FormGroup>
            <ControlLabel>Creator of the action</ControlLabel>
            <FormControl.Static>email@example.com</FormControl.Static>
          </FormGroup>
      
          <button onClick={(e) => this.handleSubmit(e)} >Submit</button>
        </form>

        </div>

            <div id="container">
                    <Table responsive bordered striped>
                        <thead>
                            <tr>
                                <th>Action Title</th>
                                <th>Code</th>
                                <th>File</th>
                                <th>Campus</th>
                                <th>VM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.title}</td>
                                <td>{this.state.code}</td>
                                <td>{this.state.file}</td>
                                <td>{this.state.campus}</td>
                                <td>{this.state.vm}</td>
                            </tr>
                        </tbody>
                    </Table>
            </div>

            </div>

        );
    }

}

export default AddAction;
