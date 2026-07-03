import express from "express";
export const adminRouter=express.Router();
import { Admin } from "../models/admin.js";
import { Course } from "../models/course.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {z} from "zod"
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../middlewares/admin.js";

adminRouter.post("/signup",async(req,res)=>{
    const requireBody=z.object({
        email:z.string().email(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
      })
   
      const parsedDataWithSuccess=requireBody.safeParse(req.body);
   
     if(!parsedDataWithSuccess.success){
        res.json({
           message:"Incorrect format",
           error:parsedDataWithSuccess.error
        })
        return
     }
      const {email,password,firstName,lastName}=req.body;
      const hashedPassword=await bcrypt.hash(password,10);
      try {
         await Admin.create({
         email,
         password:hashedPassword,
         firstName,
         lastName
       })
      } catch (error) {
         res.json({
           error
         })
      }
   
      res.json({
       message:"Signup succeeded"
      })
})

adminRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    
    const admin=await Admin.findOne({
        email
    });

    if (!admin) {
    return res.status(401).json({
        message: "Invalid credentials"
    });
    }  

    const isPasswordMatch=await bcrypt.compare(password,admin.password);
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }
    
        const token=jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD)
        res.json({
            token
        })
})

adminRouter.post("/course",adminMiddleware,async (req,res)=>{
    const adminId=req.adminId;
    const {title,description,price,imageUrl}=req.body;
    
    const course=await Course.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    })

    res.json({
        messsage:"Course created",
        coureseId:course._id
    })
})

adminRouter.put("/course",adminMiddleware,async (req,res)=>{
    const adminId=req.adminId;
    const {title,description,price,imageUrl}=req.body;
    const courses=await Course.find({
        creatorId:adminId
    })

    res.json({
      courses
    })
})

adminRouter.get("/course/bulk",(req,res)=>{
    
})