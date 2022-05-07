const express = require("express");
const app = express();
const userController = require("../controllers/user");
const middleware = require("../middleware/middleware");

app.get("/", middleware.isValidToken, userController.getAllUser);
app.put("/:userId", middleware.isValidToken, userController.updateUser);
app.delete("/:userId", middleware.isValidToken, userController.deleteUser);

module.exports = app;
