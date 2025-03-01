const express = require("express");
const app = express();
const errorMiddleware = require("../User-Service/middlewares/error");
const cookieParser = require("cookie-parser");
const auth = require("./Routes/auth");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", auth);

app.use(errorMiddleware);

module.exports = app;
