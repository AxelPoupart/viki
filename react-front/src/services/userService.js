const api = 'http://localhost:5000/content-dev/userservice/';

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

function generateReqOptions(method, body={}) {
    return {
        credentials: 'include',
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}


// THis one is DONE
function getUsers() {
    console.log('GET users')
    let requestOptions = reqGet();
    return fetch(api + 'users', requestOptions)
    .then(res =>  res.json())
}

// THis one is DONE
function post_user(user) {
    console.log('POST user')
    console.log(JSON.stringify(user))
    let requestOptions = reqPost(user)
    return fetch(api + `users/new_user'`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// THis one is DONE
function delete_userById(id) {
    console.log('DELETE action')
    let requestOptions = reqPost({Id: id})
    return fetch(api + `users/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// THis one is DONE
function getUserById(id) {
    console.log('GET user By id')
    let requestOptions = reqGet();
    return fetch(api + 'users/:id', requestOptions)
        .then(res =>  res.json())
}

// THis one is DONE
function getByStatus(status) {
    console.log('GET ingesys')
    let requestOptions = reqGet();
    return fetch(api + `users/status/${status}`, requestOptions)
    .then(res =>  res.json())
}

// THis one is DONE
function changeUserStatus(id, status) {
    console.log('CHANGE user status')
    let requestOptions = reqPost({
        id: id,
        status: status
        })
    return fetch(api + 'users/changestatus', requestOptions)
        .then(res =>  res.json())
}

export {
    post_user,
    delete_userById,
    getUserById,
    getUsers,
    getByStatus,
    changeUserStatus
}