const bookModel = require("../model/book");
const JWTService = require("../CommonLib/JWTtoken");
const tokenModel = require("../model/token");
const userModel = require("../model/user");
const mongoose = require("mongoose");

async function createBook(req, res, next) {
  try {
    let token = req.headers.token;
    token = token.split(" ")[1];
    const status = JWTService.verifyToken(token);

    if (status) {
      const userId = await tokenModel.findOne({ token });
      const userRole = await userModel.findOne({ userId: userId.userId });

      if (userRole.roleName === "writer") {
        req.body.authorId = userId.userId;
        req.body.publicationId = mongoose.Types.ObjectId(
          req.body.publicationId
        );
        req.body.publicationId = mongoose.Types.ObjectId(
          req.body.publicationId
        );
        // console.log(req.body);

        // payload.publicationId = mongoose.Types.ObjectId(payload.publicationId);
        // payload.commentId = mongoose.Types.ObjectId(payload.commentId);
        const bookData = await bookModel
          .create(req.body)
          .populate("publication")
          .populate("user")
          .populate("comment");

        return res.status(200).json({
          status: "success",
          bookData,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "only writer is allowed",
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        message: "token is invalid",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "token server error",
    });
  }
}

async function allBooks(req, res) {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    let response = await bookModel.find({}).skip(skip).limit(limit);
    let totalCount = await bookModel.count();
    res.json({
      status: "sucessful",
      message: "all books data send",
      response,
      totalCount,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "all books data send error",
    });
  }
}
module.exports = {
  createBook,
  allBooks,
};
