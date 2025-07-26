const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const invalidTokenModel = require("../models/invalidToken.model");

module.exports.registerUser = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { fullname, email, password } = req.body;

  // Check if user with the same email already exists
  const isExistingUser = await userModel.find({ email });
  if (isExistingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user using createUser in the user service
  const user = await userService.createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  // Generate an authentication token for the user
  const token = user.generateAuthToken();

  // Respond with the created user and token
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { email, password } = req.body;

  // Check if the user exists with the provided credentials
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate an authentication token for the user
  const token = user.generateAuthToken();

  // Set the token in a cookie
  res.cookie("token", token);

  // Respond with the user details and token
  res.status(200).json({ user, token });
};

module.exports.logoutUser = async (req, res, next) => {
  //   Add this token to the invalid tokens collection
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await invalidTokenModel.create({ token });

  // Clear the token cookie to log out the user
  res.clearCookie("token");

  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.getUserProfile = async (req, res, next) => {
  // respond with the user from the request object (set by auth middleware)
  res.status(200).json(req.user);
};
