const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already exists"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
     type:String,
     required:[true,"password is required"]
    },

    bio:String,

    profilePicture:{
        type:String,
        default:'https://ik.imagekit.io/yjm2w7pqz/istockphoto-1495088043-612x612.jpg'
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel