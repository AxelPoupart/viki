import React, { Component } from 'react';
import { form, FormGroup, Button, FormControl, ControlLabel, Table } from 'react-bootstrap';

import {post_vm} from '../../../services/VmService'


function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        </FormGroup>
    );
}



class AddVm extends Component {

    state = { 
        Label: "",
        File: "",
        Campus: "Paris-Saclay",
        Comment: ""
    }

    //Lançe la requête au Back
    addVm = (vm) => {
        post_vm(vm)
        .then(res => {
            console.log('POST lançé')
            return res
        })
    }

    // Récupére le form et le réinitialise
    handleSubmit = (e) => {
        e.preventDefault();
        this.addVm(this.state)
        this.setState({ 
            Label: "",
            File: "",
            Campus: "Paris-Saclay",
            Comment: ""
         })
    };

    // Change le state en fonction des input
    handleInputChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        return(
            <div>
                <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="Label"
                        type="text"
                        label="VM Title"
                        placeholder="Enter title"
                        value={this.state.Label}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <FieldGroup
                        id="File"
                        type="file"
                        label="File"
                        help="Attached document."
                        value={this.state.file}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <FormGroup>
                        <ControlLabel>Campus</ControlLabel>
                        <FormControl 
                        id="Campus"
                        componentClass="select" 
                        placeholder="select"
                        value={this.state.campus}
                        onChange={this.handleInputChange.bind(this)}
                        >
                            <option value="Paris-Saclay">Paris-Saclay</option>
                            <option value="Rennes">Rennes</option>
                            <option value="Metz">Metz</option>
                        </FormControl>
                    </FormGroup>

                    <FieldGroup
                        id="Comment"
                        type="text"
                        label="Action Description"
                        placeholder="Description of the virtual machine"
                        value={this.state.Comment}
                        onChange={this.handleInputChange.bind(this)}
                    />
      
                    <FormGroup>
                        <ControlLabel>Creator of the action</ControlLabel>
                        <FormControl.Static>email@example.com</FormControl.Static>
                    </FormGroup>
      
                    <Button bsStyle="success" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </form>
                </div>

                <div id="container">
                    <Table responsive bordered striped>

                        <thead>
                            <tr>
                                <th>Action Title</th>
                                <th>File</th>
                                <th>Campus</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{this.state.Label}</td>
                                <td>{this.state.file}</td>
                                <td>{this.state.Campus}</td>
                            </tr>
                        </tbody>

                    </Table>
                </div>

            </div>
        );
    }
}

export default AddVm;
