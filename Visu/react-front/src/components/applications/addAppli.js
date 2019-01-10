import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { post_appli } from '../../services/appliService';
import { get_campuses, get_domains } from '../../services/generalService';

import './addAppli.css';


export default class AddAppli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appCode: "",
            appLabel: "",
            appComment: "",
            campuses: [],
            selectedCampus: "",
            domains: [],
            selectedDomain: "",
            subDomains: {},
            selectedSubDomain: "",
            subDomainOptions: [],
            newApplication: {
                appCode: '',
                appLabel: '',
                appCampus: '',
                appDomain: '',
                appSubDomain: '',
                comment: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // Get campuses registered in the database and store them in a state
    get_campuses() {
        let campuses;
        get_campuses()
            .then(res => {
                console.log(res)
                campuses = res.campuses
            })
            .then(() => {
                this.setState({ campuses: campuses })
                this.setState({ selectedCampus: campuses[0] })
            })
    }

    // Get the domains and their respective subdomains registered in the database and store them in a state
    get_domains() {
        let domains = [], subDomains = {};
        get_domains()
            .then(res => {
                for (var key in res.domains) {
                    domains.push(res.domains[key])
                };
                subDomains = res.subDomains;
            })
            .then(() => {
                this.setState({
                    domains: domains,
                    subDomains: subDomains
                }, () => {
                    this.setState({ selectedDomain: this.state.domains[0] })
                    this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[0]] }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
                })
            })

    }

    componentWillMount() {
        this.get_campuses()
        this.get_domains()
    }

    // Upon submitting the form, do a form control to prevent empty fields
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.appCode.trim()) {
            alert("Please fill in the aplication code");
        } else if (!this.state.appLabel.trim()) {
            alert("Please fill in the application label");
        } else {
            // if the form control is successful, send a post request to the server
            this.setState({
                newApplication: {
                    appCode: this.state.appCode,
                    appLabel: this.state.appLabel,
                    appCampus: this.state.selectedCampus,
                    appDomain: this.state.selectedDomain,
                    appSubDomain: this.state.selectedSubDomain,
                    comment: this.state.appComment
                }
            }, () => post_appli(this.state.newApplication)
                .then(res => {
                    if (res.success) {
                        alert(res.msg)
                        // if the creation is done, hide the form to create the apps and reset all the values
                        this.props.confirmAppSent(this.state.newApplication)
                        this.setState({ selectedDomain: this.state.domains[0] })
                        this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[0]] }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
                        this.setState({
                            appCode: '',
                            appLabel: '',
                            appComment: '',
                            newApplication: {
                                appCode: '',
                                appLabel: '',
                                appCampus: '',
                                appDomain: '',
                                appSubDomain: '',
                                comment: ''
                            }
                        })
                    } else {
                        alert(res.msg)
                    }
                }));
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateSubDomains = (event) => {
        let selectedDomain = event.target.value
        this.state.selectedDomain = selectedDomain
        let subDomainOptions = this.state.subDomains[selectedDomain]
        this.setState({ subDomainOptions: subDomainOptions }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
    }

    render() {
        // Declaring options
        let campusesOptions = this.state.campuses.map(campus => {
            return <MenuItem key={campus} value={campus}>{campus}</MenuItem>
        })
        let domainsOptions = this.state.domains.map(domain => {
            return <MenuItem key={domain} value={domain}>{domain}</MenuItem>
        })
        let subDomainOptions = this.state.subDomainOptions.map(subDomain => {
            return <MenuItem key={subDomain} value={subDomain}>{subDomain}</MenuItem>
        })
        return (
            <div>
                <div id="container">
                    <Card >
                        <CardContent id="addCard">
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="appCode"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    label="Code de l'application"
                                    placeholder="Enter application code"
                                    onChange={this.handleChange}
                                    value={this.state.appCode}
                                />

                                <TextField
                                    name="appLabel"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    label="Libellé de l'application"
                                    placeholder="Enter title"
                                    onChange={this.handleChange}
                                    value={this.state.appLabel}
                                />

                                <TextField
                                    name="appComment"
                                    type="text"
                                    label="Application Description"
                                    placeholder="Description of the Application"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    onChange={this.handleChange}
                                    value={this.state.appComment}
                                />

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                >
                                    <InputLabel>Campus</InputLabel>
                                    <Select
                                        name="selectedCampus"
                                        value={this.state.selectedCampus}
                                        onChange={this.handleChange}
                                    >
                                        {campusesOptions}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                >
                                    <InputLabel>Domain</InputLabel>
                                    <Select
                                        name="Domain"
                                        value={this.state.selectedDomain}
                                        onChange={this.updateSubDomains}
                                    >
                                        {domainsOptions}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                >
                                    <InputLabel>Sous domaine</InputLabel>
                                    <Select
                                        name="selectedSubDomain"
                                        value={this.state.selectedSubDomain}
                                        onChange={this.handleChange}
                                    >
                                        {subDomainOptions}
                                    </Select>
                                </FormControl>

                                <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} >Submit</Button>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}