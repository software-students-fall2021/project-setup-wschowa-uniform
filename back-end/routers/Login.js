const express = require("express")
const router = express.Router()
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// the following are used for authentication with JSON Web Tokens
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info

const jwt = require("jsonwebtoken")
const passport = require("passport")
router.use(passport.initialize()) // tell express to use passport middleware
// load up some mock user data in an array... this would normally come from a database
const users = require("../mock_data/user_data")
// use this JWT strategy within passport for authentication handling
const { jwtOptions, jwtStrategy } = require("../jwt-config") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// set up some useful middleware
router.use(
	morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })
) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
router.use(express.json()) // decode JSON-formatted incoming POST data
router.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// the following cors setup is important when working with cookies on your local machine
router.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host

router.get("/", (req, res) => {
	res.status(200).send("complete")
})

router.post("/", (req, res) => {
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

	// usually this would be a database call, but here we look for a matching user in our mock data
	const user = users[_.findIndex(users, { username: username })]
	if (!user) {
		// no user found with this name... send an error
		res
			.status(401)
			.json({ success: false, message: `user not found: ${username}.` })
	}

	// assuming we found the user, check the password is correct
	// we would normally encrypt the password the user submitted to check it against an encrypted copy of the user's password we keep in the database... but here we just compare two plain text versions for simplicity
	else if (req.body.password == user.password) {
		// the password the user entered matches the password in our "database" (mock data in this case)
		// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		const payload = { id: user.id } // some data we'll encode into the token
		const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
		res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
	} else {
		// the password did not match
		res.status(401).json({ success: false, message: "passwords did not match" })
	}
})

module.exports = router
