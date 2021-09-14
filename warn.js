const mongoose = require('mongoose')

const Warn = new mongoose.Schema({
    Warns: Array,
    guildId: String,
    user: String,
})

module.exports = mongoose.model('warns', Warn)