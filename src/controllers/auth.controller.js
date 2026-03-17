const userModel = require('../model/user.model')
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const bcrypt=require('bcryptjs')

async function registrationController(req,res){
    const { email, username, password, bio, profilePicture } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]

    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")

        })
    }
    const hash = await bcrypt.hash(password,10)
    
    const user = await userModel.create({
        username,
        email,
        bio,
        profilePicture,
        password: hash
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" }
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profilePicture:user.profilePicture

        }
    })
}

async function loginController(req,res){
      const{username,email,password}=req.body
  /** 
   * *username
   * *password
   * 
   * *email
   * *password
   */

  const user= await userModel.findOne(
    {
        $or:[
            {
                username: username
            },
            {
                email:email
            }
        ]
    }
  )
  if(!user){
  return res.status(404).json({
    message:"User not found"
  })
}


const isPasswordValid= await bcrypt.compare(password,user.password)

if(!isPasswordValid){
    return res.status(401).json({
        message:"password invalid"
    })
}
const token =jwt.sign(
    {
        id:user._id
    },process.env.JWT_SECRET
)

res.cookie("token",token)

res.status(200).json({
    message:"User loggedIn successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profilePicture:user.profilePicture
    }
})
}

module.exports={
    registrationController,
    loginController,
}