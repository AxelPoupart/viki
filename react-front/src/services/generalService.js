let api = 'http://localhost:5000/content/services/';

function generateRequest(method, body = {}) {
    let requestOptions = {
        credentials: 'include',
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (method !== 'GET') requestOptions.body = JSON.stringify(body)
    return requestOptions
}

function get_campuses() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'campuses', requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

function get_domains() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'domains', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export {
    get_campuses,
    get_domains,
    generateRequest
}