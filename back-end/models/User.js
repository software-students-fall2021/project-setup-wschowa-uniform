const mongoose = require("mongoose")
const connection = require("../db")
// users
// * authentication required
// * so users have a username and password
const user = new mongoose.Schema(
	{
		username: { type: String, require: true },
		password: { type: String, require: true },
		gender: { type: String, enum: ["male", "female", "prefer not to tell"] },
		description: { type: String, required: false },
		// posts: [post],
	},
	{ timestamps: true }
)
const User = connection.model("User", user)
module.exports = User
