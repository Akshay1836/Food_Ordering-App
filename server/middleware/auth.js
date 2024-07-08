const jwt=require("jsonwebtoken");
const asynchandler=require("express-async-handler");

const authMiddleware=asynchandler(async(req,res,next)=>{
        const {token}=req.headers;
        if(!token){
                return res.status(401).json({success:false,message:"unauthorized access,Please Login"})
        }
        const token_code=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_code);
        req.body.userId=token_code.id;
        next();
})
 
module.exports=authMiddleware;
