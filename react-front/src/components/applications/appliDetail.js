import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';
import Navbar from '../navbar/navbar';
import ActionList from '../actions/actionsList';
import ChatContainer from '../actions/chatContainer';

import { getApplicationById } from '../../services/appliService'

export default class AppliDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            application: {}
        }
        this.getApplication = this.getApplication.bind(this)
    }

    getApplication = (appId) => {
        getApplicationById(appId)
            .then(res => {
                if (res.success) {
                    this.setState({ application: res.application })
                } else {
                    alert(res.msg)
                }
            })
    }

    componentWillMount() {
        let location = window.location.pathname.split('/');
        let appId = location[location.length-1];
        this.getApplication(appId)
    }


    render() {
        return (
            <div className="appliDetailGlobal">

                <Navbar page={'Gestion des applications: ' + this.state.application.label}/>

                <div className="switchStatus">
                    {//this.switchStatus().bind(this)
                    }
                </div>

                <div className="grid" >

                    <div className="chat">
                        <ChatContainer tag={this.state.application.label} />
                    </div>

                    <div className="actionList">
                        <ActionList variant="progress" tag={this.state.application._id} />
                    </div>


                    <div className="doneList">
                        <ActionList variant="done" tag={this.state.application._id}/>
                    </div>

                </div>


            </div>
        );
    }



}