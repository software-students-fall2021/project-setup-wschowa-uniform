const mongoose = require("mongoose")
const connection = require("../db")
const user = new mongoose.Schema(
	{
		username: { type: String, require: true },
		password: { type: String, require: true, min: 8 },
		gender: { type: String, enum: ["male", "female", "prefer not to tell"] },
		description: { type: String, required: true },
		// posts: [post],
	},
	{ timestamps: true }
)

const comment = new mongoose.Schema({
	content: { type: String, require: true, max: 65 },
	user: { type: user, require: true },
	isReply: Boolean,
	replyTo: [comment], //Error: Cannot access 'Comment' before initialization
})

const Comment = connection.model("Comment", comment)
module.exports = Comment
