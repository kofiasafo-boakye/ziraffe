const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String, required: true},
    followers: [],
    following: []

}, {timestamps: true})

// {collection: "userData", timestamps: true}


const UserModel = mongoose.model('users', User)

module.exports = UserModel