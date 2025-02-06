const User = require('../models/user-model');
const Post = require('../models/post-model');
const Comment = require('../models/comment-model');
const mongoose = require("mongoose");

exports.addComment = async (req,res)=>{
    try{
        const {id} = req.params;
        const {text} = req.body;
        if(!id){
            return res.status(400).json({msg:"Id is required"});
        }
        if(!text){
            return res.status(400).json({msg:"No comment added!!"});
        }
        const post = Post.findById(id);
        if(!post){
            return res.status(400).json({msg:"No such post exists"});
        }
        const comment = new Comment({
            text,
            admin: req.user._id,
            post: post._id,
        });
        const newComment = await comment.save();
        await Post.findByIdAndUpdate(id,{
            $push:{comments:newComment._id}
        },{new:true});
        await User.findByIdAndUpdate(req.user._id,{
            $push:{replies:newComment._id}
        },{new:true});
        return res.status(201).json({msg:"Commented!",});
    }catch(err){
        return res.status(400).json({msg:"Error in commenting!!!",});
    }
}

exports.deleteComment = async (req,res)=>{
    try{
        const {id,postId} = req.params;
        if(!id || !postId){
            return res.status(400).json({msg:"Id is required"});
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({msg:"Post not exists"});
        }
        const commentExists = await Comment.findById(id);
        if(!commentExists){
            return res.status(400).json({msg:"Comment not exists"});
        }
        const newId = new mongoose.Types.ObjectId(id);
        if(!post.comments.includes(newId)){
            return res.status(400).json({msg:"Post does not have this comment"});
        }
        const id1 = req.user._id.toString();
        const id2 = commentExists.admin._id.toString();
        if(id1 !== id2){
            return res.status(400).json({msg:"You are not authorized to delete this comment"});
        }
        await Post.findByIdAndUpdate(postId,{
            $pull:{comments:id}
        },{new:true});
        await User.findByIdAndUpdate(id,{
            $pull:{replies:id}
        },{new:true});
        await Comment.findByIdAndDelete(id);
        return res.status(400).json({msg:"Comment Deleted Successfully!!"});
    }
    catch(err){
        return res.status(400).json({msg:"Error in deleting comment",err:err.message});
    }
}