// try to update to see if this shown on github or not
const express=require("express")
const user=require("./schema")
// var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
// const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs');
const router=express.Router()
const jwt = require('jsonwebtoken');
const { fetuser } = require("./middleware/fetuser");
const sec="navjanjdnavjnajnjv"
router.post("/",
    body('Name').isString(),
    body('password').isLength({ min: 5 }),async (req,res)=>{
    const errors = validationResult(req);
    sucess=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ sucess,errors: errors.array() });
      }
      let User=await user.findOne({Name:req.body.Name})
      if(User){
        return res.send({sucess,result:"Name are same"})
      }
      const salt=await bcrypt.genSalt(10)
      const src=await bcrypt.hash(req.body.password,salt)
    
     newuser=await  user.create({
      Name:req.body.Name,
      password:src,
      email:req.body.email
     })
    newuser.save()
    sucess=true;
    res.send({sucess,reult:"New user created sucessfully"})
})
router.post("/login",async (req,res)=>{
    try{
      sucess=false;
      const [Name,password,Email]= await [req.body.Name,req.body.password,req.body.email];
      console.log(Name,password,req.body.email)
      const query=await user.findOne({email:req.body.email})
      if(!query){
        return res.send({sucess,result:"wrong email"})
      }
      const comp=await bcrypt.compare(password,query.password)
      if(!comp){
        return res.send({sucess,result:"password doesn't matches"})
      }
      const data={
        query:{
          id:query.id
        }}
      sucess=true;
      const auth= await jwt.sign(data,sec)
      res.send({sucess,result:auth})
    }
    catch(err){res.send({sucess,result:err})}
})
router.post("/getuser",fetuser,async (req,res)=>{
  const data=await user.findOne({_id:(req.id)})
  res.send(data)
})
module.exports=router