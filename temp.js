const express=require("express")
const user=require("./schema")
const { body, validationResult } = require('express-validator');
const {MongoClient} = require('mongodb');
// const uri = "mongodb://127.0.0.1:27017/newdbbb";
// const client = new MongoClient(uri);

const router=express.Router()
router.get("/",
    body('Name').isString(),
    body('password').isLength({ min: 5 }),async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let User=await user.findOne({Name:req.body.Name})
      if(User){
        return res.send("Name are same")
      }
      
    
     newuser=await  user(req.body)
    newuser.save()
    res.send("ok")
})
module.exports=router