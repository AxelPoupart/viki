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
import Input from '@material-ui/core/Input';

import {post_appli} from '../../services/appliService';

import './addAppli.css';


class AddAppli extends Component {

    state = { 
        Label: "",
        File: "",
        Campus: "Paris-Saclay",
        Comment: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        post_appli(this.state)
        .then(res => {
            this.props.onSubmit(res);
        });
        this.setState({ 
            Label: "",
            File: "",
            Campus: "Paris-Saclay",
            Comment: ""
         })
    };

    handleInputChange = e => {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
    };

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
                        label="Application Title"
                        placeholder="Enter title"
                        value={this.state.Label}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <TextField
                        name="Comment"
                        type="text"
                        label="Application Description"
                        placeholder="Description of the Application"
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
                
                    <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} >Submit</Button>
                    </form>

                    </CardContent>
                    </Card>


                    </div>

            <div id="container">
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell >Application Title</TableCell >
                                <TableCell >File</TableCell >
                                <TableCell >Campus</TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{this.state.Label}</TableCell>
                                <TableCell>{this.state.File}</TableCell>
                                <TableCell>{this.state.Campus}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </div>

            </div>

        );
    }

}

export default AddAppli;
