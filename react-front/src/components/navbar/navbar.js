import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonToolbar } from "react-bootstrap";

export default class appli extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.componentDidMount=   this.componentDidMount.bind(this);
    };

  componentDidMount = () => {
    const requestOptions = {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    
    fetch("http://localhost:5000/auth/", requestOptions)
      .then(res => res.json())
      .then(user => this.setState({user: user}) )
      .catch((err) => console.log(err));
    }

  render() {
    return (
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

            {this.props.children}
          </ButtonToolbar>
        </div>
      </nav>
    );
  }
}
