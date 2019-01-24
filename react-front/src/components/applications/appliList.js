import React from 'react';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Pagination from 'react-js-pagination';

import AddAppli from './addAppli';

import { deleteApplication, getApplications } from '../../services/appliService.js'

import './appliList.css';


class AppliList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applis: [],
            hide: false,
            activePage: 1,
            itemsPerPage: 10
        };
        this.redirectToApp = this.redirectToApp.bind(this);

    }

    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState({ hide });
    };

    confirmAppSent = appli => {
        this.setState({ hide: false });
        const applis = this.state.applis
        applis.push(appli)
        this.setState({ applis: applis });
    };

    displayAdd() {
        if (this.state.hide) {
            return (
                <div>
                    <Button color="primary" onClick={e => { this.setState({ hide: false }); }}>Cancel</Button>
                    <AddAppli applis={this.state.applis} confirmAppSent={this.confirmAppSent.bind(this)} />
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

    getApplications() {
        getApplications().then(applis => {
            this.setState({ applis: applis })
            this.props.exportApps(applis)
        })
    }

    deleteApp(key) {
        if (window.confirm("Attention: En supprimant l'application vous perderez tous les services associés. Confirmez vous votre choix ?")) {
            deleteApplication(key)
                .then(res => {
                    if (res) {
                        if (res.success) {
                            let updatedList = this.state.applis
                            updatedList = updatedList.filter(app => app._id !== key)
                            this.setState({ applis: updatedList })
                        } else alert(res.msg);
                    }
                })
        }
    }

    componentWillMount() {
        this.getApplications()
    }

    redirectToApp(_id) {
        window.location.replace(`/applis/${_id}`);
    }

    render() {
        let pageItems = [];
        for (let i = (this.state.activePage - 1) * this.state.itemsPerPage; i < this.state.activePage * this.state.itemsPerPage + 1; i++) {
            if (i < this.state.applis.length) pageItems.push(this.state.applis[i])
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                <div style={{ alignSelf: 'center', width: '90%' }}>
                    {pageItems.map(appli => (
                        <div key={appli._id}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{appli.label}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <div>
                                            <Typography>
                                                {(appli.comment) ? appli.comment : "-Pas de commentaire-"}
                                            </Typography>
                                        </div>
                                        <div style={{ alignSelf: "flex-end", margin: '10px' }}>
                                            <Fab
                                                variant="extended"
                                                size="small"
                                                color="primary"
                                                aria-label="Details"
                                                onClick={() => this.redirectToApp(appli._id)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                <Icon>edit_icon</Icon>
                                                Détails
                                            </Fab>
                                            <Fab
                                                variant="extended"
                                                size="small"
                                                color="secondary"
                                                aria-label="Delete"
                                                onClick={() => this.deleteApp(appli._id)}
                                            >
                                                <DeleteIcon />
                                                Supprimer
                                            </Fab>
                                        </div>
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
                        totalItemsCount={this.state.applis.length}
                        onChange={(pageNumber) => this.setState({ activePage: pageNumber })}
                    />
                </div>

                <div className="addAppli">
                    {this.displayAdd()}
                </div>


            </div>
        );
    }
}


export default AppliList
