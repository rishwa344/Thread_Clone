const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    profilePic:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    public_id:{
        type:String
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    threads: [{type:mongoose.Schema.Types.ObjectId,ref:"post"}],
    replies: [{type:mongoose.Schema.Types.ObjectId,ref:"comment"}],
    reposts: [{type:mongoose.Schema.Types.ObjectId,ref:"post"}],

},{timestamps:true});

module.exports = mongoose.model("user",userSchema);