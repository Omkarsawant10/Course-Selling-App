import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";

export const userMiddleware=(req,res,next)=>{
    const token=req.headers["token"];

    const decodedToken=jwt.verify(token,JWT_USER_PASSWORD);

    if(decodedToken){
        req.userId=decodedToken._id;
        next();
    }else{
        res.status(403).json({
            message:"Invalid crediantials"
        })
    }
}