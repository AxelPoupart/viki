import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {
    getByPrivilege,
    getUsers,
    changeUserPrivilege
} from '../../services/userService.js'

import './userList.css';



class UserList extends Component {

    state = { users: [], switch: "users"}


    display_by_privilege(privilege) {
        const users = [];
        this.setState( {users} );
        getByPrivilege(privilege).then(user => {
            for (var e in user) {
                const currentUser = user[e];
                const users = this.state.users.concat([currentUser]);
                this.setState( {users} );
            }
        })
    }

    displayAll() {
        const users = [];
        this.setState( {users} );
        getUsers().then(user => {
            for (var e in user) {
                const currentUser = user[e];
                console.log(currentUser);
                const users = this.state.users.concat([currentUser]);
                this.setState( {users} );
            }
        })
    }

    handleSwitch() {
        
        
        if (this.state.switch === "users") {
            const elemt = "ingesys"
            this.setState( {switch:elemt} )
            this.display_by_privilege("ingesys")
        } else if (this.state.switch === "ingesys") { 
            const elemt = "visiteur"
            this.setState( {switch: elemt} )
            this.display_by_privilege("visiteur")
        } else if (this.state.switch === "visiteur") { 
            const elemt = "sysadmin"
            this.setState( {switch: elemt} )
            this.display_by_privilege("sysadmin")
        } else  { 
            const elemt = "users"
            this.setState( {switch: elemt} )
            this.displayAll()
        }

    }

    promoteUser(id, dir, status) {


        if (dir === 'up' && status === 'usersys') {
            return changeUserPrivilege(id, 'admin')
                .then(this.displayAll())
        } else if (dir === 'up' && status === 'user') {
            return changeUserPrivilege(id, 'usersys')
                .then(this.display_by_privilege())
        } else if (dir === 'down' && status === 'usersys') {
            return changeUserPrivilege(id, 'user')
                .then(this.displayAll())
        } else if (dir === 'down' && status === 'admin') {
            return changeUserPrivilege(id, 'usersys')
                .then(this.display_by_privilege())
        }
        
    }




    componentWillMount() {
        this.displayAll()
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
                    {this.state.users.map(user => (
                        <div key={user._id}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                <Typography>{user.name} &nbsp;</Typography>

                                <Typography>&nbsp; {user.status}</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Typography>
                                    {user.mail} &nbsp; &nbsp; &nbsp; &nbsp;
                                </Typography>

                                <Button onClick={(e => this.promoteUser(user._id, 'up', user.status))} variant="contained" > Promote </Button>
                                <Button onClick={e => this.promoteUser(user._id, 'down', user.status)} variant="contained" > Downgrade </Button>

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
