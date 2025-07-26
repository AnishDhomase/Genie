const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const genieRoutes = require("./routes/genie.routes");

const app = express();

// Connect to the database
connectToDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRoutes);
app.use("/genies", genieRoutes);

module.exports = app;
