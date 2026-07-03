import { Schema,model } from "mongoose";

const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
})

export const Course=model("Course",courseSchema)