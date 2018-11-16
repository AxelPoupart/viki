import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

function login(username, password) {
  localStorage.clear();
  const requestOptions = {
    credentials: 'include',
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "username":username, "password":password})
  };
  
  return fetch("http://localhost:5000/auth/authenticate", requestOptions)
    .then(res => res.json())
    .then(user => {
      
      if(user.name===username){
        
        // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    })
    .catch(error => console.log(error));
};




// function handleResponse(response) {
//   console.log(response)
//   return response.text().then(text => {
//       const data = text && JSON.parse(text);
//       if (!response.ok) {
//           if (response.status === 401) {
//               // auto logout if 401 response returned from api
              
              
//           }

//           const error = (data && data.message) || response.statusText;
//           return Promise.reject(error);
//       }

//       return data;
//   })}

class Login extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loggedin:false,
        username: "",
        password: "",
        submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.logout=this.logout.bind(this);
      this.componentWillUnmount=this.componentWillUnmount.bind(this);
    }

   

    componentWillUnmount() {
      login(this.state.username,this.state.password);
    }

    validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
    }
    logout(){
      localStorage.removeItem('user');}


    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }



    handleSubmit = event => {
      

      event.preventDefault();
      this.validateForm() ? login(this.state.username, this.state.password) :
      alert("invalid submission")
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

        <Link className="nav-link" to="/ingesys">
          <Button block bsStyle="primary" bsSize="large" type="submit">Login</Button>
        </Link>

        </form>
        <form onSubmit={this.logout}>
        <Button
          block
          bsSize="large"
          type="submit"
        >
          Logout
        </Button>
        </form>

    </div>
      )}

  }


export default Login
