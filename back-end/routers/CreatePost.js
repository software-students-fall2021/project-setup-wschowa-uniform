const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const multer = require('multer')
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"
const POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"
require('../db')

router.get("/", (req, res, next) => {
    const ID = req.query.id
    axios
        .get(DATA_URL)
        .then((apiresponse) => {
            const databyid = apiresponse.data.find((post) => post.id == ID)
            res.status(200).send(databyid)
        })
        .catch((err) => next(err))
})


router.post('/',(req,res)=>{
    const postId = req.query.id;
    const playlistName = req.body.playlistName;
    const playlistLink = req.body.playlistLink;
    const playlistCaption = req.body.playlistCaption;
    const newPost = {
        postID : postId,
        playlistName : playlistName,
        playlistLink : playlistLink,
        playlistCaption : playlistCaption
    }
    const new_post = new Post(newPost)
    new_post.save((err,post)=>{
        if(err){
            console.error(`there has been a error saving post: ${err}`)
        }
        else{
        console.log('new post has posted!')
        res.status(200).send(post)
        }
    })
})

module.exports = router