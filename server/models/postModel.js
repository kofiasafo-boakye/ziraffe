const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    profilePicture: {type: String, required: true},
    likes: [],
    comments: [
        {
          userId: { type: String, required: true },
          text: { type: String, required: true },
          firstName: {type: String, required: true},
          lastName: {type: String, required: true},
          username: {type: String, required: true},
          profilePicture: {type: String, required: true},
          createdAt: { type: Date, default: Date.now },
        },
    ],
    // date: { type: Date, default: Date.now }
}, {timestamps: true})


var PostModel = mongoose.model("Posts", postSchema);

module.exports = PostModel