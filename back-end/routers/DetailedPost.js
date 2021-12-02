const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

// const DATA_URL = "https://my.api.mockaroo.com/post.json?key=8d221480"
// const USER_POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"

/*
req: the form of /seepost?id=
*/
router.get("/", async (req, res) => {
	const post_id = req.query.id
	// get data from database
	const post = await Post.findById(post_id)
	if (!post) {
		res.status(400).send("Do not find the post with such id")
	} else {
		res.status(200).send(post)
	}
})
/*
req: the form of /seepost?id=
req: body should have username and content
*/
router.post("/", async (req, res) => {
	const post_id = req.query.id

	const content = req.body.content
	const username = req.body.username
	const comment = {
		content: content,
		user: {
			username: username,
		},
	}
	Post.findById(post_id)
		.then(function (post) {
			console.log(post)
			post.comments.push(comment)
			post.save()
			console.log(post)
		})
		.catch((e) => {
			console.log(`caught the error: ${err}`)
			return res.status(500).json(err)
		})
	res.status(200).send("sucess")
})
module.exports = router
