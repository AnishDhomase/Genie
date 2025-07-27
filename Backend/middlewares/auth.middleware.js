const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const invalidTokenModel = require("../models/invalidToken.model");
const genieModel = require("../models/genie.model");

// Middleware to authenticate user requests
module.exports.authUser = async (req, res, next) => {
  // Check for token in cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is invalidated after logout
  const isTokenInvalid = await invalidTokenModel.findOne({ token: token });
  if (isTokenInvalid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from id specified in the token
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to the request object for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to authenticate genie requests
module.exports.authGenie = async (req, res, next) => {
  // Check for token in cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is invalidated after logout
  const isTokenInvalid = await invalidTokenModel.findOne({ token: token });
  if (isTokenInvalid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the genie from id specified in the token
    const genie = await genieModel.findById(decoded._id);
    if (!genie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach genie to the request object for further use
    req.genie = genie;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
