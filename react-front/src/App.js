import React, { Component } from 'react';

import './App.css';

import Navbar from "./components/navbar/navbar"
import Page from "./components/page"
class App extends Component {
  render() {
    return (
      <div className="container App">
        <Navbar/>
        <Page/>
      </div>
    );
  }
}

export default App;
