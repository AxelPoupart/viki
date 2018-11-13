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
                    <svg viewBox="0 0 24 24">
                        <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                </button>
            </div>
        </div>
        );
    }
}



export default ChatContainer;
