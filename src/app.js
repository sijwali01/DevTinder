const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const User = require("./model/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const adminAuth = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//for post the req to db
app.post("/signup", async (req, res) => {
  //validation of data
  try {
    validationSignUpData(req);

    //Encrypt the password

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id }, "ManisH@0123",{ expiresIn: '7d' });
      res.cookie("token", token);
      return res.send("Login Succcessfully");
    } else {
      res.status(400).send("invalid password");
    }
  } catch {
    res.status(400).send("ERROR");
  }
});

//for profile
app.get("/profile", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error + "ERROR");
  }
});

//sending the connection request
app.post("/sentconnectionrequest", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(
      user.firstName +
        " " +
        user.lastName +
        " has sent you a connection request"
    );
  } catch (error) {
    res.status(400).send(error + "ERROR");
  }
});

//for get user data from db
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//find all users
app.get("/allUsers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for delete a user
app.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//for update a user
app.patch("/updateuser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send({ message: "Invalid operation" });
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be moe than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

// connection to db
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });
