require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const fs = require("fs");
const cors = require("cors");

const connectDb = require("./utils/db");
// must used before all routes
app.use(express.json()); //middleware that parses json from requests
// body
app.use(cors());

// it is called mounting a router
app.use("/user", userRouter);
app.use("/api", authRouter);

// app.get("/register", (req, res) => {
//     res.status(200).send("register")
// })

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`);
  });
});
