// import Mongo from "./Mongo"
// npm run dev
const express=require("express")
const app=express()
const port=8000;
app.get("/",(req,res)=>{
    res.send("HII")
})
app.use(express.json())
app.use("/temp",require("./temp"))
app.listen(port,()=>{
    console.log("app started")
})
const Mongo=require('./Mongo');
Mongo.Mongo()