import express from "express";
import cors from "cors";
import { User_Schema } from "../db.js";
import new_user from "./zodschemas/schema.js";
import jwt from "jsonwebtoken";
const Signup = express();
const JWT_SECRET = "HARSH@O57";

Signup.use(express.json());
Signup.use(cors());

Signup.post("/signup", async (req, res) => {
  try {
    const payload = {
      First_name: req.body.First_name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
      Password: req.body.Password,
    };
    const valid_data = new_user.safeParse(payload);
    if (!valid_data.success) {
      return res.json({
        msg: "Invalid inputs",
        issue: valid_data.error.issues,
      });
    }
    const existing = await User_Schema.findOne({
      Email: valid_data.data.Email,
    });
    if (existing) {
      return res.status(411).json({
        msg: "User already exists",
      });
    }
    const fresh_user = await User_Schema.create(valid_data.data);
    const token = jwt.sign(
      { id: valid_data.data._id, email: valid_data.data.Email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(300).send({
      msg: "User successfully created",
      token,
    });
  } catch (error) {
    console.log("Error in server", error);
    res.status(411).json({
      msg: "Error in server",
    });
  }
});

module.exports = Signup;
