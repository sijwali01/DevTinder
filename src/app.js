const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Manav",
    lastName: "Sijwali",
    email: "manavsijwali12.in",
    password: "Manav123",
    age: 24,
    gender: "male",
  });

  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

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
