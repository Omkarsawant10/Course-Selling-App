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

export const Admin = model("Admin", adminSchema);

