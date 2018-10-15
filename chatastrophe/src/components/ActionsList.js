import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class ActionList extends Component {


    addAction = () => {
        this.props.onSubmit(null);
    }



    render() {
        return (
            <div id="ChatContainer" className="chat-container">
                <div id="add-action">
                        <button className="red" onClick={this.addAction}>
                            Add
                        </button>
                </div>

                <div id="action-list">
                    <div className="message">
                        {this.props.actions.map(act => (
                            <div key={act.id} className="message">
                                <p>{act.act}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default ActionList
