import { Schema,model } from "mongoose";

const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:{
        types:Schema.types.ObjectId,
        ref:"User",
    }
})

export const Course=model("Course",courseSchema)