import express from "express";
import { User_Schema } from "../db.js";
import jwt from "jsonwebtoken";
import signin_user from "./zodschemas/uservalidate.js";
const JWT_SECRET = config.JWT_SECRET;
import bcrypt from "bcrypt";
import cors from "cors";
import config from "../config.js";

const signin = express();

signin.use(express.json());
signin.use(cors());

signin.post("/signin", async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(411).json({
        msg: "Email or password is required",
      });
    }
    const valid_data = signin_user.safeParse({ Email, Password });
    if (!valid_data.success) {
      return res.status(411).json({
        msg: "Incorrect format",
        issue: valid_data.error.issues,
      });
    }
    const user = await User_Schema.findOne({ Email });
    if (!user) {
      return res.status(404).json({
        msg: "user not found please sign up",
      });
    }

    const valid_Pass = bcrypt.compare(valid_data.data.Password, Password);
    if (!valid_Pass) {
      return res.status(404).json({
        msg: "Incorrect Email or password",
      });
    }

    const token = jwt.sign({ id: user._id, Email: user.Email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      msg: "User logged in successfully",
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(404).json({
      msg: "Server unreachable",
      issues: error,
    });
  }
});

export default signin;
