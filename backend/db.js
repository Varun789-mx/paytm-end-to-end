import mongoose from "mongoose";
import config from "./config.js";
try {
  mongoose.connect(config.MONGOOSE_URI);
} catch (error) {
  console.log("Connection failed", error);
}

const user = new mongoose.Schema(
  {
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Mobile: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

// const accoutschema = new mongoose.Schema(
//   {
//     userid: {
//       id: mongoose.Types.ObjectId,
//       ref: user
//     },
//     balance: {
//       type: Number,
//       required: true,
//       default: 0.0,
//     },
//   },
//   { timestamps: true }
// );

export const User_Schema = mongoose.model("User_Schema", user);
// export const Balance = mongoose.model("Balance", accoutschema);
