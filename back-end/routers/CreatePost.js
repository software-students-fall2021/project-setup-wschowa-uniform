const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const multer = require('multer')


/*
A middleware that console out the request original url
*/
function logger(req, res, next) {
	console.log(req.originalUrl)
	next()
}


router.get('/newpost',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../front-end/src/components/NewPost.jsx'))
})


router.post('/newpost',(req,res)=>{
    const playlistName = req.body.playlistName
    const playlistLink = req.body.playlistLink
    const playlistCaption = req.body.caption
    const newPost = {
        playlistName : playlistName,
        playlistLink : playlistLink,
        playlistCaption : playlistCaption
    }
    res.status(200).send(newPost)
})

module.exports = router