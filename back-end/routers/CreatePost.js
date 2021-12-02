const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const multer = require('multer')
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"
const POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"
const Post = require('../models/Post')
const User = require('../models/User')
require('../db')




router.post('/',async (req,res)=>{
    const playlistName = req.body.playlistName;
    const playlistLink = req.body.playlistLink;
    const playlistCaption = req.body.playlistCaption;
    const user = User.findOne({"username":req.body.user})
    const newPost = {
        user : user,
        playlist_name : playlistName,
        playlist_link : playlistLink,
        caption : playlistCaption
    }    
    const new_post = new Post(newPost)
    const saved = await new_post.save();
    if(!saved) throw Error('save post error!')
    res.status(200).json(saved);


})

module.exports = router