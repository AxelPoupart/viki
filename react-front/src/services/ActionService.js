const api = 'http://localhost:5000/content-dev/actionservice/';


// THis one is DONE
function get_actions() {
    console.log('GET actions')
    let actions;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + 'actions', requestOptions)
    .then(res => {return res.json()})
    .then(res => {return res})
}

// THis one is DONE
function post_action(action) {
    console.log('POST action')
    console.log(JSON.stringify(action))
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify(action)
    }
    return fetch(api + `actions/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// THis one is DONE
function delete_actionById(Id) {
    console.log('DELETE action')
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify({Id: Id})
    }
    return fetch(api + `actions/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}










function get_actionById(id) {
    console.log('GET action by Id')
    let action;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/${id}`, requestOptions)
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
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/user/${id}`, requestOptions)
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
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/appli/${id}`, requestOptions)
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
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/search/${term}`, requestOptions)
        .then(res => res.json())
        .then(res => {
            actions = res.actions
        })

}


export {
    post_action,
    delete_actionById,
    get_actionsBySearch,
    get_actionsByAppli,
    get_actionsByUser,
    get_actionById,
    get_actions
}