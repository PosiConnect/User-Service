const express = require("express");
const app = express();
const errorMiddleware = require("../userService/middlewares/error");
const cookieParser = require("cookie-parser");
const auth = require("./Routes/auth");
const cors = require("cors");

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/userservice", auth);

app.use(errorMiddleware);

module.exports = app;
