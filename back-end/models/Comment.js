const mongoose = require("mongoose")
const connection = require("../db")
const user = new mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true, min: 8 },
	gender: { type: String, enum: ["male", "female", "prefer not to tell"] },
	description: { type: String },
	// posts: [post],
})

const comment = new mongoose.Schema({
	content: { type: String, require: true, max: 65 },
	user: { type: String, require: true },
	post : {type: String, required: true}
	// replyTo: [comment], //Error: Cannot access 'Comment' before initialization
})

const Comment = connection.model("Comment", comment)
module.exports = Comment
