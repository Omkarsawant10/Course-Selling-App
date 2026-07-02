import express from "express";
export const courseRouter=express.Router();

courseRouter.post("/purchase",(req,res)=>{

})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"Preview Endpoint"
    })
})