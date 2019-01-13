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
    delete_appliById,
    get_applisBySearch } from '../../services/appliService.js'

import './appliSearch.css';

class AppliSearch extends Component {

    state = { applis: [], term: ""}

    handleChange(e) {
        const term = e.target.value
        this.setState({ term })
        const applis = [];
        this.setState( {applis} );
        if(term !== "" ) {
            get_applisBySearch(term).then(appli => {
                for (var e in appli) {
                    const current_appli = appli[e];
                    const applis = this.state.applis.concat([current_appli]);
                    this.setState( {applis} );
                }
            })
        }
    }

    suppress_appli(key) {
        delete_appliById(key)
        .then(res => {
            this.setState( {appli: []} );
            this.display_applis() 
        })
    }


    render() {
        return (
            <div id="appli-search">

                <div id="SearchBar">
                    <div>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        name="term"
                        onChange={this.handleChange.bind(this)}
                        margin="normal"
                        value={this.state.term}
                    />
                </div>
                
                {this.state.applis.map(appli => (
                    <div key={appli._id}>
                    <ExpansionPanel key={appli._id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{appli.Label}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {appli.Comment}.
                            </Typography>
                            <IconButton aria-label="Delete" variant="contained" color="secondary" style={{float: "right" }} onClick={() => this.suppress_v(appli._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    </div>
                ))}
            </div>
        );
    }
}


export default AppliSearch