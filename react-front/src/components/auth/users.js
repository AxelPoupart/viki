


import React, { Component } from 'react'

 class Users extends Component {
  constructor(){
    super();
    this.state={
      users:[]
    }
  }
  componentDidMount(){
    fetch('/usersarray')
    .then(res => res.json())
    .then(users => this.setState({users},()=>console.log("succes",users)))
    
  }
  
  render() {
    return (
      <div>
        users
        <ul>
          {this.state.users.map(user =>
          <li key={user.id}> {user.name}</li>
          )}
        </ul>
      </div>
    )
  }
}
export default Users;