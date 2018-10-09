import React, { Component } from 'react';
import Ingesys from "./components/ingesys.js";
import Login from "./components/login.js";
import Logout from "./components/logout.js";
import Vm from "./components/vm.js";
import Appli from "./components/appli.js";
import './App.css';
import { Link ,Route, Redirect, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div class="navbar">
           

            <li>
              <Link class="navlink " to="/">
                ingseys{" "}
              </Link>{" "}
            </li>
            <li>
              <Link class="navlink" to="/ingesys">
                {" "}
                ingesys{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link class="navlink" to="/vm">
                {" "}
                vm{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link class="navlink" to="/login">
                {" "}
                login
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link class="navlink" to="/contact">
                {" "}
                contact{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link class="navlink" to="/gallery">
                {" "}
                Gallery{" "}
              </Link>{" "}
            </li>
            
          </div>
        </header>
        <Switch>
          <Route path="/login/" component={Login} />
          <Route path="/logout/" component={Logout} />
          <Route path="/ingesys" component={Ingesys} />
          <Route path="/vm" component={Vm} />
          <Route path="/appli" component={Appli} />
          <Route path="/ingesys" component={Ingesys} />
          <Redirect from="/" to="/ingesys/" />
      </Switch>
      </div>
    );
  }
}

export default App;
