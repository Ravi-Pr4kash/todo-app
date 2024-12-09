const express = require("express");
const app = express();
const User = require("../models/users")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "RAviPRAKASH"


 app.post('/signup', async(req,res)=>{
    try {
        // const {email,username,password} = req.body;//    ====> can also be wriiten like this 
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password,5);

        await  User.create({
            email: email,
            username: username,
            password: hashedPassword
        }).then(()=>{
            res.status(200).json({
                message: "User Created"
             })
        })
    } catch (e) {
        res.status(400).json({
            message: "User Already Exists"
        })
    }
 })


 app.post('/signin', async(req,res)=>{
    try {
        const email = req.body.email;
    const password = req.body.password

    const user = await User.findOne({
        email: email,
    })

    if(!user){
        res.status(400).json({
            message: "No user find"
        })
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    
    if(!passwordMatched){
        res.status(400).json({
            message: "Wrong Password"
        })
    }

    if(passwordMatched){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)
        res.json({
            token: token
        })
    }
    
    } catch (error) {
        res.status(400).json({
            message: "incorrect credentials"
        })
    }

 })



module.exports = app;

 