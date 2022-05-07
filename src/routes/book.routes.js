const express = require("express");
const app = express();
const authController = require("../controllers/book.controller");
const middleware = require("../middleware/middleware");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/images`);
  },
  filename: function (req, file, cb) {
    let extension = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({
  storage: diskStorage,
});

app.post(
  "/create",
  middleware.isValidToken,
  upload.single("coverImage"),
  authController.createBook
);
app.get("/allbooks", middleware.isValidToken, authController.allBooks);

module.exports = app;
