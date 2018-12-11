import React, { Component } from 'react';

import Navbar from '../../navbar/navbar';
import ChatContainer from './ChatContainer';
import ActionList from './ActionsList';

import './ingesys.css';

class Ingesys extends Component {

  state = { user: null, messages: [], actions: []  }

  handleSubmitMessage = msg => {
      // Send to database
      console.log(msg);
      const messages = this.state.messages.concat([{_id: msg, chat: msg}]);
      this.setState( {messages} );
  };

  componentWillMount() {
    this.get_messages()
  }

  get_messages() {
    console.log('GET message')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
    }
    return fetch(`http://localhost:5000/content-dev/chat-back`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(mes => {
            for (var e in mes) {
                const current_message = mes[e];
                const messages = this.state.messages.concat([current_message]);
                this.setState( {messages} );
            }
        })
  }




  handleLogout = (event) => {
      this.props.history.push('/login');
  }


  render() {
      return  (
        <div>

          <div id="navbar">
              <Navbar />
          </div>

            <div id="home_global">
                <div id="chat">
                    <ChatContainer onSubmit={this.handleSubmitMessage} messages={this.state.messages.slice(-10)} />
                </div>
                <div id="actions">
                    <ActionList /> 
                </div>

            </div>
          

          

        </div>
      );
  } 

}

export default Ingesys;
