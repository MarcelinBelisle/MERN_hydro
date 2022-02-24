const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    infoDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Info', infoSchema)

