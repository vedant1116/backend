const mongoose=require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("connected to db successfully");
        
    })
}

module.exports=connectToDb;