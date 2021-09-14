const mongoose = require('mongoose')

const registerModel = new mongoose.Schema({
    userId: String,
    workName: String,
})

module.exports = mongoose.model('registerModel', registerModel)