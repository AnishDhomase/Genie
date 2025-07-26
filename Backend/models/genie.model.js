const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const genieSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastname: {
      type: String,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Exclude password from queries by default
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Vehicle color must be at least 2 characters long"],
    },
    id: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Vehicle ID must be at least 2 characters long"],
    },
    capacity: {
      type: String,
      enum: ["xs", "sm", "md", "lg", "xl"],
      required: true,
    },
    type: {
      type: String,
      enum: ["bicycle", "bike", "rikshaw", "car", "van", "pickup", "truck"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

genieSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

genieSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

genieSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const genieModel = mongoose.model("genie", genieSchema);
module.exports = genieModel;
