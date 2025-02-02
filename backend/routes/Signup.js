import express from "express";
import bcrypt, { hash } from "bcrypt";
import cors from "cors";
import { User_Schema } from "../db.js";
import new_user from "./zodschemas/schema.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const Signup = express();
const JWT_SECRET = config.JWT_SECRET;
const saltRounds = 10;

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

    const hashed_Pass = await bcrypt.hash(valid_data.data.Password, saltRounds);
    valid_data.data.Password = hashed_Pass;
    const fresh_user = await User_Schema.create(valid_data.data);

    const token = jwt.sign(
      { id: valid_data.data._id, email: valid_data.data.Email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(300).send({
      msg: "User successfully created",
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    console.log("Error in server", error);
    res.status(411).json({
      msg: "Error in server",
    });
  }
});

export default Signup;
