const express = require("express")
const router = express.Router()
const axios = require("axios")
const Post = require("../models/Post")

router.get("/", async (req, res) => {
	// this is just a function to add a post
	// Do this before someone complete the create new post part
	// Post.insertMany(
	// 	[
	// 		{
	// 			user: {
	// 				username: "daniel",
	// 				gender: "male",
	// 				// birthday: req.body.birthday,
	// 				description: "req.body.description",
	// 			},
	// 			playlist_name: "name",
	// 			playlist_link: "37i9dQZF1DWWjGdmeTyeJ6",
	// 			caption: "hi",
	// 			comments: [
	// 				{
	// 					content: "hiiiii",
	// 					user: {
	// 						username: "daniel",
	// 						gender: "male",
	// 						// birthday: req.body.birthday,
	// 						description: "req.body.description",
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// 	function (e) {
	// 		console.error(e)
	// 	}
	// )

	// we want to get latest 20 posts
	const allPosts = await Post.find({}).sort({ date: -1 }).limit(20)
	console.log(allPosts)
	res.status(200).send(allPosts)
})
module.exports = router
