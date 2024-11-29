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
      confirm_Password: req.body.confirm_Password,
    };
    console.log(payload);
    const parsed_payload = updateschema.safeParse(payload);
    if (!parsed_payload.success) {
      return res.status(411).json({
        msg: "Incorrect inputs",
        issues: parsed_payload.error.issues,
      });
    }
    if (
      !parsed_payload.data.Password === parsed_payload.data.confirm_Password
    ) {
      return res.status(411).json({
        msg: "Password and confirm password doesn't match",
      });
    }
    const hashed = await bcrypt.hash(parsed_payload.data.Password, saltRounds);
    const user = User_Schema.findOne({
      _id: parsed_payload.data._id,
    });
    if (!user) {
      return res.json(411).json({
        msg: "user not found",
      });
    }
    user.Password = hashed;
    await User_Schema.updateOne(
      { _id: user._id },
      { Password: user.Password }
    );

    return res.status(202).json({
      msg: "Password changed succesfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(411).json({
      msg: "Request unsuccesfull",
    });
  }
});

update.listen(9000, () => {
  console.log(`started on 9000`);
});
