const express=require("express")
const user=require("./schema")
const { body, validationResult } = require('express-validator');
const {MongoClient} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/newdbbb";
const client = new MongoClient(uri);
async function  fun(q){
    const database = client.db("newdbbb");
    const movies = database.collection("users");
    const query = { Name: q };
    const movie = await movies.findOne(query);
    if(movie){
      return 1;
    }
    else{
      return 0;
    }
}
const router=express.Router()
router.get("/",
    body('Name').isString(),
    body('password').isLength({ min: 5 }),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    let a=fun(req.body.Name);
    a.then((err)=>{
      if(err===1){
        res.send("name cann't be same")
      }
      else{
        newuser=user(req.body)
        newuser.save()
        res.send("ok")
      }
    })
})
module.exports=router