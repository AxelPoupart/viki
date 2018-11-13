import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className="navbar navbar-dark">
    <div className="container">
     
      <li>
        <Link className="nav-link" to="/ingesys">
          ingesys
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/vm">
          vm
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          login
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/appli">
          Appli
        </Link>
      </li>
    </div>
  </nav>
);

export default Navbar;
