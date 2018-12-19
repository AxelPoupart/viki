let api = 'http://localhost:5000/content-dev/applicationservice/';

function generateRequest(method, body = {}) {
    let requestOptions = {
        credentials: 'include',
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (method !== 'GET') requestOptions.body = body
    return requestOptions
}

function get_campuses() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'newapp/campuses', requestOptions)
        .then(res => {
            return res.json()
        })
        .catch(err => alert(err))
}

function get_domains() {
    let requestOptions = generateRequest('GET')
    return fetch(api + 'newapp/domains', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
}

export {
    get_campuses,
    get_domains,
    generateRequest
}