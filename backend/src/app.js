const express=require('express');
const app=express();
const noteModel=require('./model/note.model');
app.use(express.json());
const path=require('path');
module.exports=app;

const cors=require('cors');
app.use(cors());
app.use(express.static('./public/dist'));
app.post('/notes',async(req,res)=>{

    const {title,description}=req.body;
    const note=await noteModel.create({
     title,description
    })
   res.status(201).json({
    message:"Note created successfully",
    note,
   })

})

app.get('/notes',async(req,res)=>{
    const notes=await noteModel.find();

    res.status(200).json({
        message:"Notes fetched successfully",
        notes,
    })
})

app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note deleted successfully",

    })
})

app.patch('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const {description}=req.body;
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated successfully"

    })
})
// console.log(__dirname); 

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/dist/index.html"))
})