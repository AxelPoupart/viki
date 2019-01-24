import { generateRequest } from "./generalService";
let api = "http://localhost:5000/auth/"
function get_auth(mail, password) {
    localStorage.clear();
    const requestOptions = generateRequest('POST', {
        mail: mail,
        password: password
    })
    
    return fetch(api+"authenticate", requestOptions)
        .then(res => res.json())
        .catch(error => alert(error));
}

function logout() {
    let requestOptions = generateRequest('GET')
    return fetch(api+'logout', requestOptions)
}

export {
    logout,
    get_auth
}