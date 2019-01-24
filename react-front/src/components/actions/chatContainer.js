import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {get_messages, sendChat} from '../../services/chatService';

class ChatContainer extends Component {

    state = { newMessage: '#' , messages: [], el: null, user: null};

    handleInputChange = e => {
        this.setState({ newMessage: e.target.value });
    };

    handleSubmit = () => {
        sendChat(this.state.newMessage)
        .then(message => {
            console.log(message.chat);
            const messages = this.state.messages.concat([message]);
            this.setState( {messages} );
        });
        this.setState({ newMessage: '' });
    };

    read(messages) {
        get_messages()
        .then(mes => {
            for (var e in mes) {
                if( this.props.tag === "general" ) {
                    const current_message = mes[e];
                    const messages = this.state.messages.concat([current_message]);
                    this.setState( {messages} );
                } else {
                    const tag = this.props.tag;
                    this.setState( { newMessage: '#' + tag})
                    const current_message = mes[e];
                    if (current_message.chat.indexOf(tag) !== -1 ) {
                        const messages = this.state.messages.concat([current_message]);
                        this.setState( {messages} );
                    }
                    
                }
                
            }
        })
    }

    componentWillMount() {
        this.read()
        console.log(localStorage.user);
        var user = localStorage.getItem('user');
        user = JSON.parse(user)
        console.log(user)
        this.setState( { user} );
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: "instant", block: "end" });
      }


    handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSubmit();
        }
    }
       

    render() {
        return (
        <div id="ChatContainer" className="chat-container">

                <Card >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                        Chat
                        </Typography>

                        <Typography color="textSecondary" gutterBottom>
                        # {this.props.tag}
                        </Typography>

                        <List dense style={{maxHeight: 200, overflow: 'auto'}} >
                            <div ref={el => { this.el = el; }}>
                            {this.state.messages.map(msg => (
                            <ListItem key={msg._id} className="message">
                                <ListItemText
                                primary={msg.chat}
                                secondary={this.state.user.mail}
                                />
                            </ListItem>
                            ))}
                            </div>
                        </List>

                    </CardContent>
                    <CardActions id="chat-input">
                    <TextField
                        onKeyDown={this.handleKeyDown.bind(this)}
                        placeholder="Add your message..."
                        value={this.state.newMessage}
                        onChange={this.handleInputChange.bind(this)}
                    />
                        <Button size="small" variant="contained" color="primary" onClick={this.handleSubmit.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                            Send &nbsp;
                            <Icon>send</Icon>
                        </Button>
                    </CardActions>
                </Card>
            
        </div>
        );
    }
}



export default ChatContainer;
