const api = 'http://localhost:5000/content-dev/appliservice/';

// This one is DONE
function get_applis() {
    console.log('GET applis')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch(api + 'applis', requestOptions)
        .then(res => res.json())
}

// This one is DONE
function post_appli(appli) {
    console.log('POST appli')
    console.log(JSON.stringify(appli))
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify(appli)
    }
    return fetch(api + `applis/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// This one is DONE
function get_applisBySearch(term) {
    console.log('GET applis by searching')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }
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
        body: JSON.stringify({Id: Id})
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