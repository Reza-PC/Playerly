const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    serverId: {
        type: String,
        require: true,
    },
    coins: {
        type: Number,
        default: 500,
    },
    bank: {
        type: Number
    },
    timeCreated: {
        type: String,
    }
})

module.exports = mongoose.model('UserProfiles', profileSchema)