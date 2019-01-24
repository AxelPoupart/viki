import React from 'react';
import { Dialog, DialogTitle, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { getPairedApplications } from '../../services/vmService';
import { getApplications } from '../../services/appliService';

export default class MachineDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apps: [],
            pairs: null
        }
        this.handleClose = this.handleClose.bind(this)
        this.getPairedApps = this.getPairedApps.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClose() {
        this.setState({ pairs: null })
        this.props.onClose()
    }

    getPairedApps() {
        getPairedApplications(this.props.machine._id)
            .then(res => {
                if (res) {
                    if (res.success) {
                        let pairs = []
                        for (let pair of res.pairedApps) {
                            let appLabel = this.state.apps.find(item => item._id === pair.applicationId)
                            if (appLabel) {
                                appLabel = appLabel.label
                                let service = pair.runningService
                                pairs.push({ appLabel: appLabel, service: service })
                            }
                        }
                        this.setState({ pairs: pairs })
                    } else alert(res.msg)
                }
            })
    }

    handleClick(e) {
        e.preventDefault();
        let appLabel = e.target.name
        let appId = this.state.apps.find(item => item.label === appLabel)._id
        window.location.replace(`/applis/${appId}`);
    }

    componentWillMount() {
        getApplications().then(applis => {
            this.setState({ apps: applis })
        })
    }

    render() {
        if (this.props.machine) {
            if (!this.state.pairs) {
                this.getPairedApps(this.props.machine._id)
            }
        }

        let pairs = null
        if (this.state.pairs) {
            pairs = (
                <div style={{margin:'20px auto'}}>
                    <h4 style={{textAlign: 'center'}}>Les applications associées</h4>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Application</TableCell>
                                <TableCell align='left'>Service</TableCell>
                                <TableCell align='left'>Détails sur l'application</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.pairs.map(pair => {
                                return (<TableRow key={this.state.pairs.indexOf(pair)}>
                                    <TableCell align='left'>{pair.appLabel}</TableCell>
                                    <TableCell align='left'>{pair.service}</TableCell>
                                    <TableCell align='center'>
                                        <button name={pair.appLabel} onClick={this.handleClick}>Détails</button>
                                    </TableCell>
                                </TableRow>)
                            }
                            )}
                        </TableBody>
                    </Table>
                </div>
            )
        }
        return (
            <div>
                <Dialog onClose={this.handleClose} open={this.props.open}>
                    <DialogTitle style={{textAlign: 'center'}}>{`Détails - ${this.props.machine.label}`}</DialogTitle>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Campus</TableCell>
                                    <TableCell align='left'>Stratégie de sauvegarde</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='left'>{this.props.machine.campus}</TableCell>
                                    <TableCell align='left'>{this.props.machine.backupPolicy}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {pairs}
                    </div>
                </Dialog>
            </div>
        )
    }
}