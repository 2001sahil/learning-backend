const express=require("express")
const user=require("./schema")
const { body, validationResult } = require('express-validator');
const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs');
const router=express.Router()
const jwt = require('jsonwebtoken');
const { fetuser } = require("./middleware/fetuser");
const sec="navjanjdnavjnajnjv"
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
      const salt=await bcrypt.genSalt(10)
      const src=await bcrypt.hash(req.body.password,salt)
    
     newuser=await  user.create({
      Name:req.body.Name,
      password:src,
      email:req.body.email
     })
    
    const data={
      userid:{
      id:newuser.id
    }}
    const auth=jwt.sign(data,sec)
    // console.log(auth)

    newuser.save()
    res.send(newuser)
})
router.post("/login",async (req,res)=>{
    // const errors = validationResult(req);
    // // console.log("runned")
    // if (!errors.isEmpty()) {
    //     return res.status(400).send("Unknown error");
    //   }
    try{
      const {Name,password,Email}= await req.body;
      console.log(Name,password,req.body.email)
      const query=await user.findOne({email:req.body.email})
      if(!query){
        return res.send("wrong email")
      }
      const comp=await bcrypt.compare(password,query.password)
      if(!comp){
        return res.send("password doesn't matches")
      }
      
      const data={
        query:{
          id:query.id
        }}
      const auth= await jwt.sign(data,sec)
      // console.log("OKKKK")
      res.send({auth})

    }
    catch(err){res.send(err)}
})
router.post("/getuser",fetuser,async (req,res)=>{
  console.log(req.id)
  const data=await user.findOne({_id:(req.id)})
  // console.log(data)
  res.send(data)

})

module.exports=router