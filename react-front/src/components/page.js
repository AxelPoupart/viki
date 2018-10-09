import { Route, Redirect, Switch} from "react-router-dom";
import React from 'react';
import Ingesys from "./ingesys.js";
import Login from "./login.js";
import Logout from "./logout.js";
import Vm from "./vm.js";
import Appli from "./appli.js";

const Page = () =>(

<Switch>
<Route path="/login/" component={Login} />
<Route path="/logout/" component={Logout} />
<Route path="/ingseys" component={Ingesys} />
<Route path="/vm" component={Vm} />
<Route path="/appli" component={Appli} />
<Route path="/ingesys" component={Ingesys} />
<Redirect from="/" to="/ingesys/" />
</Switch>

)

export default Page;