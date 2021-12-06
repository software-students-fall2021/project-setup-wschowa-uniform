const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")
/*
A middleware that console out the request original url
*/
function logger(req, res, next) {
	console.log(req.originalUrl)
	next()
}

/*
The get method of the post/posts page
req: the request should be a url with the form of "/profile/posts?id={user id}"
res: the response contains a json array of a user with {user id}'s past posts
*/
router.get("/posts", async (req, res) => {
	const username = req.query.username
	console.log(username)
	await Post.find({ "user.username": username })
		.then((doc) => {
			// console.log(doc)
			res.status(200).send(doc)
		})
		.catch((e) => {
			res.status(401).send("fail")
		})
})

/*
The get method of the profile page
req: the request should be a url with the form of "/profile?id={user id}"
res: the response contains a json object of a user with {user id}
*/
router.get("/", async (req, res) => {
	const username = req.query.username
	console.log(username)
	await User.findOne({ username: username })
		.then((doc) => {
			res.status(200).send(doc)
		})
		.catch((e) => {
			res.status(401).send("fail")
		})
})
/*
Post method the change user profile with the {user id}
req: the request should be a url with the form of "/profile?id={user id}"
*/
router.post("/", async (req, res) => {
	const username = req.body.username
	console.log(req.body.description)
	console.log(req.body.gender)

	await User.findOneAndUpdate(
		{ username: username },
		{ gender: req.body.gender, description: req.body.description }
	)
		.then((doc) => {
			// console.log(doc)
			res.status(200).send(doc)
		})
		.catch((e) => {
			res.status(401).send("fail")
		})
})

module.exports = router
