const mongoose = require('mongoose')

const vipSchema = new mongoose.Schema({
    guildId: String,
    ownerId: String
})

module.exports = mongoose.model('vipModel', vipSchema)