import React, { Component } from 'react';

import PairAppMachine from './pairAppMachine';

import { Select, FormControl, InputLabel, MenuItem, TextField, Button, Card, CardContent, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { createApplication } from '../../services/appliService';
import { get_domains } from '../../services/generalService';
import { get_vms } from '../../services/vmService';

export default class AddAppli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: "",
            label: "",
            comment: "",
            domains: [],
            selectedDomain: "",
            subDomains: {},
            selectedSubDomain: "",
            subDomainOptions: [],
            machines: [],
            pairedMachines: [{
                machine: '',
                service: ''
            }],
            newApplication: {
                code: '',
                label: '',
                appDomain: '',
                appSubDomain: '',
                comment: '',
                pairedMachines: []
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
                    this.setState({ selectedDomain: this.state.domains[1] })
                    this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[1]] }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
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

    filterMachines = (callback) => {
        let pairedMachines = this.state.pairedMachines;
        for (let pair of pairedMachines) {
            if (!pair.machine && !pair.service) pairedMachines.splice(pairedMachines.indexOf(pair), 1)
        }
        this.setState({ pairedMachines: pairedMachines }, callback);
    }

    // Upon submitting the form, do a form control to prevent empty fields
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.code.trim()) {
            alert("Please fill in the aplication code");
        } else if (!this.state.label.trim()) {
            alert("Please fill in the application label");
        } else {
            // if the form control is successful, send a post request to the server
            this.filterMachines(() => this.setState({
                newApplication: {
                    code: this.state.code,
                    label: this.state.label,
                    appDomain: this.state.selectedDomain,
                    appSubDomain: this.state.selectedSubDomain,
                    comment: this.state.comment,
                    pairedMachines: this.state.pairedMachines
                }
            }, () => createApplication(this.state.newApplication)
                .then(res => {
                    if (res.success) {
                        alert(res.msg)
                        // if the creation is done, hide the form to create the apps and reset all the values
                        // confirmAppSent allows the upper component to hide the new-app panel
                        this.props.confirmAppSent(this.state.newApplication)
                        // Reset the panel after app was created
                        this.setState({ selectedDomain: this.state.domains[1] })
                        this.setState({ subDomainOptions: this.state.subDomains[this.state.domains[1]] }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
                        this.setState({
                            code: '',
                            label: '',
                            comment: '',
                            pairedMachines: [],
                            newApplication: {
                                code: '',
                                label: '',
                                appDomain: '',
                                appSubDomain: '',
                                comment: '',
                                pairedMachines: [],

                            }
                        })
                    } else {
                        alert(res.msg)
                    }
                })))
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateSubDomains = (event) => {
        let selectedDomain = event.target.value
        this.setState({ selectedDomain: selectedDomain})
        let subDomainOptions = this.state.subDomains[selectedDomain]
        this.setState({ subDomainOptions: subDomainOptions }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
    }

    addPair = () => {
        let pairedMachines = this.state.pairedMachines;
        pairedMachines.push({ machine: '', service: '' });
        this.setState({ pairedMachines: pairedMachines });
    }

    deletePair = () => {
        let pairedMachines = this.state.pairedMachines;
        pairedMachines.pop();
        this.setState({ pairedMachines: pairedMachines });
    }

    updatePairedMachine = (key, machine, service) => {
        let pairedMachines = this.state.pairedMachines;
        pairedMachines[key] = {
            machine: machine,
            service: service
        }
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
                <PairAppMachine key={this.state.pairedMachines.indexOf(pair)} index={this.state.pairedMachines.indexOf(pair)} machines={this.state.machines} pair={pair} updatePairedMachine={this.updatePairedMachine.bind(this)} />
            )
        })

        return (
            <div>
                <div id="container">
                    <Card >
                        <CardContent id="addCard">
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="code"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    label="Code de l'application"
                                    placeholder="Obligatoire"
                                    onChange={this.handleChange}
                                    value={this.state.code}
                                />

                                <TextField
                                    name="label"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    label="Libellé de l'application"
                                    placeholder="Obligatoire"
                                    onChange={this.handleChange}
                                    value={this.state.label}
                                />

                                <TextField
                                    name="comment"
                                    type="text"
                                    label="Description"
                                    placeholder="Description de l'application"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    onChange={this.handleChange}
                                    value={this.state.comment}
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

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                >
                                    <Fab style={{ position: "absolute", right: "0px" }} size="small" color="primary" aria-label="Add a new pair vm/app" onClick={this.addPair.bind(this)}>
                                        <AddIcon />
                                    </Fab>
                                    <Fab style={{ position: "absolute", right: "50px" }} size="small" color="secondary" aria-label="Delete last pair vm/app" onClick={this.deletePair.bind(this)}>
                                        <DeleteIcon />
                                    </Fab>
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
