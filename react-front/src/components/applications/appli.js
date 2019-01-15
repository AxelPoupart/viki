import React, { Component } from 'react';

import Navbar from '../navbar/navbar';
import AppliList from './appliList';
import AppliSearch from './appliSearch';

import './appli.css';
import AddAppli from './addAppli';


class Appli extends Component {

    state = { user: null, actions: [] }

    handleLogout = (event) => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="home_global">

                <Navbar page="Gestion des applications" />

                <AppliSearch />

                <AppliList />

            </div>
        );
    }

}

export default Appli;
