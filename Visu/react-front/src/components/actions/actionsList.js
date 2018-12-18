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
import Checkbox from '@material-ui/core/Checkbox';

import AddAction from './addAction';

import { 
    delete_actionById,
    get_actions,
    changeActionStatus,
    getActionsByStatus
} from '../../services/actionService.js'

import './actionList.css';


class ActionList extends Component {

    state = { actions: [], hide: false}



    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState( {hide} ); 
    };

    handleSubmitAction = act => {
        console.log(act);
        const actions = this.state.actions.concat([act]);
        this.setState( {actions} );
    };

    displayAdd() {
        if (this.state.hide && this.props.variant === "progress") {
            return (
                <div>
                    <Button color="primary" onClick={e => {this.setState({hide: false});}}>Cancel</Button>
                    <AddAction onSubmit={this.handleSubmitAction} actions={this.state.actions} />
                </div>
            )
        } else if (this.props.variant === "progress") { 
            return (
                <Fab color="primary" aria-label="Add" onClick={this.handleAdd.bind(this)}>
                    <AddIcon />
                </Fab>
            )
        }
    }

    prom(act) {
        for (var e in act) {
            const current_action = act[e];
            console.log(current_action);
            const actions = this.state.actions.concat([current_action]);
            this.setState( {actions} );
        }
    }

    display_actions() {
        let actions = [];
        this.setState( {actions} );
        if (this.props.variant ===  "progress") {
            getActionsByStatus("In Progress")
                .then(act => this.prom(act));
        } else if (this.props.variant ===  "done") {
            getActionsByStatus("Done")
                .then(act => this.prom(act));
        }
        getActionsByStatus().then(act => {
            for (var e in act) {
                const current_action = act[e];
                console.log(current_action);
                const actions = this.state.actions.concat([current_action]);
                this.setState( {actions} );
            }
        })
    }

    suppress_action(key) {
        delete_actionById(key)
        .then(res => {
            this.setState( {actions: []} );
            this.display_actions() 
        })
    }
    


    handleChangeStatus(e, id, status) {
        console.log(e.target.checked)
        if (e.target.checked) {
            changeActionStatus(id, "Done")
                .then(this.display_actions());  
        } else { 
            changeActionStatus(id, "In Progress")
                .then(this.display_actions());
        }
    }

    componentWillMount() {
        this.display_actions()
    }




    render() {
        return (
            <div id="action">

                <div id="action-list">
                    {this.state.actions.map(act => (
                        <div key={act._id}>
                        <ExpansionPanel key={act._id}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                <Typography>{act.Label} &nbsp; &nbsp; &nbsp; &nbsp;</Typography>

                                <Typography>{act.Status}</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Typography>
                                    {act.Comment}
                                </Typography>

                                <Checkbox
                                    checked={(act.Status === "Done")}
                                    onChange={(e => this.handleChangeStatus(e, act._id, act.Status))}
                                    value="checkedG"
                                    color="green"
                                />

                                <IconButton aria-label="Delete" variant="contained" color="secondary" style={{float: "right" }} onClick={() => this.suppress_action(act._id)}>
                                    <DeleteIcon />
                                </IconButton>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </div>
                    ))}
                </div>

                <div id="action-add" >
                    {this.displayAdd()}
                </div>
                

            </div>
        );
    }
}


export default ActionList
