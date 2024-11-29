import express from "express";
import authmid from "./routes/authmid.js";
import cors from "cors";

// import Signup from "./routes/Signup.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(authmid);

app.get("/api/v1/user", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Backend started at ${port}`);
});
