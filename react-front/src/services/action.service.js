import axios from 'axios'
import React, { Component } from 'react'


class ActionService extends Component {

    api = "http://localhost:3000/"


    constructor () {
      super()
      this.handleClick = this.handleClick.bind(this)
    }



    getActions () {
        axios.get(`${this.api}/actions`)
          .then(res => {
              console.log(res);
              return res;
          })
    }

    getActionsById (id) {
        axios.get(`${this.api}/actions/${id}`)
          .then(res => {
              console.log(res);
              return res;
          })
    }

    getActionsByUser (user) {
        axios.get(`${this.api}/actions/${user}`)
          .then(res => {
              console.log(res);
              return res;
          })
    }

    addActions (title, code, severity, description, appliId, userId) {
        const action = {
            title: title,
            code: code,
            description: description,
            severity: severity,
            appliId: appliId,
            userId: userId
          };
        axios.post(`${this.api}/actions/add`, action)
    }

    updateActions (title, code, severity, description, appliId, userId, status) {
        const action = {
            title: title,
            code: code,
            description: description,
            severity: severity,
            appliId: appliId,
            userId: userId,
            status: status
          };
        axios.post(`${this.api}/actions/add`, action)
    }

    deleteAction (id) {
        axios.get(`${this.api}/actions/delete/${id}`)
          .then(res => {
              console.log(res);
              return res;
          })
    }


    
  }
  export default ActionService