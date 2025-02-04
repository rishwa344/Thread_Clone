const express = require("express");
const {signin,login, userDetails,followUser, updateProfile, searchUser, logout, myInfo} = require('./controllers/user-controller');
const auth = require("./middleware/auth");
const {addPost, allPosts, deletePost, likePost} = require("./controllers/post-controller");
const router = express.Router();
router.post('/signin',signin);
router.post('/login',login);
router.post('/logout',auth,logout);
router.get('/user/:id',auth,userDetails);

router.get('/me',auth,myInfo);
router.put("/user/follow/:id",auth,followUser);
router.put("/update",auth,updateProfile);
router.get("/users/search/:query",auth,searchUser);


router.post("/post",auth,addPost);
router.get("/post",auth,allPosts);
router.delete("/post/:id",auth,deletePost);
router.put("/post/like/:id",auth,likePost);


const protected = async (req,res)=>{
    res.status(200).json({msg:"Access done!"})
}
router.get("/demo",auth,protected);

module.exports = router;