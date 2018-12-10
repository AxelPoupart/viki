import React, { Component } from 'react';




class ChatContainer extends Component {

    state = { newMessage: '' };

    handleInputChange = e => {
        this.setState({ newMessage: e.target.value });
    };

    handleSubmit = () => {
        this.sendChat(this.state.newMessage);
        this.props.onSubmit(this.state.newMessage);
        this.setState({ newMessage: '' });
    };

    handleLogout = (event) => {
        //firebase.auth().signOut();
        //this.props.history.push('/login');
    };

    sendChat(message) {
        console.log('POST message')
        let requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json'
            },
            body: JSON.stringify({chat: message})
        }
        return fetch(`http://localhost:5000/content-dev/chat-back/add`, requestOptions)
            .then(res => {
                console.log(res)
                return res.json()
            })
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
            

            <div id="message-container">
                <div className="message">
                    {this.props.messages.map(msg => (
                        <div key={msg._id} className="message">
                            <p>{msg.chat}</p>
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
