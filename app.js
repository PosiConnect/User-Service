const express = require("express");
const app = express();
const errorMiddleware = require("../User-Service/middlewares/error");
const cookieParser = require("cookie-parser");
const auth = require("./Routes/auth");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", auth);

app.use(errorMiddleware);

module.exports = app;
