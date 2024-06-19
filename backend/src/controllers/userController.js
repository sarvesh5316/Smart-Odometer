const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/userModel");

const UserController = {
  createAccount: async function (req, res) {
    try {
      const userData = req.body;
      // Validate user input (e.g., check for required fields)
      if (!userData.email || !userData.password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required!",
        });
      }

      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Email is already in use!" });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      userData.password = hashedPassword;

      const newUser = new UserModel(userData);
      await newUser.save();

      return res.status(201).json({
        success: true,
        data: newUser,
        message: "User created successfully!",
      });
    } catch (err) {
      console.error("Error creating user:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  signIn: async function (req, res) {
    try {
      const { email, password } = req.body;

      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found!" });
      }

      // Compare hashed password
      const storedPass=foundUser.password;
      const passwordMatch = await bcrypt.compare(password,storedPass );
      console.log(passwordMatch, foundUser.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or password!" });
      }

      return res.status(200).json({ success: true, data: foundUser ,message:"User SignedIn Successfully" });
    } catch (err) {
      console.error("Error signing in:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getProfile: async function (req, res) {
    try {
      const { email } = req.body;

      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found!" });
      }
      return res.status(200).json({ success: true, data: foundUser });
    } catch (err) {
      console.error("Error while searching the user:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateProfile: async function (req, res) {
    try {
      const { email, fullName, phoneNumber, city, state, address } = req.body;

      // Find the user to update
      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found!" });
      }

      // Update user fields
      foundUser.fullName = fullName;
      foundUser.phoneNumber = phoneNumber;
      foundUser.city = city;
      foundUser.state = state;
      foundUser.address = address;

      // Save the updated user
      await foundUser.save();

      // Return success response with updated user data
      return res.status(200).json({
        success: true,
        data: foundUser,
        message: "User details updated successfully!",
      });
    } catch (err) {
      // Handle errors
      console.error("Error while updating user details:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = UserController;
