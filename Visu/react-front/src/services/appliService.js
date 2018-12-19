import { generateRequest } from './generalService'

let api = 'http://localhost:5000/content/applicationservice/';

// This one is DONE
function get_applis() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'applis', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

// This one is DONE
function post_appli(appli) {
    let requestOptions = generateRequest('POST', appli)
    return fetch(api + `newapp/createapp`, requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

// This one is DONE
function get_applisBySearch(term) {
    console.log('GET applis by searching')
    let requestOptions = generateRequest('GET')
    return fetch(api + `applis/search/${term}`, requestOptions)
        .then(res => res.json())
}


// THis one is DONE
function delete_appliById(Id) {
    console.log('DELETE appli')
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify({ Id: Id })
    }
    return fetch(api + `applis/delete`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}


export {
    delete_appliById,
    get_applisBySearch,
    post_appli,
    get_applis,
}