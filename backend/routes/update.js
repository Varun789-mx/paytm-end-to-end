import express from "express";
import { User_Schema } from "../db.js";
import updateschema from "./zodschemas/uservalidate.js";
import bcrypt from "bcrypt";
import cors from "cors";
const saltRounds = 10;

const update = express();

update.use(express.json());
update.use(cors());

update.put("/update", async (req, res) => {
  try {
    const payload = {
      _id: req.body._id,
      Password: req.body.Password,
    };
    const valid_data = updateschema.safeParse(payload);
    if (!valid_data.success) {
      return res.status(411).json({
        msg: "Incorrect inputs",
        issues: valid_data.error.issues,
      });
    }
    return res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    return res.status(411).json({
      msg: "Something went wrong",
      error: error,
    });
  }
});

update.listen(9000, () => {
  console.log("server started on http://localhost:9000/update");
});
