import React, { Component } from 'react';

import PairAppMachine from './pairAppMachine';

import { Select, FormControl, InputLabel, MenuItem, TextField, Button, Card, CardContent, Divider } from '@material-ui/core';

import { post_appli } from '../../services/appliService';
import { get_domains } from '../../services/generalService';
import { get_vms } from '../../services/vmService';

import './addAppli.css';


export default class AddAppli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appCode: "",
            appLabel: "",
            appComment: "",
            domains: [],
            selectedDomain: "",
            subDomains: {},
            selectedSubDomain: "",
            subDomainOptions: [],
            machines: [],
            pairedMachines: [{
                machine: 'testMachine',
                service: 'testService'
            }, {
                machine: 'testMachine2',
                service: 'testService2'
            }
            ],
            newApplication: {
                appCode: '',
                appLabel: '',
                appDomain: '',
                appSubDomain: '',
                comment: '',
                coupledMachines: []
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    getMachines() {
        get_vms().then(vmsList => this.setState({ machines: vmsList }))
            .catch(err => alert('There was an error loading the virtual machines.'))
    }

    componentWillMount() {
        this.get_domains();
        this.getMachines();
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
                    appDomain: this.state.selectedDomain,
                    appSubDomain: this.state.selectedSubDomain,
                    comment: this.state.appComment,
                    coupledMachines: this.state.pairedMachines
                }
            }, () => post_appli(this.state.newApplication)
                .then(res => {
                    if (res.success) {
                        alert(res.msg)
                        // if the creation is done, hide the form to create the apps and reset all the values
                        // confirmAppSent allows the upper component to hide the new-app panel
                        this.props.confirmAppSent(this.state.newApplication)
                        // Reset the panel after app was created
                        this.setState({ selectedDomain: this.state.domains[0] })
                        this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[0]] }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
                        this.setState({
                            appCode: '',
                            appLabel: '',
                            appComment: '',
                            pairedMachines: [],
                            newApplication: {
                                appCode: '',
                                appLabel: '',
                                appDomain: '',
                                appSubDomain: '',
                                comment: '',
                                coupledMachines: [],

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
        // Setting different options options
        let domainsOptions = this.state.domains.map(domain => {
            return <MenuItem key={domain} value={domain}>{domain}</MenuItem>
        })
        let subDomainOptions = this.state.subDomainOptions.map(subDomain => {
            return <MenuItem key={subDomain} value={subDomain}>{subDomain}</MenuItem>
        })

        let pairedMachines = this.state.pairedMachines.map(pair => {
            return (
                <div>
                    <PairAppMachine machines={this.state.machines} pair={pair} />
                    <Divider />
                </div>
            )
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
                                    placeholder="Obligatoire"
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
                                    placeholder="Obligatoire"
                                    onChange={this.handleChange}
                                    value={this.state.appLabel}
                                />

                                <TextField
                                    name="appComment"
                                    type="text"
                                    label="Description"
                                    placeholder="Description de l'application"
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
                                    <InputLabel>Domain</InputLabel>
                                    <Select
                                        name="Domaine"
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

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                >
                                    {pairedMachines}
                                </FormControl>

                                <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} >Ajouter l'application</Button>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}
