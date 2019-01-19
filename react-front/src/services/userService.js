import { generateRequest } from './generalService'

const api = 'http://localhost:5000/content-dev/userservice/';

function getUsers() {
    console.log('GET users')
    let requestOptions = generateRequest('GET');
    return fetch(api + 'users', requestOptions)
        .then(res => res.json())
}

function post_user(user) {
    console.log('POST user')
    let requestOptions = generateRequest('POST', user);
    return fetch(api + `users/new_user'`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

function delete_userById(id) {
    console.log('DELETE action')
    let requestOptions = generateRequest('POST', { Id: id })
    return fetch(api + `users/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// THis one is DONE
function getUserById(id) {
    console.log('GET user By id')
    let requestOptions = generateRequest('GET');
    return fetch(api + 'users/:id', requestOptions)
        .then(res => res.json())
}

// THis one is DONE
function getByStatus(status) {
    console.log('GET ingesys')
    let requestOptions = generateRequest('GET');
    return fetch(api + `users/status/${status}`, requestOptions)
        .then(res => res.json())
}

// THis one is DONE
function changeUserStatus(id, status) {
    console.log('CHANGE user status')
    let requestOptions = generateRequest('POST', {
        id: id,
        status: status
    })
    return fetch(api + 'users/changestatus', requestOptions)
        .then(res => res.json())
}

export {
    post_user,
    delete_userById,
    getUserById,
    getUsers,
    getByStatus,
    changeUserStatus
}