import React, { Component } from 'react';

import { Select, FormControl, InputLabel, MenuItem, TextField, Button, Fab } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import ActionList from '../actions/actionsList';
import ChatContainer from '../actions/chatContainer';
import PairAppMachine from './pairAppMachine';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { getApplicationById, getPairedMachines } from '../../services/appliService'
import { get_domains } from '../../services/generalService';
import './appliDetail.css'

export default class AppliDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            application: {},
            domains: [],
            selectedDomain: "",
            subDomains: [],
            selectedSubDomain: "",
            subDomainOptions: [],
            comment: "",
            pairedMachines: []
        }
        this.getApplication = this.getApplication.bind(this)
        this.getDomains = this.getDomains.bind(this)
        this.updateSubDomains = this.updateSubDomains.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getPairedMachines = this.getPairedMachines.bind(this)
        this.addPair = this.addPair.bind(this)
        this.deletePair = this.deletePair.bind(this)
    }

    getDomains() {
        get_domains()
            .then(res => {
                this.setState({
                    domains: res.filter(item => item._id === item.parentId),
                    subDomains: res.filter(item => item._id !== item.parentId)
                }, () => {
                    this.setState({ selectedSubDomain: this.state.subDomains.find(item => item._id === this.state.application.domainId) }, () => {
                        this.setState({ selectedDomain: this.state.domains.find(item => item._id === this.state.selectedSubDomain.parentId) }, () => {
                            this.setState({ subDomainOptions: this.state.subDomains.filter(item => item.parentId === this.state.selectedDomain._id).map(item => item.label) }, () => {
                                this.setState({
                                    selectedSubDomain: this.state.selectedSubDomain.label,
                                    selectedDomain: this.state.selectedDomain.label
                                })
                            })
                        })
                    })
                })
            })
    }

    getPairedMachines = () => {
        getPairedMachines(this.state.application._id)
            .then(res => {
                if (res.success) {
                    this.setState({ pairedMachines: res.pairedMachines })
                } else {
                    alert(res.msg);
                }
            })
    }

    getApplication = (appId, callback1, callback2) => {
        getApplicationById(appId)
            .then(res => {
                if (res.success) {
                    this.setState({ application: res.application, comment: res.application.comment ? res.application.comment : "" }, () => {
                        callback1();
                        callback2();
                    })
                } else {
                    alert(res.msg)
                }
            })
    }

    updateSubDomains = (event) => {
        let selectedDomain = event.target.value
        this.setState({ selectedDomain: selectedDomain })
        let mainDomain = this.state.domains.find(item => item.label === selectedDomain)
        let subDomainOptions = this.state.subDomains.filter(item => item.parentId === mainDomain._id).map(item => item.label)
        this.setState({ subDomainOptions: subDomainOptions }, () => this.setState({ selectedSubDomain: this.state.subDomainOptions[0] }))
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updatePairedMachine = (key, machine, service) => {
        let pairedMachines = this.state.pairedMachines;
        pairedMachines[key] = {
            machine: machine,
            service: service
        }
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

    componentWillMount() {
        let location = window.location.pathname.split('/');
        let appId = location[location.length - 1];
        this.getApplication(appId,
            this.getPairedMachines, this.getDomains);
    }


    render() {
        let domainsOptions = this.state.domains.map(domain => {
            return <MenuItem key={domain._id} value={domain.label}>{domain.label}</MenuItem>
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
                <Navbar page={'Gestion des applications: ' + this.state.application.label} />
                <div className="information">
                    <div className="info">
                        <TextField
                            disabled
                            value={`Code: ${this.state.application.code}`}
                            fullWidth
                            margin="normal"
                            variant="outlined"
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

                        <TextField
                            name='comment'
                            label="Commentaire"
                            multiline
                            value={this.state.comment}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                        />
                    </div>
                    <div className="chat">
                        <ChatContainer tag={this.state.application.label} />
                    </div>
                    <div className="machines">
                        <h3>Paired machines/services</h3>
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
                    </div>
                    <div className="doneActions">
                        <h3>Completed actions</h3>
                        <ActionList variant="done" tag={this.state.application._id} />
                    </div>
                    <div className="inProgressActions">
                        <h3>Actions in progress</h3>
                        <ActionList variant="progress" tag={this.state.application._id} />
                    </div>
                </div>
            </div>


        );
    }



}