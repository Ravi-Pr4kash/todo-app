const express = require('express');
const app = express();
require("./connection/conn.js")
const auth = require("./routes/auth.js")
 

app.get('/', (req,res)=>{
    res.send("Hello");
})

app.use(express.json())
app.use("/api/v1", auth )
app.listen(3000, ()=>{
    console.log("Server Started ")
})