const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const Comment = require('../models/Comment')

router.post('/user',async(req,res)=>{
    const user = req.body.username
    const post = req.body.post
    const comments = await Comment.find({"user":user,
                                        "post":post});
    res.status(200).json(comments)
})

router.post('/',async (req,res)=>{
    try{
    const new_comment = new Comment(
        {
            content : req.body.content,
            user : req.body.user,
            post : req.body.post
        }
    )
    const saved = await new_comment.save();
    if(!saved) throw Error('Comment Save Error')
    res.status(200).json(saved);
    }
    catch(e){
        res.status(400).json({msg: e.message})
    }
})

module.exports = router
