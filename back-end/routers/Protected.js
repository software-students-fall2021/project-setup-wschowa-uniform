const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const passport = require("passport")
router.use(passport.initialize()) // tell express to use passport middleware
// use this JWT strategy within passport for authentication handling
const { jwtOptions, jwtStrategy } = require("../jwt-config") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// a route that is protected... only authenticated users can access it.
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// our jwt passport config will send error responses to unauthenticated users will
		// so we only need to worry about sending data to properly authenticated users!
		res.json({
			success: true,
			message:
				"Congratulations: you have accessed this route because you have a valid JWT token!",
		})
	}
)
module.exports = router
