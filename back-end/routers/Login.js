const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.status(200).send("complete")
})

router.post("/", (req, res) => {
	res.status(200).send("successful")
})

module.exports = router
