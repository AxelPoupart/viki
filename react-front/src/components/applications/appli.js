import React, { Component } from 'react';

import Navbar from '../navbar/navbar';
import AppliList from './appliList';
import AppliSearch from './appliSearch';

class Appli extends Component {
    constructor(props) {
        super(props);
        this.state = { applications: [] }
        this.loadApplications = this.loadApplications.bind(this);
    }

    loadApplications = (appList) => {
        this.setState({ applications: appList });
    }

    render() {
        return (
            <div className="">

                <Navbar history={this.props.history} page="Gestion des applications" />

                <AppliSearch history={this.props.history} apps={this.state.applications} />

                <AppliList history={this.props.history} exportApps={this.loadApplications} />

            </div>
        );
    }

}

export default Appli;
