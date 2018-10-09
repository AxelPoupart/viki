import React, { Component } from 'react';

import './App.css';

import Navbar from "./components/navbar"
import Page from "./components/page"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Page/>
       
      </div>
    );
  }
}

export default App;
