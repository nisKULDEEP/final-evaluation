const userModel = require("../model/user");
const mongoose = require("mongoose");

async function getAllUser(req, res, next) {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    let response = await userModel.find({}).skip(skip).limit(limit);
    let totalCount = await userModel.count();
    res.json({
      status: "sucessful",
      message: "all users data send",
      response,
      totalCount,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createUser(req, res, next) {
  //fetch info from request body
  try {
    let userDetail = req.body;
    let response = await userModel.insertMany([userDetail]);

    req.body.parents.forEach((ele) => {
      ele.empId = response[0]._id;
    });

    let result = await parentModel.insertMany(req.body.parents);
    await userModel.updateOne(
      { _id: response[0]._id },
      { $push: { parentsId: [result[0]._id, result[1]._id] } }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
}

async function getUserById(req, res, next) {
  let userId = req.params.userId;
  let response = await userModel.find({ _id: userId });
  res.json(response);
}

async function deleteUser(req, res, next) {
  let userId = req.params.userId;
  let response = await userModel.deleteOne({ _id: userId });
  res.json(response);
}

async function updateUser(req, res, next) {
  let userId = req.params.userId;
  let body = req.body;
  let response = await userModel.updateOne({ _id: userId }, { $set: body });
  res.json(response);
}

function saveImage(req, res, next) {
  console.log("Request file", req.file);
  res.json({
    message: "Image saved",
    path: req.file.path,
  });
}

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  saveImage,
};
