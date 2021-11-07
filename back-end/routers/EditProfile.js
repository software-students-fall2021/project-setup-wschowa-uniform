const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"

/*
A middleware that console out the request original url
*/
function logger(req, res, next) {
	console.log(req.originalUrl)
	next()
}
/*
The get method of the api
req: the request should be a url with the form of "/editprofile?id={user id}"
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
			res.json(databyid)
		})
		.catch((err) => next(err))
})
/*
Post method the change user profile with the {user id}
req: the request should be a url with the form of "/editprofile?id={user id}"
*/
router.post("/", logger, (req, res) => {
	const user_id = req.query.id
	console.log(req.body)
	post_name = req.body.name
	post_age = req.body.age
	post_gender = req.body.gender
	post_description = req.body.description
	res.send("complete")
})

module.exports = router
