const api = 'http://localhost:5000/content-dev/vmservice/';


// This one is DONE
function get_vms() {
    console.log('GET vms')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + 'vms', requestOptions)
    .then(res => res.json())
}

// This one is DONE
function post_vm(vm) {
    console.log('POST vm')
    console.log(JSON.stringify(vm))
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify(vm)
    }
    return fetch(api + `vms/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// This one is DONE
function get_vmsBySearch(term) {
    console.log('GET vms by searching')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/search/${term}`, requestOptions)
        .then(res => res.json())
}


// THis one is DONE
function delete_vmById(Id) {
    console.log('DELETE vm')
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify({Id: Id})
    }
    return fetch(api + `vms/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}








//_____________________________________________________________________________

function get_vmById(id) {
    console.log('GET vm by Id')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/${id}`, requestOptions)
        .then(res => res.json())
}

function get_vmsByAppli(id) {
    console.log('GET vms by applications')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/appli/${id}`, requestOptions)
        .then(res => res.json())
}





export {
    post_vm,
    get_vmsBySearch,
    get_vmsByAppli,
    get_vmById,
    get_vms,
    delete_vmById
}