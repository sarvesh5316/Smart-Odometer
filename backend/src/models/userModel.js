const { Schema, model } = require("mongoose");
const uid = require("uuid");
const bcrypt = require("bcryptjs");

// Define the first schema for your application
const userSchema = new Schema({
  id: { type: String, unique: true },
  fullName: { type: String, default: "" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  address: { type: String, default: "" },
  profileProgress: { type: Number, default: 0 },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Middleware for handling operations before saving the document
userSchema.pre("save", function (next) {
  this.id = uid.v1();
  this.createdOn = new Date();
  this.updatedOn = new Date();
  next();
});

// Middleware for handling operations before updating the document
userSchema.pre(["updateOne", "update", "findOneAndUpdate"], function (next) {
  const update = this.getUpdate();
  delete update._id;
  delete update.id;
  this.updatedOn = new Date();
  next();
});

const UserModel = model("Users", userSchema);


module.exports = { UserModel};