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

                <Navbar page="Gestion des applications" />

                <AppliSearch apps={this.state.applications} />

                <AppliList exportApps={this.loadApplications} />

            </div>
        );
    }

}

export default Appli;
