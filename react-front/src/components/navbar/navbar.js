import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./navbar.css";

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.display_user_info=this.display_user_info.bind(this);
    this.state = {
      anchorEl: null,
      user: null
    };
  }

  componentDidMount = () => {
    const requestOptions = {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch("http://localhost:5000/auth/authenticate", requestOptions)
      .then(res => res.json())
      .then(user => this.setState({ user: JSON.stringify(user) }))
      .catch((err) => console.log(err));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
	};
	
	display_user_info = (user) => {
		if (this.state.user!=null){
			
			const {privileges,useremail} = user
			return <div> {privileges} </div>

		} else
		return null;
	}

	display_admin_menu = (user) => {
		if (user && user.privileges==="sysadmin" ){
			
			
			return (
			<MenuItem onClick={this.handleClose}>
			<Link className="nav-link" to="users">
				dans le futur page admin
			</Link>
		</MenuItem>
			)
		} else
		return null;
	}


  render(props) {
		const user=JSON.parse(this.state.user)

    return (
      <div className="container">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              aria-owns={this.anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/actions">
                  Home
                </Link>
              </MenuItem>

              <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/applis">
                  Applications
                </Link>
              </MenuItem>

              <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/vms">
                  Virtuals Machines
                </Link>
              </MenuItem>

							{this.display_admin_menu(user)}
            </Menu>

						

            <Typography variant="h6" color="inherit">
              ViKi, Virtual Machines Manager
            </Typography>

            {this.display_user_info(user)}
            <div className="children">{this.props.children}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
