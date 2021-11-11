const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"
const POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"

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
router.get("/posts", logger, (req, res, next) => {
	// get the user id from the req url
	const user_id = req.query.id
	console.log(user_id)
	// console.log(`The id is ${req.id}`)
	// get data from database
	axios
		.get(POST_URL)
		.then((apiresponse) => {
			res.status(200).send(apiresponse.data)
		})
		.catch((err) => next(err))
})

/*
The get method of the profile page
req: the request should be a url with the form of "/profile?id={user id}"
res: the response contains a json object of a user with {user id}
*/
router.get("/", logger, (req, res, next) => {
	// get the user id from the req url
	const user_id = req.query.id
	console.log(user_id)
	console.log(`The id is ${req.id}`)
	// get data from database
	axios
		.get(DATA_URL)
		.then((apiresponse) => {
			const databyid = apiresponse.data.find((element) => element.id == user_id)
			res.status(200).send(databyid)
		})
		.catch((err) => next(err))
})
/*
Post method the change user profile with the {user id}
req: the request should be a url with the form of "/profile?id={user id}"
*/
router.post("/", logger, (req, res) => {
	const user_id = req.query.id
	console.log(req.body)
	const newProfile = {
		id: req.query.id,
		first_name: req.body.first_name,
		age: req.body.age,
		gender: req.body.gender,
		last_name: req.body.last_name,
		description: req.body.description,
	}
	//We want to alter this information in the database
	//send back the new profile
	res.status(200).send(newProfile)
})

module.exports = router
