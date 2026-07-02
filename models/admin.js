import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
});

const Admin = model("Admin", userSchema);

export default Admin;