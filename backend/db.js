import mongoose from "mongoose";
import config from "./config.js";
try {
  mongoose.connect(config.MONGOOSE_URI);
} catch (error) {
  console.log("Connection failed", error);
}

const user = new mongoose.Schema(
  {
    First_name: { type:String, required: true },
    Last_name: { type:String, required: true },
    Email: { type:String, required: true, unique: true, },
    Mobile: String,
    Password: { type:String, required: true },
  },
  { timestamps: true }
);

export  const User_Schema = mongoose.model("User_Schema", user);
