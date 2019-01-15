import React, { Component } from 'react';
import Page from "./page"
import 'typeface-roboto'

//This is the App root

class App extends Component {
  render() {
    return (
      <div style={{width: '75%', margin:'auto'}}>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" >
        </link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </link>
        


        <Page/>
      </div>
    );
  }
}

export default App;
