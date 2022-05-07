const express = require("express");
const app = express();
const authController = require("../controllers/book.controller");
const middleware = require("../middleware/middleware");

app.post("/create", middleware.isValidToken, authController.createBook);
app.get("/allbooks", middleware.isValidToken, authController.allBooks);

module.exports = app;
