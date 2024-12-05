 const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true 
    },
    list: [{
        type: mongoose.Types.ObjectId, 
        ref: "list"
    }]
});

module.exports = mongoose.model("users", UserSchema); 