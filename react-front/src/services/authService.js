import { generateRequest } from "./generalService";

function get_auth(mail, password) {
    localStorage.clear();
    const requestOptions = generateRequest('POST', {
        mail: mail,
        password: password
    })
    console.log('Attempting authentification');
    
    return fetch("http://localhost:5000/auth/authenticate", requestOptions)
        .then(res => res.json())
        .catch(error => alert(error));
}

export {
    get_auth
}