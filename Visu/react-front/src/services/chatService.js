
const api = "http://localhost:5000/content-dev/chat-back"



function get_messages() {
    console.log('GET message')
    let requestOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
    }
    return fetch(api, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}


function sendChat(message) {
    console.log('POST message')
    let requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
        },
        body: JSON.stringify({chat: message})
    }
    return fetch(api + `/add`, requestOptions)
        .then(res => {
            console.log(res)
            return res.json()
        })
}

export {
    get_messages,
    sendChat
}