import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { Component } from "react";
import { post_user } from "../../services/userService.js";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password1: "",
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  validateForm() {
    return this.state.mail.length > 0 && this.state.password.length > 0;
  }

  add_user(mail, password) {
    let user = {
      email: mail,
      password: password
    };
    post_user(user);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateForm()) {
      alert("invalid submission");
    } else {
      this.add_user(this.state.mail, this.state.password);
    }
  }

  render() {
    return (
      <div>
      
      <Card id="userform">
        <CardContent>
          <form onSubmit={this.handleSubmit}>
          
            <TextField
              id="mail"
              label="email"
              value={this.state.mail}
              onChange={this.handleChange}
              margin="normal"
            />

            <TextField
              id="password"
              label="Password"
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
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    );
  }
}


export default AddUser;