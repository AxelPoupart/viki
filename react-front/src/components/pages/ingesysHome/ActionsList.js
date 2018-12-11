import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddAction from './AddAction';
import { post_action,
    get_actionsBySearch,
    get_actionsByAppli,
    get_actionsByUser,
    get_actionById,
    delete_actionById,
    get_actions } from '../../../services/ActionService';



class ActionList extends Component {

    state = { actions: [], hide: false}



    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState( {hide} ); 
    };

    handleSubmitAction = act => {
        console.log(act);
        const actions = this.state.actions.concat([{Label: act.Label, _id: act._id}]);
        this.setState( {actions} );
    };

    displayAdd() {
        if (this.state.hide) {
            return <AddAction onSubmit={this.handleSubmitAction} actions={this.state.actions} />
        } 
    }

    display_actions() {
        get_actions().then(act => {
            for (var e in act) {
                const current_action = act[e];
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

    componentWillMount() {
        this.display_actions()
      }




    render() {
        return (
            <div id="ChatContainer" className="chat-container">

                <div id="action-list">
                    <Table responsive bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Action Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.actions.map(act => (
                            <tr key={act._id} className="actions">
                                <td>{act._id}</td>
                                <td>{act.Label}</td>
                                <td><Button bsStyle="danger" className="red" value="DeleteAction" onClick={() => this.suppress_action(act._id)}><strong>X</strong></Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                
                <div id="add-action">
                    <button className="red" value="AddAction" onClick={this.handleAdd.bind(this)}>
                        Add
                    </button>
                </div>
                    <div id="add-act" >
                    {this.displayAdd()}
                </div>


            </div>
        );
    }
}


export default ActionList
