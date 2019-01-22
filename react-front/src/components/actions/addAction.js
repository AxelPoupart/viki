import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { post_action } from '../../services/actionService';

import './addAction.css';
import { getApplications } from '../../services/appliService';



class AddAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            priority: "Low",
            file: "",
            closingTime: "",
            comment: "",
            creatorId: 1,
            actionTakerId: 0,
            applicationId: "Application",
            applicationLabel: "",
            applis: []
        }
    }

    addAction = (action) => {
        return post_action(action)
            .then(res => {
                return res
            })
    }

    componentWillMount() {
        getApplications()
            .then(applis => this.setState({ applis: applis }, () => this.setState({ applicationLabel: this.state.applis[0].label })))
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
            creatorId: "",
            actionTakerId: "",
            applicationId: "",
            applicationLabel: ""
        })
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAppliChange = e => {
        let selectedApp = e.target.value;
        let appId = this.state.applis.filter(app => app.label === selectedApp)[0]
        this.setState({ applicationId: appId, applicationLabel: selectedApp });
    };

    handleClockChange(value, formattedValue) {
        this.setState({
            Closing_Time: value // ISO String, ex: "2016-11-19T12:00:00.000Z"
            //formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    render() {
        let applicationOptions = this.state.applis.map(appli => {
            return <MenuItem key={appli._id} value={appli.label} >{appli.label}</MenuItem>
        })
        return (
            <div>

                <div id="container">

                    <Card >
                        <CardContent id="addCard">

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
                                        name="Application"
                                        value={this.state.applicationLabel}
                                        onChange={this.handleAppliChange.bind(this)}
                                    >
                                        {applicationOptions}
                                    </Select>
                                </FormControl>


                                <TextField
                                    name="closingTime"
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
