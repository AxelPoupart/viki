import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddAction from './AddAction';




class ActionList extends Component {

    state = { actions: [], hide: false}



    handleAdd = (e) => {
        const hide = !this.state.hide;
        this.setState( {hide} );
        
    };

    handleSubmitAction = act => {
        console.log(act);
        const actions = this.state.actions.concat([{title: act.title, id: act.code}]);
        this.setState( {actions} );
    };

    displayAdd() {
        if (this.state.hide) {
            return <AddAction onSubmit={this.handleSubmitAction} actions={this.state.actions} />
        } 
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
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.actions.map(act => (
                            <tr key={act.id} className="actions">
                                <td>{act.id}</td>
                                <td>{act.title}</td>
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
                    {this.displayAdd()
                    }
                
                </div>


            </div>
        );
    }
}


export default ActionList
