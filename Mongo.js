mongoose=require("mongoose")
mongoose.set('strictQuery', true);
const mongoDB="mongodb://127.0.0.1:27017/react-database"
const Mongo=()=>{
  return(
  mongoose.connect(mongoDB,(err)=>{
    if(err){
      console.log(`here an error ocurred${err}`)
    }
    else{
      console.log("Mongodb is connected")
    }
 })
)}
module.exports={Mongo}


