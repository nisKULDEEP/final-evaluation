const express = require("express");
const app = express();
const commentController = require("../controllers/comment.controller");
const middleware = require("../middleware/middleware");

app.post("/", middleware.isValidToken, commentController);

module.exports = app;
