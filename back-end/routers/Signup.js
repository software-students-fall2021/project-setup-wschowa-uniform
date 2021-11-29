const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
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
		// console.log(req.body)
		// encrypt the password
		const hashPassword = await bcrypt.hash(req.body.password, 10)
		const user = await User.findOne({ username: req.body.username })
		if (user) {
			res
				.status(401)
				.json({ success: false, message: "A user of the same username exists" })
		} else {
			User.insertMany(
				[
					{
						username: req.body.username,
						password: hashPassword,
						gender: req.body.gender,
						// birthday: req.body.birthday,
						description: req.body.description,
					},
				],
				function (e) {
					console.error(e)
				}
			)
			res.status(200).json({ success: true, username: req.body.username })
		}
	} catch {
		res.status(501).json({ success: false, message: "Some Error happened" })
	}
})

module.exports = router
