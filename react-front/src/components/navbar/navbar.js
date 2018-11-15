import React from "react";
import { Link } from "react-router-dom";
import {  Button, ButtonToolbar } from 'react-bootstrap';



const Navbar = (props) => (
  <nav className="navbar navbar-dark">
    <div className="container">
    <h1>ViKi, A Virtual Machine handle App</h1>

      <ButtonToolbar> 
        <Link className="nav-link" to="/ingesys">
          <Button bsStyle="primary">Home</Button>
        </Link>


 
        <Link className="nav-link" to="/vm">
          <Button bsStyle="primary">Look for a VM</Button>
        </Link>



        <Link className="nav-link" to="/appli">
          <Button bsStyle="primary">Look for an Application</Button>
        </Link>



        <Link className="nav-link" to="/logout">
          <Button bsStyle="danger">Logout</Button>
        </Link>

        {props.children}


        </ButtonToolbar>

      
      
    </div>
  </nav>
);

export default Navbar;
