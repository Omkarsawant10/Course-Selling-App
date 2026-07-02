import { Schema,model } from "mongoose";

const purchaseSchema=new Schema({
    userId:{
        types:Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        types:Schema.Types.ObjectId,
        ref:"Course"
    }
})

export const Purchase=model("Purchase",purchaseSchema)