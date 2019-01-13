import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AddVm from './addVm';

import { 
    delete_vmById,
    get_vms } from '../../services/vmService.js'

import './vmList.css';


class VmList extends Component {

    state = { vms: [], hide: false}

    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState( {hide} ); 
    };

    handleSubmitVm = vm => {
        console.log(vm);
        const vms = this.state.vms.concat([vm]);
        this.setState( {vms} );
    };

    displayAdd() {
        if (this.state.hide) {
            return (
                <div>
                    <Button color="primary" onClick={e => {this.setState({hide: false});}}>Cancel</Button>
                    <AddVm onSubmit={this.handleSubmitVm} vms={this.state.vms} />
                </div>
            )
        } else { 
            return (
                <Fab color="primary" aria-label="Add" onClick={this.handleAdd.bind(this)}>
                    <AddIcon />
                </Fab>
            )
        }
    }

    display_vms() {
        get_vms().then(vm => {
            for (var e in vm) {
                const current_vm = vm[e];
                console.log(current_vm);
                const vms = this.state.vms.concat([current_vm]);
                this.setState( {vms} );
            }
        })
    }

    suppress_vm(key) {
        delete_vmById(key)
        .then(res => {
            this.setState( {vm: []} );
            this.display_vms() 
        })

    }

    componentWillMount() {
        this.display_vms()
      }


    render() {
        return (
            <div id="vm">

                <div id="vm-list">
                    {this.state.vms.map(vm => (
                        <div key={vm._id}>
                        <ExpansionPanel key={vm._id}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{vm.Label}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {vm.Comment}
                                </Typography>
                                <IconButton aria-label="Delete" variant="contained" color="secondary" style={{float: "right" }} onClick={() => this.suppress_vm(vm._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </div>
                    ))}
                </div>

                <div id="vm-add" >
                    {this.displayAdd()}
                </div>
                

            </div>
        );
    }
}


export default VmList