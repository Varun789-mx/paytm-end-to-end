import express from "express";

// import Signup from "./routes/Signup.js";

const app = express();
const port = 4000;

// app.use("/api/v1", Signup);

app.get("/api/v1/user", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Backend started at ${port}`);
});
