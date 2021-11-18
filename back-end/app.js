// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
//to allow front-end access data
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
	next()
})
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

//import editprofile router from routers
// const homePageRouter = require("./routers/HomePage")
const profileRouter = require("./routers/Profile")
const postRouter = require("./routers/DetailedPost")
const newpostRouter = require("./routers/CreatePost")
const loginRouter = require("./routers/Login")

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))
// we will put some server logic here later...
app.get("/", (req, res) => {
	res.status(200).send("Hello World.")
})
app.use("/login", loginRouter)
app.use("/profile", profileRouter)
// app.use("/homepage", homePageRouter)
// export the express app we created to make it available to other modules

app.use("/seepost", postRouter)

app.use("/newpost", newpostRouter)

module.exports = app
