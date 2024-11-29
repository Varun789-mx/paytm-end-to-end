import express from "express";
import signin_user from "./routes/zodschemas/uservalidate";

// import Signup from "./routes/Signup.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(signin_user);

app.get("/api/v1/user", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Backend started at ${port}`);
});
