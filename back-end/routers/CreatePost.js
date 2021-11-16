const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const multer = require('multer')
const DATA_URL = "https://my.api.mockaroo.com/user.json?key=99391580"
const POST_URL = "https://my.api.mockaroo.com/post.json?key=99391580"


// }
// /*
// A middleware that console out the request original url
// */
// function logger(req, res, next) {
// 	console.log(req.originalUrl)
// 	next()
// }


// router.get('/newpost',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/../front-end/src/components/NewPost.jsx'))
// })
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

router.get("/", logger, (req, res, next) => {
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
    const playlistCaption = req.body.caption;
    const newPost = {
        postID : postId,
        playlistName : playlistName,
        playlistLink : playlistLink,
        playlistCaption : playlistCaption
    }
    res.status(200).send(newPost)
})

module.exports = router