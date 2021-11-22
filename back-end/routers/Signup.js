const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {
	res.status(200).send("complete")
})
/*
POST for /signup
req: a json object contain {username, password, gender, birthday, description}
res: the user json object with encrypted password
*/
router.post("/", async (req, res) => {
	try {
		// encrypt the password
		const hashPassword = await bcrypt.hash(req.body.password, 10)
		//create a new user with username and password
		const user = {
			username: req.body.username,
			password: hashPassword,
			gender: req.body.gender,
			birthday: req.body.birthday,
			description: req.body.description,
		}
		console.log(user)
		// we will try to update a new user in database here
		res.status(200).send(user)
	} catch {
		res.send("failure")
	}
})

module.exports = router
