const mongoose = require('mongoose');

var scheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    gender: String,
    status: String
})

const userdb = mongoose.model('userdb',scheme);
module.exports= userdb;