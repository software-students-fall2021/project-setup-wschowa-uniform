require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const User = require("./models/User") //add user model to access database
// set up some JWT authentication options
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET // an arbitrary string used during encryption - see the .env file

// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly

// we are setting some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = new JwtStrategy(jwtOptions, async function (
	jwt_payload,
	next
) {
	// console.log("JWT payload received", jwt_payload) // debugging

	const user = await User.findById(jwt_payload.id)
	if (user) {
		// we found the user... keep going
		next(null, user)
	} else {
		// we didn't find the user... fail!
		next(null, false)
	}
})

module.exports = {
	jwtOptions,
	jwtStrategy,
}
