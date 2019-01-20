import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import { 
    delete_vmById,
    get_vmsBySearch } from '../../services/vmService.js'

import './vmSearch.css';

class VmSearch extends Component {

    state = { vms: [], term: ""}

    handleChange(e) {
        const term = e.target.value
        this.setState({ term })
        const vms = [];
        this.setState( {vms} );
        if(term !== "" && term.length > 2 ) {
            get_vmsBySearch(term).then(vm => {
                for (var e in vm) {
                    const current_vm = vm[e];
                    const vms = this.state.vms.concat([current_vm]);
                    this.setState( {vms} );
                }
            })
        }
    }

    suppress_vm(key) {
        delete_vmById(key)
        .then(res => {
            this.setState( {vm: []} );
            this.display_vms() 
        })
    }


    render() {
        return (
            <div id="vm-search">

                <div id="SearchBar">
                    <div>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        name="term"
                        onChange={this.handleChange.bind(this)}
                        margin="dense"
                        value={this.state.term}
                    />
                </div>
                
                {this.state.vms.map(vm => (
                    <div key={vm._id}>
                    <ExpansionPanel key={vm._id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{vm.label}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Typography>
                                    {'Emplacement de la VM: ' + vm.campus}
                                </Typography>
                
                                <Typography>
                                    {vm.filePath}
                                </Typography>
                      
                                <Typography>
                                    {' Stratégie de sauvegarde: ' + vm.backupPolicy}
                                </Typography>
                                <IconButton aria-label="Delete" variant="contained" color="secondary" style={{float: "right" }} onClick={() => this.suppress_vm(vm._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    </div>
                ))}
            </div>
        );
    }
}


export default VmSearch