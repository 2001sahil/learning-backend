const mongose=require("mongoose")

const data=new mongose.Schema({
    user:{
        type:mongose.Schema.Types.ObjectId,
        ref:"User",
    },
    Name:{

        type:String

    },
    PhoneNo:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true
    }
})
const User = mongose.model("Notes", data);

module.exports=User