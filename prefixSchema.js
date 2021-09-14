const mongoose = require ('mongoose');

const Prefix = new mongoose.Schema ({
    prefix: {
        type: String
    },
    guildId: String,
})

module.exports = mongoose.model('Prefix', Prefix)