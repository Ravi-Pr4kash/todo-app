const mongoose = require("mongoose");
 
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    user: [{
        type: mongoose.Types.ObjectId, 
        ref: "users"
    },
], 
},{
    timestamps: true
});

module.exports = mongoose.model('list', ListSchema )