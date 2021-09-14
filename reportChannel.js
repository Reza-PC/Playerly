const mongoose = require ('mongoose')

const reportChannel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    channelId: String,
})

module.exports = mongoose.model('channel', reportChannel)