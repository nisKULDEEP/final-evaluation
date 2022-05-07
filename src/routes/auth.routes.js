const express = require("express");
const app = express();
const authController = require("../controllers/auth.controller");
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

app.post("/signup", upload.array("profileImages", 5), authController.signUp);
app.post("/signin", authController.signIn);
app.put("/signout", authController.signOut);

module.exports = app;
