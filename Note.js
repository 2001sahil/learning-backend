const express=require("express")
const userschema=require("./noteschema")
const router=express.Router()
// const router=express.Router()
const { fetuser } = require("./middleware/fetuser");
router.get("/getnote",fetuser,async (req,res)=>{
    try {
        const notes=await userschema.find({user:req.id})
        res.send(notes)        
    } catch (error) {
        res.send("Here an error occured")  
        console.log("error")      
    }
})
router.post("/addnote",fetuser,async (req,res)=>{
    try {
        console.log(req.id,req.body.Name,req.body.PhoneNO)
        const {Name,PhoneNO,password}=req.body;
        console.log("ok")
        const data=new userschema({Name:Name,PhoneNo:PhoneNO,password:password,user:req.id})
        data.save()
        res.send(data)        
    } catch (error) {
        console.log("error")      
        res.send("Here an unexpected error occured")        
    }
})

router.get("/update:id",fetuser,async (req,res)=>{
    try {
        const note=await userschema.findById(req.params.id)
        if(!note){
            return res.send("wrong id provided")
        }
        if(note.user.toString()!==req.id){
            return res.send("Not autherised")
        }      
        // return res.send("success"
        const updated=await userschema.updateMany({Name:req.body.Name,PhoneNo:req.body.PhoneNO})
        const data=await userschema.findById(req.params.id)
        res.send(data)
    } catch (error) {
        console.log("error")      
        res.send("Here an unexpected error occured")        
    }
})


module.exports=router
