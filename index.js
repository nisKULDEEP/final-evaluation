const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const userRoute = require("./src/routes/user.routes");
const authRoute = require("./src/routes/auth.routes");
const bookRoute = require("./src/routes/book.routes");
const commentRoute = require("./src/routes/comment.routes");
//Middleware
app.use(express.json());

//Routes

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/book", bookRoute);
app.use("/comment", commentRoute);
//Mongoose Database Server
const db = process.env.DB_URL;

mongoose.connect(db).then(function () {
  console.log("Server started");
});

//Local Server
const port = 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

module.exports = app;
