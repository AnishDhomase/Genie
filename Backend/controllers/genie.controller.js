const genieModel = require("../models/genie.model");
const genieService = require("../services/genie.service");
const { validationResult } = require("express-validator");

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
    password,
    vehicle,
  });

  // Generate an authentication token for the genie
  const token = genie.generateAuthToken();

  // Respond with the created genie and token
  res.status(201).json({ genie, token });
};
