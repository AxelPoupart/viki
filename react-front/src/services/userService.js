import { generateRequest } from './generalService'

const api = 'http://localhost:5000/content/userservice/';

function getUsers() {
    console.log('GET users')
    let requestOptions = generateRequest('GET');
    return fetch(api + 'users', requestOptions)
        .then(res => res.json()).catch(err => console.log(err))
}

function post_user(user) {
    console.log('POST user')
    let requestOptions = generateRequest('POST', user);
    return fetch("http://localhost:5000/auth/authenticate/newuser", requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        }).catch(err => console.log(err))
}

function delete_userById(id) {
    console.log('DELETE action')
    let requestOptions = generateRequest('POST', { Id: id })
    return fetch(api + `users/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        }).catch(err => console.log(err))

}

// THis one is DONE
function getUserById(id) {
    console.log('GET user By id')
    let requestOptions = generateRequest('GET');
    return fetch(api + `users/${id}`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

// THis one is DONE
function getByPrivilege(privilege) {
    console.log('GET '+privilege)
    let requestOptions = generateRequest('GET');
    return fetch(api + `users/Privilege/${privilege}`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

function get_Privileges() {
    console.log('GET privileges')
    let requestOptions = generateRequest('GET');
    return fetch(api + `users/privileges`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}


// THis one is DONE
function changeUserPrivilege(id, privilege) {
    console.log('CHANGE user Privilege')
    let requestOptions = generateRequest('POST', {
        id: id,
        privilege: privilege
    })
    return fetch(api + 'users/changePrivilege', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export {
    post_user,
    delete_userById,
    getUserById,
    getUsers,
    getByPrivilege,
    changeUserPrivilege,
    get_Privileges
}