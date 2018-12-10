




const api = 'http://localhost:5000/content-dev/vmservice/';



// This one is DONE
function get_vms() {
    console.log('GET vms')
    let vms;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + 'vms', requestOptions)
    .then(res => {return res.json()})
    .then(res => {return res})
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

// In progress
function get_vmsBySearch(term) {
    console.log('GET vms by searching')
    let vms;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/search/${term}`, requestOptions)
        .then(res => {return res.json()})
        .then(res => {return res})
}




function get_vmById(id) {
    console.log('GET vm by Id')
    let vm;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/${id}`, requestOptions)
        .then(res => res.json())
        .then(res => {
            vm = res.vm
        })
}

function get_vmsByAppli(id) {
    console.log('GET vms by applications')
    let vms;
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + `vms/appli/${id}`, requestOptions)
        .then(res => res.json())
        .then(res => {
            vms = res.vms
        })
}





export {
    post_vm,
    get_vmsBySearch,
    get_vmsByAppli,
    get_vmById,
    get_vms
}