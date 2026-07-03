import express from "express";
import { User } from "../models/user.js";
export const userRouter=express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {z} from "zod"
import { JWT_USER_PASSWORD } from "../config.js";

userRouter.post("/signup",async (req,res)=>{
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
      await User.create({
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

userRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    
    const user=await User.findOne({
        email
    });

    if (!user) {
    return res.status(401).json({
        message: "Invalid credentials"
    });
    }  

    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

        const token=jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD)
        res.json({
            token
        })
    
})

userRouter.post("/purchases",(req,res)=>{
    
})
