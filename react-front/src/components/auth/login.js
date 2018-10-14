import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  return fetch("http://localhost:5000/auth/authenticate", requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function logout(){
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  })}

class Login extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username: "",
        password: "",
        submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  


    handleSubmit = event => {
      event.preventDefault();
       this.validateForm() ? login(this.username, this.password) :
       console.log("invalid submission")
    }

    render() {
      return(<div className="Login">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
      )}
      
  }


export default Login
