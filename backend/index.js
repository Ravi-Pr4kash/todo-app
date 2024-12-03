const mongoose = require('mongoose');
const express = require('express');
const app = express();

const TaskSchema = new mongoose.Schema({
    title: {type: String, require: true, minlength: 3},
    description: {type: String},
    status: {type: String, enum: ['pending','completed'], default: 'pending'},
    timestamp: {type: Date, default: Date.now}
});

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;

app.use(express.json());


app.post('/Task', async(req,res)=>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
    }
});
