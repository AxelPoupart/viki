import React, { Component } from 'react';

import Navbar from '../../navbar/navbar';
import ChatContainer from './ChatContainer';
import ActionList from './ActionsList';


class Ingesys extends Component {

  state = { user: null, messages: [], actions: []  }

  handleSubmitMessage = msg => {
      // Send to database
      console.log(msg);
      const messages = this.state.messages.concat([{msg: msg, id: msg}]);
      this.setState( {messages} );
  };



  handleLogout = (event) => {
      this.props.history.push('/login');

  }


  render() {
      return  (
        <div>

          <div id="navbar">
              <Navbar />
          </div>

          <div id="container" className="inner-container">
              <ChatContainer onSubmit={this.handleSubmitMessage} messages={this.state.messages} />
          </div>

          <div id="container" className="action-container">
              <ActionList /> 
          </div>

        </div>
      );
  } 

}

export default Ingesys;
