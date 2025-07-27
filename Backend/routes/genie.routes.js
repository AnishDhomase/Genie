const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const genieController = require("../controllers/genie.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.id")
      .isLength({ min: 3 })
      .withMessage("Vehicle ID must be at least 3 characters long"),
    body("vehicle.capacity")
      .isIn(["xs", "sm", "md", "lg", "xl"])
      .withMessage("Vehicle capacity must be one of xs, sm, md, lg, xl"),
    body("vehicle.type")
      .isIn(["bicycle", "bike", "rikshaw", "car", "van", "pickup", "truck"])
      .withMessage(
        "Vehicle type must be either bicycle, bike, rikshaw, car, van, pickup, or truck"
      ),
  ],
  genieController.registerGenie
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  genieController.loginGenie
);

module.exports = router;
