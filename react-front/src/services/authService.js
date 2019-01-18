function get_auth(mail, password) {
    localStorage.clear();
    const requestOptions = {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            mail: mail,
            password: password
        })
    };

    return fetch("http://localhost:5000/auth/authenticate", requestOptions)
        .then(res => res.json())
        .catch(error => console.log(error));
}

export {
    get_auth
}