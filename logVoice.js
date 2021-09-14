const mongoose = require('mongoose')

const voiceModel = new mongoose.Schema({
    guildId: String,
})

module.exports = mongoose.model('voiceModel', voiceModel)