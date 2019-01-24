import { generateRequest } from './generalService';

const api = 'http://localhost:5000/content/vmservice/';


// This one is DONE
function get_vms() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'vms', requestOptions)
    .then(res => res.json())
}

// This one is DONE
function post_vm(vm) {
    let requestOptions = generateRequest('POST', vm)
    return fetch(api + `vms/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

function getPairedApplications(machineId) {
    let requestOptions = generateRequest('GET')
    return fetch(api+`pairs/${machineId}`, requestOptions)
    .then(res => res.json())
    .catch(err => {
        alert('error while getting paired applications')
        console.log(err);
    })
}

// THis one is DONE
function delete_vmById(Id) {
    console.log('DELETE vm')
    let requestOptions = generateRequest('POST', {Id: Id})
    return fetch(api + `vms/delete`, requestOptions)
        .then(res => {
            return res.json()
        })
}

function get_vmById(id) {
    let requestOptions = generateRequest('GET')
    return fetch(api + `vms/${id}`, requestOptions)
        .then(res => res.json())
}

function get_vmsByAppli(id) {
    let requestOptions = generateRequest('GET')
    return fetch(api + `vms/appli/${id}`, requestOptions)
        .then(res => res.json())
}
export {
    getPairedApplications,
    post_vm,
    get_vmsByAppli,
    get_vmById,
    get_vms,
    delete_vmById
}