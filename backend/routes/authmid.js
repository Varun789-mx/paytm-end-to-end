import jwt from "jsonwebtoken";
import config from "../config.js";

const authmiddleware = (req, res, next) => {
  const authheader = req.headers.Authorization;
  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(401).json({
      msg: "Missing or incorrect header"
    });
  }

  const token = authheader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (decoded.id) {
      req.id = decoded.id;
      next();
    }
  } catch (error) {
    return res.status(202).json({
      msg: "verification failed",
    });
  }
};

export default authmiddleware;