import { Route,Redirect, Switch} from "react-router-dom";
import React from 'react';
import Ingesys from "./pages/ingesysHome/ingesys.js";
import Login from "./auth/login.js";
import Logout from "./auth/logout.js";
import Vm from "./pages/VirtualMachine/vm.js";
import Appli from "./pages/Applications/appli.js";
import newApp from "./pages/Applications/newApp.js"
import PrivateRoute from "./auth/privateroute.js";

const Page = () => (
  <Switch>
    <Route path="/login/" component={Login} />

    <Route path="/logout/" component={Logout} />
    <Route path="/ingesys" component={Ingesys} />
    <Route path="/vm" component={Vm} />
    <Route path="/appli" component={Appli} />
    <Route path="/newapp" component={newApp} />

    <Redirect from="/" to="/login/" />
  </Switch>
);

export default Page;
