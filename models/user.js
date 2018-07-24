const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	Username: String,
	Password: String,
	Name: String,
	DOB: Number,
	Permission: Number,
})

module.exports = mongoose.model('user', UserSchema)
