import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {post_action} from '../../services/actionService';

import './addAction.css';



class AddAction extends Component {

    state = { 
        label: "",
        priority: "Low",
        file: "",
        closingTime: "2017-05-24",
        comment: "",
        creatorId:"",
        actionTakerId: "",
        applicationId:""
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
            Priority: "",
            File: "",
            Campus: "Paris-Saclay",
            Closing_Time: "2017-05-24",
            Comment: "",
            Creator:""
         })
    };

    handleInputChange = e => {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
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

                <Card >
                    <CardContent id = "addCard">

                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="Label"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        label="Action Title"
                        placeholder="Enter title"
                        value={this.state.Label}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <TextField
                        name="Comment"
                        type="text"
                        label="Action Description"
                        placeholder="Description of the Action"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        value={this.state.Comment}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <FormControl
                        fullWidth
                        margin="normal"
                        variant="filled"
                    >
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="Priority"
                            value={this.state.Priority}
                            onChange={this.handleInputChange.bind(this)}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hight">Hight</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl
                        fullWidth
                        margin="normal"
                        variant="filled"
                    >
                        <InputLabel>Campus</InputLabel>
                        <Select 
                            name="Campus"
                            value={this.state.Campus}
                            onChange={this.handleInputChange.bind(this)}
                        >
                            <MenuItem value="Paris-Saclay">Paris-Saclay</MenuItem>
                            <MenuItem value="Rennes">Rennes</MenuItem>
                            <MenuItem value="Metz">Metz</MenuItem>
                        </Select>
                    </FormControl>


                    <TextField
                        id="contained-button-file"
                        multiple
                        name="File"
                        type="file"
                        style={{display: "none"}}
                    />
                    <label htmlFor="contained-button-file">
                        <Button 
                            variant="contained"
                            component="span"
                            name="File"
                            type="file"
                            label="File"
                            margin="normal"
                            value={this.state.file}
                            onClick={this.handleInputChange.bind(this)}
                        >
                            Upload
                        </Button>

                        <TextField
                            name="File"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            placeholder="File title"
                            value={this.state.file}
                            InputProps={{
                                readOnly: true,
                              }}
                        />

                    </label>


                    <TextField
                        name="Closing_Time"
                        label="Closing Time"
                        type="date"
                        value={this.state.Closing_Time}
                        onChange={this.handleInputChange.bind(this)}
                    />
                
                    <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} >Submit</Button>
                    </form>

                    </CardContent>
                    </Card>


                    </div>

            <div id="container">
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell >Action Title</TableCell >
                                <TableCell >Priority</TableCell >
                                <TableCell >File</TableCell >
                                <TableCell >Campus</TableCell >
                                <TableCell >Closing time</TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{this.state.Label}</TableCell>
                                <TableCell>{this.state.Priority}</TableCell>
                                <TableCell>{this.state.File}</TableCell>
                                <TableCell>{this.state.Campus}</TableCell>
                                <TableCell>{this.state.Closing_Time}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </div>

            </div>

        );
    }

}

export default AddAction;
