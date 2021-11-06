const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"

function getData(req, res, next) {
	console.log("get data")
}
function logger(req, res, next) {
	console.log(req.originalUrl)
	next()
}
router.get("/", logger, (req, res, next) => {
	const user_id = req.query.id
	console.log(user_id)
	axios
		.get(DATA_URL)
		.then((apiresponse) => {
			const databyid = apiresponse.data.find((element) => element.id == user_id)
			res.json(databyid)
		})
		.catch((err) => next(err))
})
router.post("/", logger, (req, res) => {
	res.send("hhhhhhh")
})

module.exports = router
