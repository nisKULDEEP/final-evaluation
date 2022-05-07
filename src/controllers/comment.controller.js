const commentModel = require("../model/comment");

async function addComment(req, res) {
  try {
    req.body.bookId = mongoose.Types.ObjectId(req.body.bookId);
    const response = await commentModel.create(req.body);
    res.status(200).json({
      status: "success",
      message: "comment created successfully",
      response,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "error creating comment",
    });
  }
}

module.exports = addComment;
