const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const DATA_URL = "https://my.api.mockaroo.com/post.json?key=8d221480"
const USER_POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}


router.get("/", logger, (req, res, next) => {
    const post_id = req.query.id
    // get data from database
    axios
        .get(DATA_URL)
        .then((apiresponse) => {
            const databyid = apiresponse.data.find((element) => element.id == post_id)
            res.status(200).send(databyid)
        })
        .catch((err) => next(err))
})

router.post("/", logger, (req, res) => {
    const post_id = req.query.id
    const newComment = {
        id: post_id,
        comment: req.body.comment,
        username: req.body.username,
        isReply: req.body.isReply,
        //date: Date.now()
    }
    res.status(200).send(newComment);
})
module.exports = router