import React from "react";
import {Redirect} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { get_auth } from '../../services/authService'
import './login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        //Initial state
        this.state = {
            loggedin: false,
            useremail: "",
            password: "",
            submitted: false
        };
        
        //Binding fonctions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.validateForm = this.validateForm.bind(this)
    }

    
    login(useremail, password) {
        localStorage.clear();
        // Ask for authentification service
        return get_auth(useremail, password)
            .then(user => {
                if (user.mail === useremail) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("user", JSON.stringify(user));
                    console.log("succes ?");
                    this.setState({loggedin:true})
                    console.log(this.state.loggedin);
                    return user;
                }
            })
           
    }

    validateForm() {
        return this.state.useremail.length > 0 && this.state.password.length > 0;
    }

    logout() {
        localStorage.removeItem("user");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.validateForm() 
            ? this.login(this.state.useremail, this.state.password)
            : alert("invalid submission");
    };

    // Redirige vers la page d'acceuil si le user est log
    redirect() {
        if (this.state.loggedin) {
            return <Redirect from = "/login" to = "/actions/" /> ;
        } else
            return null;
    }

    render() {
        return (
          <div className="Login">
            {this.redirect()}

            <Card id = "loginForm">
                <CardContent>
    
            <form onSubmit={this.handleSubmit}>
              <TextField
                id ="useremail"
                label = "useremail"
                value={this.state.useremail}
                onChange={this.handleChange}
                margin="normal"
                />

              <TextField
                id = "password"
                label = "Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
                />
    
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </form>
            
            </CardContent>
        </Card>
    
          </div>
        );
      }


}

export default Login