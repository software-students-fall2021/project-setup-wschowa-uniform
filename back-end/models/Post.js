const mongoose = require("mongoose")
const connection = require("../db")
// users
// * authentication required
// * so users have a username and password
const user = new mongoose.Schema({
	username: { type: String, require: true },
	gender: { type: String, enum: ["male", "female", "prefer not to tell"] },
	description: { type: String },
})
const comment = new mongoose.Schema({
	content: { type: String, require: true, max: 65 },
	user: { type: user, require: true },
	// isReply: Boolean,
	// replyTo: [comment], //Error: Cannot access 'Comment' before initialization
})
// Post
// * each Post must have a related user,
// * they also can have 0 or more comments
const post = new mongoose.Schema(
	{
		user: { type: user, require: true },
		playlist_name: { type: String, required: true },
		playlist_link: { type: String, require: true },
		caption: { type: String, required: true },
	},
	{ timestamps: true }
)
const Post = connection.model("Post", post)
module.exports = Post
