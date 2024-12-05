const mongoose = require("mongoose");
 
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    title: {
        type: String, 
        required: true
    },
    list: [{
        type: mongoose.Types.ObjectId, 
        ref: "users"
    }] 
});

module.exports = mongoose.model('list', ListSchema )