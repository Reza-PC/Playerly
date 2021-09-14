const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: String,
    userId: String,
    reason: String,
    reportedBy: String,
    reportedByID: String,
})

module.exports = mongoose.model('Report', reportSchema)