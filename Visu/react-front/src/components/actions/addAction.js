import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {post_action} from '../../services/actionService';

import './addAction.css';
import { get_applis } from '../../services/appliService';



class AddAction extends Component {

    state = { 
        label: "",
        priority: "Low",
        file: "",
        closingTime: "",
        comment: "",
        creatorId: 1,
        actionTakerId: 0,
        applicationId:"Application",
        applicationLabel:"Application",
        applis: []
    }

    addAction = (action) => {
        return post_action(action)
        .then(res => {
            console.log('POST lançé')
            return res
        })
    }

    componentWillMount() {
        get_applis()
            .then(appli => {
                for (var e in appli) {
                    const current_appli = appli[e];
                    console.log(current_appli);
                    const applis = this.state.applis.concat([current_appli]);
                    this.setState( {applis} )
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const actions = { 
            label: this.state.label,
            priority: this.state.priority,
            file: this.state.file,
            closingTime: this.state.closingTime,
            comment: this.state.comment,
            creatorId: this.state.creatorId,
            actionTakerId: this.state.actionTakerId,
            applicationId: this.state.applicationId
        }
        this.addAction(actions)
        .then(res => {
            this.props.onSubmit(res);
        });
        this.setState({ 
            label: "",
            priority: "Low",
            file: "",
            closingTime: "",
            comment: "",
            creatorId:"",
            actionTakerId: "",
            applicationId:"",
            applicationLabel:""
         })
    };

    handleInputChange = e => {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAppliChange = e => {
        console.log(e.target.value);
        this.setState({ applicationId: e.target.value });
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
                        name="label"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        label="Action Title"
                        placeholder="Enter title"
                        value={this.state.label}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <TextField
                        name="comment"
                        type="text"
                        label="Action Description"
                        placeholder="Description of the Action"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        value={this.state.comment}
                        onChange={this.handleInputChange.bind(this)}
                    />

                    <FormControl
                        fullWidth
                        margin="normal"
                        variant="filled"
                    >
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="priority"
                            value={this.state.priority}
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
                        <InputLabel>Application</InputLabel>
                        <Select
                            name="applicationId"
                            value={this.state.applicationId}
                            placeholder={this.state.applicationLabel}
                        >
                            {this.state.applis.map(appli => (
                                <div key= {appli._id}>
                                    <MenuItem value= {appli._id} onClick={this.handleAppliChange} >{appli.label}</MenuItem>
                                </div>
                                ))}
                        </Select>
                    </FormControl> 


                    <TextField
                        name="closingTime"
                        label="Closing Time"
                        type="date"
                        value={this.state.closingTime}
                        onChange={this.handleInputChange.bind(this)}
                    />
                
                    <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} >Submit</Button>
                    </form>

                    </CardContent>
                    </Card>
                    </div>
            </div>

        );
    }

}

export default AddAction;
