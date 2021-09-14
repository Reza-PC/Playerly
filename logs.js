const mongoose = require ('mongoose')

const logsChannel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    channelId: String,
})

module.exports = mongoose.model('logChannel', logsChannel)