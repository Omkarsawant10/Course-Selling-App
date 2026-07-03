import { Schema, model } from "mongoose";
import mongoose from "mongoose";
console.log("connected to")
mongoose.connect("mongodb+srv://omkarsawant29444_db_user:VCp3jUvBpght6YOi@cluster0.ugeqa1r.mongodb.net/coursera-app?appName=Cluster0")
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
});

export const Admin = model("Admin", adminSchema);

