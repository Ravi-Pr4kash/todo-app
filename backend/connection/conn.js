 const mongoose = require('mongoose');

 const conn = async(req,res)=>{
   try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.tvfpf.mongodb.net/todo-list").then(()=>{
        console.log("connected")
    })
   } catch (error) {
    res.status(400).json({
        message: "Bad connection"
    })
   }
 }
 conn();