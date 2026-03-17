const postModel = require('../model/post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require("jsonwebtoken")
const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostConroller(req, res) {
    console.log(req.body, req.file);

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }
    let decoded = null
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    console.log(decoded);

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })


    const post= await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

async function getPostsController(req,res){
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"UnAuthorized Access"
        })
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Token Invalid"
        })
    }
   const userId=decoded.id

   const posts= await postModel.find({
    user:userId
   })

   res.status(200).json({
    message:"posts fetched successfully",
    posts
   })
    
}

async function getPostDetailsController(req,res){
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"UnAutorized Access"
        })
    }

    let decoded;
 try{
    decoded=jwt.verify(token,process.env.JWT_SECRET)

 }
 catch(err){
   return res.status(401).json({
    message:"Invalid token"
   })
 }

 const PostId=req.params.postId
 
 
 const userId=decoded.id

 
 
 const post= await postModel.findById(PostId)

 if(!post){
    return res.status(404).json({
        message:"Post not found"
    })
 }

 const isValidUser= post.user.toString()===userId


 if(!isValidUser){
    return res.status(403).json({
        message:"Forbidden Content."
    })
 }
 return res.status(200).json({
    message:"Post fetched successfully.",
    post
 })
}
module.exports = {
    createPostConroller,getPostsController,getPostDetailsController
}