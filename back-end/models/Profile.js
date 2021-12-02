const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    first:{
        type: String,
        required: true
    },
    last:{
        type: String,
        required: true
    },
    age: {
        type: Int,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Profile = mongoose.model('Profile', profileSchema) 
module.exports = Profile