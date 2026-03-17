const mongoose=require('mongoose')

async function  coonectToDb(){
   await mongoose.connect(process.env.URI)
   console.log("connected to Database successfully")
   
}

module.exports=coonectToDb;