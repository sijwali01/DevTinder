const express = require("express");
// const adminAuth = require("./middlewares/auth");
const app = express();
const connectDB = require("./config/database");

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8080, () => {
      console.log("server is running on port 8080");
    });
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });
