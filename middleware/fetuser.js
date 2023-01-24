const jwt = require('jsonwebtoken');
const sec="navjanjdnavjnajnjv"
const fetuser=(req,res,next)=>{
    const token=req.header("auth")
    if(!token){
        return res.send("Token not recieved")
    }
    const com=jwt.verify(token,sec)
    if(!com){
        return res.send("Token not matched")
    }
    // console.log(com)
    // console.log(com.query.id)
    req.id=com.query.id
    next()
}
module.exports={fetuser}
