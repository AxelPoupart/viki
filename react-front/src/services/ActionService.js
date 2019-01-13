const api = 'http://localhost:5000/content-dev/actionservice/';

function reqGet() {
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    return requestOptions;
}

function reqPost(obj) {
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    return requestOptions;
}


// THis one is DONE
function get_actions() {
    console.log('GET actions')
    let requestOptions = reqGet();
    return fetch(api + 'actions', requestOptions)
    .then(res => {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject() 
    })
}

// THis one is DONE
function post_action(action) {
    console.log('POST action')
    console.log(JSON.stringify(action))
    let requestOptions = reqPost(action)
    return fetch(api + `actions/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// THis one is DONE
function delete_actionById(Id) {
    console.log('DELETE action')
    let requestOptions = reqPost({Id: Id})
    return fetch(api + `actions/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}


// THis one is DONE
function changeActionStatus(id, status) {
    console.log('CHANGE user status')
    let requestOptions = reqPost({
        id: id,
        status: status
        })
    return fetch(api + 'actions/changestatus', requestOptions)
        .then(res =>  res.json())
}


// THis one is DONE
function getActionsByStatus(status) {
    console.log('GET actions')
    let requestOptions = reqGet();
    return fetch(api + `actions/status/${status}`, requestOptions)
    .then(res =>  res.json())
}



//_________________________________________________________________




function get_actionById(id) {
    console.log('GET action by Id')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsByUser(id) {
    console.log('GET action by User')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/user/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsByAppli(id) {
    console.log('GET action by Appli')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/appli/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsBySearch(term) {
    console.log('GET action by searching')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `actions/search/${term}`, requestOptions)
        .then(res => res.json())

}


export {
    post_action,
    delete_actionById,
    get_actionsBySearch,
    get_actionsByAppli,
    get_actionsByUser,
    get_actionById,
    get_actions,
    changeActionStatus,
    getActionsByStatus
}