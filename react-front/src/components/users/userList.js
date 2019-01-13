import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
    getByStatus,
    getUsers,
    changeUserStatus
} from '../../services/userService.js'

import './userList.css';


class UserList extends Component {

    state = { users: [], switch: "users"}


    displayIngesys() {
        const users = [];
        this.setState( {users} );
        getByStatus("ingesys").then(inge => {
            for (var e in inge) {
                const currentUser = inge[e];
                const users = this.state.users.concat([currentUser]);
                this.setState( {users} );
            }
        })
    }

    displayAll() {
        const users = [];
        this.setState( {users} );
        getUsers().then(inge => {
            for (var e in inge) {
                const currentUser = inge[e];
                console.log(currentUser);
                const users = this.state.users.concat([currentUser]);
                this.setState( {users} );
            }
        })
    }

    handleSwitch() {
        const users = [];
        this.setState( {users} );
        if (this.state.switch === "users") {
            const elemt = "ingesys"
            this.setState( {switch: elemt} )
            this.displayAll()
        } else { 
            const elemt = "users"
            this.setState( {switch: elemt} )
            this.displayIngesys()
        }
    }

    promoteUser(id, dir, status) {


        if (dir === 'up' && status === 'ingesys') {
            return changeUserStatus(id, 'admin')
                .then(this.displayAll())
        } else if (dir === 'up' && status === 'user') {
            return changeUserStatus(id, 'ingesys')
                .then(this.displayIngesys())
        } else if (dir === 'down' && status === 'ingesys') {
            return changeUserStatus(id, 'user')
                .then(this.displayAll())
        } else if (dir === 'down' && status === 'admin') {
            return changeUserStatus(id, 'ingesys')
                .then(this.displayIngesys())
        }
        
    }




    componentWillMount() {
        this.displayIngesys()
    }




    render() {
        return (
            <div className="users">

                <div className="view">
                    <Button onClick={this.handleSwitch.bind(this)}>
                        See all {this.state.switch}
                    </Button>
                </div>

                <Divider />

                <div className="ingesysList">
                    {this.state.users.map(inge => (
                        <div key={inge._id}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                <Typography>{inge.name} &nbsp;</Typography>

                                <Typography>&nbsp; {inge.status}</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Typography>
                                    {inge.mail} &nbsp; &nbsp; &nbsp; &nbsp;
                                </Typography>

                                <Button onClick={(e => this.promoteUser(inge._id, 'up', inge.status))} variant="contained" > Promote </Button>
                                <Button onClick={e => this.promoteUser(inge._id, 'down', inge.status)} variant="contained" > Downgrade </Button>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}


export default UserList
