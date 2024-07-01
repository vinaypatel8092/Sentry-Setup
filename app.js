require("dotenv").config();
const express = require("express");
const sentry = require("./sentry");
const db = require("./db");
const usersRouter = require("./users");
const errorHandler = require("./errorHandler");

const app = express();
app.use(express.json());
app.use("/api", usersRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
})