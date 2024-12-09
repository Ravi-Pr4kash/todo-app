const router = require('express').Router();
const User = require("../models/users");
const List = require("../models/list");
const list = require('../models/list');


// CREATE
router.post("/addTask", async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const email = req.body.email;

        const existingUser = await User.findOne({
            email: email
        })
        if (existingUser) {
            const list = new List({ title, description, user: existingUser })
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list)
            existingUser.save()
        }
    } catch (error) {
        console.log("error")
    }
})


// UPDATE
router.put("/updateTask/:id", async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const email = req.body.email;

        const existingUser = await User.findOne({
            email: email
        })
        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, {
                title,
                description,
            })
            list.save().then(() => res.status(200).json({ message: "Task Updated " }))
        }
    } catch (error) {
        console.log("error")
    }
})

// DELETE
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const email = req.body.email;

        const existingUser = await User.findOneAndUpdate({email},{$pull: {list: req.params.id}}) 
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id,).then(() => res.status(200).json({ message: "Task Deleted" }))
        }
    } catch (error) {
        console.log("error")
    }
})

// GET TASK

router.get("/getTasks/:id", async(req,res)=> {
    const list = await  List.find({user:req.params.id}).sort({createdAt: -1})
    
    if(list.length !== 0){
        res.status(200).json({list: list})
    }else{
         res.status(200).json({
            message: "No Tasks "
         })
    }

     
})

module.exports = router