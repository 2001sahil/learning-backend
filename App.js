const express=require("express")
const app=express()
var cors = require('cors')
const port=8000;
app.get("/",(req,res)=>{
    res.send("HII")
})
app.use(express.json())
app.use(cors())
app.use("/temp",require("./temp"))
app.use("/note",require("./Note"))
app.listen(port,()=>{
    console.log("app started")
})
const Mongo=require('./Mongo');
Mongo.Mongo()