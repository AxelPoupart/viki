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

import AddAppli from './addAppli';

import {
    delete_appliById,
    get_applis
} from '../../services/appliService.js'

import './appliList.css';


class AppliList extends Component {

    state = { applis: [], hide: false }

    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState({ hide });
    };

    confirmAppSent = appli => {
        console.log(appli);
        this.setState({ hide: false });
        const applis = this.state.applis.concat([appli]);
        this.setState({ applis });
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

    display_applis() {
        get_applis().then(applis => {
            if (applis) {
                for (const e of applis) {
                    const current_appli = e;
                    console.log(current_appli);
                    const newApplis = this.state.applis.concat([current_appli]);
                    this.setState({ applis: newApplis });
                }
            }
        })
    }

    suppress_appli(key) {
        delete_appliById(key)
            .then(res => {
                this.setState({ appli: [] });
                this.display_applis()
            })

    }

    componentWillMount() {
        this.display_applis()
    }


    render() {
        return (
            <div id="appli">

                <div id="appli-list">
                    {this.state.applis.map(appli => (
                        <div key={appli._id}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{appli.Label}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        {appli.Comment}
                                    </Typography>
                                    <IconButton aria-label="Delete" variant="contained" color="secondary" style={{ float: "right" }} onClick={() => this.suppress_appli(appli._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    ))}
                </div>

                <div id="appli-add" >
                    {this.displayAdd()}
                </div>


            </div>
        );
    }
}


export default AppliList
