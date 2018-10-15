import React, { Component } from 'react';
import ChatContainer from './ChatContainer';
import './app.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import ActionList from './ActionsList';





class ingesysAccueil extends Component {

    state = { user: null, messages: [], actions: []  }

    handleSubmitMessage = msg => {
        // Send to database
        console.log(msg);
        const messages = this.state.messages.concat([{msg: msg, id: msg}]);
        this.setState( {messages} );
    };

    handleSubmitAction = act => {
        // Send to database
        console.log(act);
        const actions = [{act: 'An action', id: 1}, {act: 'An other action', id: 2}]
        this.setState( {actions} );
    };


    render() {
        return  (
            <div>
            <div id="navbar">
                <Header>
                    <Link to="/login">
                        <button className="red" onClick={this.handleLogout}>
                            Logout
                        </button>
                    </Link>
                </Header>
            </div>
            <div id="inline">
            <div id="container" className="inner-container">
                <ChatContainer onSubmit={this.handleSubmitMessage}
                    messages={this.state.messages}
                />
            </div>

            <div id="container" className="action-container">
                <ActionList onSubmit={this.handleSubmitAction}
                    actions={this.state.actions}
                /> 
            </div>
            </div>
            </div>
        );
    } 

}

export default ingesysAccueil;
