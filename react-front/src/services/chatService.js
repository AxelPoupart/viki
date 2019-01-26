import { generateRequest } from "./generalService";

const api = "http://localhost:5000/content/chat-back"



function get_messages() {
    let requestOptions = generateRequest('GET')
    return fetch(api, requestOptions)
        .then(res => {
            return res.json()
        })
}


function sendChat(message, user) {
    let requestOptions = generateRequest('POST', {chat: message, user: user})
    return fetch(api + `/add`, requestOptions)
        .then(res => {
            return res.json()
        })
}

export {
    get_messages,
    sendChat
}