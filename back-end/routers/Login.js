const express = require("express")
const router = express.Router()
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const User = require("../models/User") //add user model to access database
const bcrypt = require("bcrypt") //bcrypt to encode the password

const jwt = require("jsonwebtoken")
const passport = require("passport")
router.use(passport.initialize()) // tell express to use passport middleware
// use this JWT strategy within passport for authentication handling
const { jwtOptions, jwtStrategy } = require("../jwt-config") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// set up some useful middleware
router.use(
	morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })
)
// use express's builtin body-parser middleware to parse any data included in a request
router.use(express.json()) // decode JSON-formatted incoming POST data
router.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

router.get("/", (req, res) => {
	res.status(200).send("complete")
})

router.post("/", async (req, res) => {
	// brab the name and password that were submitted as POST body data
	const username = req.body.username
	const password = req.body.password
	// console.log(`${username}, ${password}`)
	if (!username || !password) {
		// no username or password received in the POST body... send an error
		res
			.status(401)
			.json({ success: false, message: `no username or password supplied.` })
	}

	const user = await User.findOne({ username: username })
	// console.log(user)

	if (!user) {
		// no user found with this name... send an error
		res
			.status(401)
			.json({ success: false, message: `user not found: ${username}.` })
	} else {
		// If we have our user, we want to compare the password user entered to the one in the database
		bcrypt.compare(req.body.password, user.password, function (err, response) {
			if (err) {
				// Something wrong when compare the passwords
				res.status(401).send("error: fail to compare passwords")
			}
			if (response) {
				const payload = { id: user.id } // some data we'll encode into the token
				const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
				res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
			} else {
				// The password doesn't match
				res
					.status(401)
					.json({ success: false, message: "passwords did not match" })
			}
		})
	}
})

module.exports = router
