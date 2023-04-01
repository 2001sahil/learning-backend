const express=require("express")
const app=express()
var cors = require('cors')
const path=require('path')
const port=8000
// import faa from '../my-app/build'
app.get("/",(req,res)=>{
    res.send("HII")
})
app.use(express.json())
app.use(cors())
// static files////////////////////
app.use(express.static(path.join(__dirname,'../my-app/build')))

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,'../my-app/build/index.html'))
})






app.use("/temp",require("./temp"))
app.use("/note",require("./Note"))
app.listen(port,()=>{
    console.log("app started")
})
const Mongo=require('./Mongo');
Mongo.Mongo()