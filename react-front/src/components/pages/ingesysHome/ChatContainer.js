import React, { Component } from 'react';




class ChatContainer extends Component {

    state = { newMessage: '' };

    handleInputChange = e => {
        this.setState({ newMessage: e.target.value });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.newMessage);
        this.setState({ newMessage: '' });
    };

    handleLogout = (event) => {
        //firebase.auth().signOut();
        //this.props.history.push('/login');
    };

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSubmit();
        }
    }
       

    render() {
        return (
        <div id="ChatContainer" className="chat-container">
            

            <div id="message-container">
                <div className="message">
                    {this.props.messages.map(msg => (
                        <div key={msg.id} className="message">
                            <p>{msg.msg}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id="chat-input">
                <textarea placeholder="Add your message..."
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDown}
                    value={this.state.newMessage} />
                <button onClick={this.handleSubmit}>
                    Send
                </button>
            </div>
        </div>
        );
    }
}



export default ChatContainer;
