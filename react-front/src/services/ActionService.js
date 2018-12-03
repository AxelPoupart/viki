


    const api = 'http://localhost:5000/content/actionservice/';
    
    function get_actions() {
    console.log('GET actions')
    let actions;
    let requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    fetch(api + 'actions', requestOptions)
      .then(res => res.json())
      .then(res => {
        actions = res.actions
      })
    }

    function get_actionById(id) {
        console.log('GET action by Id')
        let action;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(api + `actions/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                action = res.action
            })
    }

    function get_actionsByUser(id) {
        console.log('GET action by User')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(api + `actions/user/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })
    }

    function get_actionsByAppli(id) {
        console.log('GET action by Appli')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(api + `actions/appli/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })
    }

    function get_actionsBySearch(term) {
        console.log('GET action by searching')
        let actions;
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        fetch(api + `actions/search/${term}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                actions = res.actions
            })

    }


    function post_action(action) {
        console.log('POST action')
        let requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action
               })
        }
        fetch(api + `actions/add`, requestOptions)
            .then(res => {
                console.log(res)
                res.json()
            })
            .then(res => console.log(res))
    }

export { post_action, get_actionsBySearch, get_actionsByAppli, get_actionsByUser, get_actionById, get_actions }

