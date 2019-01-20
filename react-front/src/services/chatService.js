import { generateRequest } from "./generalService";

const api = "http://localhost:5000/content-dev/chat-back"



function get_messages() {
    let requestOptions = generateRequest('GET')
    return fetch(api, requestOptions)
        .then(res => {
            return res.json()
        })
}


function sendChat(message) {
    let requestOptions = generateRequest('POST', {chat: message})
    return fetch(api + `/add`, requestOptions)
        .then(res => {
            return res.json()
        })
}

export {
    get_messages,
    sendChat
}