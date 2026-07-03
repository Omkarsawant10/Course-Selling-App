import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config.js";

export const adminMiddleware=(req,res,next)=>{
    const token=req.headers["token"];

    const decodedToken=jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(decodedToken){
        req.adminId=decodedToken._id;
        next();
    }else{
        res.status(403).json({
            message:"Invalid crediantials"
        })
    }
}