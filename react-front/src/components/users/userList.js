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

    state = { users: [], switch: "visiteur"}


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
            const elemt = "ingesys"
            this.setState( {switch: elemt} )
            this.display_by_privilege("ingesys")
        }

    }

    promoteUser(id, dir, privilegesiD) {


        if (dir === 'up' && privilegesiD == '2') {
            return changeUserPrivilege(id, 'sysadmin')
            .then(()=>{this.setState( {switch: "sysadmin"} );setTimeout(this.display_by_privilege('sysadmin'),100)})
        } else if (dir === 'up' && privilegesiD == '3') {
            return changeUserPrivilege(id, 'ingesys')
            .then(()=>{this.setState( {switch: "ingesys"} );setTimeout(this.display_by_privilege('ingesys'),100)})
        } else if (dir === 'down' && privilegesiD == '2') {
            return changeUserPrivilege(id, 'visiteur')
                .then(()=>{this.setState( {switch: "visiteur"} );setTimeout(this.display_by_privilege('visiteur'),100)})
        } else if (dir === 'down' && privilegesiD == '1') {
            return changeUserPrivilege(id, 'ingesys')
            .then(()=>{this.setState( {switch: "ingesys"} );setTimeout(this.display_by_privilege('ingesys'),100)})
        } else alert("not possible");
        
    }




    componentWillMount() {
        this.display_by_privilege('visiteur')
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

                                <Typography>{user.mail} &nbsp;</Typography>

                                <Typography>&nbsp; {user.privilege}</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Typography>
                                     User ID {user._id} &nbsp; &nbsp; &nbsp; &nbsp;
                                </Typography>

                                <Button onClick={(e => this.promoteUser(user._id, 'up', user.privilegesId))} variant="contained" > Promote </Button>
                                <Button onClick={e => this.promoteUser(user._id, 'down', user.privilegesId)} variant="contained" > Downgrade </Button>

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
