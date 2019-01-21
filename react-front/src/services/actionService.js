import { generateRequest } from "./generalService";

const api = 'http://localhost:5000/content-dev/actionservice/';

// THis one is DONE
function get_actions() {
    let requestOptions = generateRequest('GET');
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
    let requestOptions = generateRequest('POST', action)
    return fetch(api + `actions/add`, requestOptions)
        .then(res => {
            return res.json()
        })
}

// THis one is DONE
function delete_actionById(Id) {
    let requestOptions = generateRequest('POST', {Id: Id})
    return fetch(api + `actions/delete`, requestOptions)
        .then(res => {
            return res.json()
        })
}

// THis one is DONE
function changeActionStatus(id, status) {
    let requestOptions = generateRequest('POST', {
        id: id,
        status: status
        })
    return fetch(api + 'actions/changestatus', requestOptions)
        .then(res =>  res.json())
}


// THis one is DONE
function getActionsByStatus(status) {
    let requestOptions = generateRequest('GET');
    return fetch(api + `actions/status/${status}`, requestOptions)
    .then(res =>  res.json())
}



//_________________________________________________________________




function get_actionById(id) {
    let requestOptions = generateRequest('GET');
    return fetch(api + `actions/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsByUser(id) {
    let requestOptions = generateRequest('GET')
    return fetch(api + `actions/user/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsByAppli(id) {
    let requestOptions = generateRequest('GET');
    return fetch(api + `actions/appli/${id}`, requestOptions)
        .then(res => res.json())
}

function get_actionsBySearch(term) {
    let requestOptions = generateRequest('GET')
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