import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => (
  <nav class="navbar navbar-dark">
    <div className="container" >
      <li >
        <Link class="nav-link " to="/">
          ingseys{" "}
        </Link>{" "}
      </li>
      <li>
        <Link class="nav-link" to="/ingesys">
          {" "}
          ingesys{" "}
        </Link>{" "}
      </li>
      <li>
        {" "}
        <Link class="nav-link" to="/vm">
          {" "}
          vm{" "}
        </Link>{" "}
      </li>
      <li>
        {" "}
        <Link class="nav-link" to="/login">
          {" "}
          login
        </Link>{" "}
      </li>
      <li>
        {" "}
        <Link class="nav-link" to="/contact">
          {" "}
          contact{" "}
        </Link>{" "}
      </li>
      <li>
        {" "}
        <Link class="nav-link" to="/gallery">
          {" "}
          Gallery{" "}
        </Link>{" "}
      </li>
      </div>
  </nav>
);

export default Navbar;
