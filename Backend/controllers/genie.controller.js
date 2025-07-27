const genieModel = require("../models/genie.model");
const genieService = require("../services/genie.service");
const { validationResult } = require("express-validator");
const invalidTokenModel = require("../models/invalidToken.model");

module.exports.registerGenie = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { fullname, email, password, vehicle } = req.body;

  // Check if genie with the same email already exists
  const isExistingGenie = await genieModel.findOne({ email });
  if (isExistingGenie) {
    return res.status(400).json({ message: "Genie already exists" });
  }

  // Hash the password
  const hashedPassword = await genieModel.hashPassword(password);

  // Create a new genie using createGenie in the genie service
  const genie = await genieService.createGenie({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  // Generate an authentication token for the genie
  const token = genie.generateAuthToken();

  // Respond with the created genie and token
  res.status(201).json({ genie, token });
};

module.exports.loginGenie = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { email, password } = req.body;

  // Find the genie by email
  const genie = await genieModel.findOne({ email }).select("+password");
  if (!genie) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Verify the password
  const isPasswordValid = await genie.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate an authentication token for the genie
  const token = genie.generateAuthToken();

  // set the token as a cookie
  res.cookie("token", token);

  // Respond with the logged-in genie and token
  res.status(200).json({ genie, token });
};

module.exports.getGenieProfile = async (req, res, next) => {
  // respond with the genie from the request object (set by auth middleware)
  res.status(200).json(req.genie);
};

module.exports.logoutGenie = async (req, res, next) => {
  // Add this token to the invalid tokens collection
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await invalidTokenModel.create({ token });

  // Clear the token cookie to log out the genie
  res.clearCookie("token");

  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
};
