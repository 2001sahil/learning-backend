const express=require("express")
const userschema=require("./noteschema")
const router=express.Router()
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
        // console.log(req.id,req.body.Name,req.body.PhoneNO)
        const {Name,PhoneNO,password}=req.body;
        // console.log("ok")
        // console.log(req.id)
        const data=new userschema({Name:Name,PhoneNo:PhoneNO,password:password,user:req.id})
        // cons
        data.save()
        res.send(data)        
    } catch (error) {
        console.log("error")      
        res.send("Here an unexpected error occured")        
    }
})
router.delete("/deletenote",fetuser,async(req,res)=>{
    try{
        const note=await userschema.findById(req.body.id)
        console.log(note)
        if(note.user.toString()!==req.id){
            return res.send("Not autherised")
        }  
        const data=await userschema.deleteOne({_id:req.body.id});
        res.send("succesfully deleted")

    }catch(error){
        res.send("Here an unexpected error occured")
    }
})
router.put("/update:id",fetuser,async (req,res)=>{
    try {
        const note=await userschema.findById(req.params.id)
        if(!note){
            return res.send("wrong id provided")
        }
        if(note.user.toString()!==req.id){
            return res.send("Not autherised")
        }      
        await userschema.findByIdAndUpdate({_id:req.params.id},{$set:{ Name:req.body.Name}},{new:true})
        res.send("updated successfully")
    } catch (error) {
        console.log("error")      
        res.send("Here an unexpected error occured")        
    }
})


module.exports=router
