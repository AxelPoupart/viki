import React, { Component } from 'react';
import { form, FormGroup, Button, FormControl, ControlLabel, HelpBlock, Table, Checkbox } from 'react-bootstrap';

import {post_action} from '../../../services/ActionService'

var DatePicker = require("react-16-bootstrap-date-picker");

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}


var Closing_Time = new Date().toISOString();

class AddAction extends Component {

    state = { 
        Label: "",
        Priority: "Low",
        File: "",
        Campus: "Paris-Saclay",
        Closing_Time: Closing_Time,
        Comment: "",
        Creator:""
    }

    addAction = (action) => {
        return post_action(action)
        .then(res => {
            console.log('POST lançé')
            return res
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addAction(this.state)
        .then(res => {
            this.props.onSubmit(res);
        });
        this.setState({ 
            Label: "",
            Priority: "Low",
            File: "",
            Campus: "Paris-Saclay",
            Closing_Time: Closing_Time,
            Comment: "",
            Creator:""
         })
    };

    handleInputChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleClockChange(value, formattedValue) {
        this.setState({
            Closing_Time: value // ISO String, ex: "2016-11-19T12:00:00.000Z"
            //formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
      }

    render() {
        return(
            <div>

                <div id="container">

                <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="Label"
            type="text"
            label="Action Title"
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
            <ControlLabel>Priority</ControlLabel>
            <FormControl 
            id="Priority"
            componentClass="select" 
            placeholder="select"
            value={this.state.Priority}
            onChange={this.handleInputChange}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Hight">Hight</option>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Closing Time</ControlLabel>
            <DatePicker id="example-datepicker" value={this.state.Closing_Time} onChange={this.handleClockChange.bind(this)} />
          </FormGroup>
      

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
            placeholder="Description of the Action"
            value={this.state.Comment}
            onChange={this.handleInputChange.bind(this)}
          />
      
          <FormGroup>
            <ControlLabel>Creator of the action</ControlLabel>
            <FormControl.Static>email@example.com</FormControl.Static>
          </FormGroup>
      
          <button onClick={this.handleSubmit.bind(this)} >Submit</button>
        </form>

        </div>

            <div id="container">
                    <Table responsive bordered striped>
                        <thead>
                            <tr>
                                <th>Action Title</th>
                                <th>Priority</th>
                                <th>File</th>
                                <th>Campus</th>
                                <th>Closing time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.Label}</td>
                                <td>{this.state.Priority}</td>
                                <td>{this.state.file}</td>
                                <td>{this.state.Campus}</td>
                                <td>{this.state.Closing_Time}</td>
                            </tr>
                        </tbody>
                    </Table>
            </div>

            </div>

        );
    }

}

export default AddAction;
