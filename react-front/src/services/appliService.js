import { generateRequest } from './generalService'

let api = 'http://localhost:5000/content/appservice/';

// Get applications list from the back
function getApplications() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'applis', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

// Create a new application
function createApplication(appli) {
    let requestOptions = generateRequest('POST', appli)

    return fetch(api + `add`, requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

// Delete applications
function deleteApplication(_Id) {
    let requestOptions = generateRequest('DELETE', { appId: _Id })
    return fetch(api + `applis`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

function searchApplications(term) {
    console.log("Hello world");    
}

export {
    searchApplications,
    deleteApplication,
    createApplication,
    getApplications,
}