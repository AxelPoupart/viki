import { Route,Redirect, Switch} from "react-router-dom";
import React from 'react';

import Login from "./components/authentification/login";
import Logout from "./components/authentification/logout.js";
import PrivateRoute from "./components/authentification/privateRoute.js";
import Action from "./components/actions/actions";
import Vm from "./components/virtualMachines/vm";
import Appli from "./components/applications/appli";
import User from "./components/users/users";
import AppliDetail from "./components/applications/appliDetail";


// This defines the routes to the different Pages

const Page = () => (
  <Switch>
    <Route path="/login/" component={Login} />
    <PrivateRoute path="/logout/" component={Logout} />
    <PrivateRoute path="/actions/" component={Action} />
    <PrivateRoute path="/vms/" component={Vm} />
    <PrivateRoute path="/applis/:id" component={AppliDetail} />
    <PrivateRoute path="/applis" component={Appli} />
    <PrivateRoute path="/users/" component={User} />

    <Redirect from="/" to="/login/" />
  </Switch>
);

export default Page;
