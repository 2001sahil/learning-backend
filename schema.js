const mongose=require("mongoose")

const data=new mongose.Schema({
    Name:{
        type:String,
        require:true
    },
    PhoneNo:{
        type:Number,
        require:true
    },
    password:{
        type:Number,
        require:true

    },
    Address:{
        type:String,
        require:true
    }
})
const User = mongose.model("User", data);

module.exports=User