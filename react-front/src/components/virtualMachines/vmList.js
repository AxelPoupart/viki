import React, { Component } from 'react';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Pagination from 'react-js-pagination';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import AddVm from './addVm';

import { delete_vmById, get_vms } from '../../services/vmService.js'

import './vmList.css';

class VmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vms: [],
            hide: false,
            activePage: 1,
            itemsPerPage: 10
        }
    }

    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState({ hide });
    };

    handleSubmitVm = vm => {
        console.log(vm);
        const vms = this.state.vms.concat([vm]);
        this.setState({ vms });
    };

    displayAdd() {
        if (this.state.hide) {
            return (
                <div>
                    <Button color="primary" onClick={e => { this.setState({ hide: false }); }}>Cancel</Button>
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
        let vmList = []
        get_vms()
            .then(vms => {
                for (let vm of vms) {
                    vmList.push(vm);
                }
            })
            .then(() => this.setState({ vms: vmList }))
    }

    deleteMachine(key) {
        delete_vmById(key)
            .then(res => {
                this.setState({ vm: [] });
                this.display_vms()
            })

    }

    componentWillMount() {
        this.display_vms()
    }


    render() {
        let pageItems = [];
        for (let i = (this.state.activePage - 1) * this.state.itemsPerPage; i < this.state.activePage * this.state.itemsPerPage + 1; i++) {
            if (i < this.state.vms.length) pageItems.push(this.state.vms[i])
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ alignSelf: 'center', width: '90%' }}>
                    {pageItems.map(vm => (
                        <div key={vm._id}>
                            <ExpansionPanel key={vm._id}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{vm.label}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <Typography>
                                            {'Stratégie de sauvegarde: ' + vm.backupPolicy}
                                        </Typography>
                                    </div>
                                    <div style={{ alignSelf: "flex-end", margin: '10px' }}>
                                        <Fab
                                            variant="extended"
                                            size="small"
                                            color="secondary"
                                            aria-label="Delete"
                                            onClick={() => this.deleteMachine(vm._id)}
                                        >
                                            <DeleteIcon />
                                            Supprimer
                                            </Fab>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    ))}
                </div>

                <div style={{ alignSelf: 'center', marginTop: '15px' }}>
                    <Pagination
                        prevPageText="prev"
                        nextPageText="next"
                        firstPageText="first"
                        lastPageText="last"
                        activeClass="activate"
                        pageRangeDisplayed={10}
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsPerPage}
                        totalItemsCount={this.state.vms.length}
                        onChange={(pageNumber) => this.setState({ activePage: pageNumber })}
                    />
                </div>

                <div id="vm-add" >
                    {this.displayAdd()}
                </div>


            </div>
        );
    }
}


export default VmList
