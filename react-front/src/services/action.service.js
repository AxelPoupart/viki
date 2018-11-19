
export default class ActionService {

    constructor() {
        super()

        this.state = {
            api: 'http://localhost:5000/content/actionserice/'
        }
    }
    
    
    get_actions() {
    console.log('GET actions')
    let actions;
    let requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    fetch(this.api + 'actions', requestOptions)
      .then(res => res.json())
      .then(res => {
        actions = res.actions
      })
    }

    get_actionById(id) {
        console.log('GET action by Id')
        let action;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(this.api + `actions/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                action = res.action
            })
    }

    get_actionsByUser(id) {
        console.log('GET action by User')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(this.api + `actions/user/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })
    }

    get_actionsByAppli(id) {
        console.log('GET action by Appli')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(this.api + `actions/user/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })
    }

    get_actionsBySearch(term) {
        console.log('GET action by searching')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(this.api + `actions/search/${term}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })

    }

}