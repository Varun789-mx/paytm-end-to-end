import express from "express";
import { User_Schema } from "../db.js";
// import validation from "./zodschemas/uservalidate.js";
import bcrypt from "bcrypt";
import cors from "cors";
import { z } from "zod";
const saltRounds = 10;

const update = express();

update.use(express.json());
update.use(cors());

const validation = z.object({
  Email: z.string().email().min(5),
  Password: z.string().min(5),
  New_Password: z.string().min(5),
});
update.put("/update", async (req, res) => {
  try {
    const payload = {
      Email: req.body.Email,
      Password: req.body.Password,
      New_Password: req.body.New_Password,
    };
    const valid_data = validation.safeParse(payload);
    if (!valid_data.success) {
      return res.status(411).json({
        msg: "Incorrect inputs",
        issue: valid_data.error.issues,
      });
    }
    const user = await User_Schema.findOne({
      Email: valid_data.data.Email,
    });
    const valid_Pass = await bcrypt.compare(
      valid_data.data.Password,
      user.Password
    );
    if (!valid_Pass) {
      return res.status(404).json({
        msg: "Incorrect Email or password",
      });
    }

    const hash = await bcrypt.hash(valid_data.data.New_Password, saltRounds);
    user.Password = hash;
    await user.save();
    return res.status(200).json({
      msg: "Success",
      new_password: hash,
    });
  } catch (error) {
    console.log("error occurred", error);
    return res.status(411).json({
      msg: "Something went wrong",
    });
  }
});

update.listen(9000, () => {
  console.log("server started on http://localhost:9000/update");
});
