import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import UserContainer from './UserContainer';
import IngesysAccueil from './IngesysAccueil';
import './app.css';

class App extends Component {

    state = { user: null, messages: [], msg: null }

    /*
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.props.history.push('/login')
            }
        })
    }

    firebase
        .database()
        .ref('/messages')
        .on('value', snapshot => {
            console.log(snapshot.val());
            this.onMessage(snapshot);
        });
    
    onMessage = snapshot => {
        const messages = Object.keys(snapshot.val()).map(key => {
            const msg = snapshot.val()[key];
            msg.id = key;
            return msg;
        });
        console.log(messages);
        this.setState({ messages });
    };

    */

    handleSubmitMessage = msg => {
        // Send to database
        console.log(msg);
        const messages = this.state.messages.concat([{msg: msg, id: msg}]);
        this.setState( {messages} );
    };


    render() {
        return  (
            <div>
            <Route exact= {true} path="/login" component={LoginContainer} />
          <div>
            <Route exact={true} path="/" component={IngesysAccueil}/>
            <Route path="/users/:id" component={UserContainer} />
          </div>
          </div>
        );
    }  
}



export default withRouter(App);
