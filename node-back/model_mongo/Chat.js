

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let Chat = new Schema({
    chat: {
        type: String
    }
});

module.exports = mongoose.model('Chat', Chat);