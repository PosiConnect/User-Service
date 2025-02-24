const express = require("express");
const app = express();
const errorMiddleware = require("../back-end/middlewares/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//User Service
app.use("/api/v1", auth);

module.exports = app;
