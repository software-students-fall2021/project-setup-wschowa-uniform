import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

// is the environment variable, NODE_ENV, set to PRODUCTION
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 // import path from "path"
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 dbconf = '';
}

// users
// * authentication required
// * so users have a username and password
const User = new Schema({
    username : {type: String, require : true},
    password : {type: String, require : true, min: 18},
    gender : {type: String, enum:['male','female','prefer not to tell']},
    // posts : [Post]
},{timestamps : true})



const Comment = new Schema({
    content : {type : String, require: true, max:65},
    user : User,
    isReply : Boolean,
    replyTo : Comment,  
})

// Post
// * each Post must have a related user,
// * they also can have 0 or more comments

const Post = new Schema({
  user: {type: User,require: true},
  playlist_name : {type: String, required: true},
  playlist_link : {type:String, require: true},
  caption: {type: String, required: true},
  comments : [Comment]
})





mongoose.model('User',User);
mongoose.model('Post',Post);
mongoose.model('Comment',Comment);

mongoose.connect(dbconf);




