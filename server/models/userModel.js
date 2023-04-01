const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
}, {collection: "userData"})


const model = mongoose.model('UserData', User)

module.exports = model