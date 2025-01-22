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
const user_ledger = new mongoose.Schema(
  {
    User_id: mongoose.Schema.Types.ObjectId,
    ref: user,
    Balance: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const User_Schema = mongoose.model("User_Schema", user);
const Ledger = mongoose.model("Ledger", user_ledger);
module.exports = { User_Schema, Ledger };
