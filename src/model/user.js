const mongoose = require("mongoose");
var validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 10 ,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    // maxLength: 10,
    validate(value) {
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
    },
  },

  age: {
    type: Number,
    // required: true,
    minLength: 2,
    min: 18,
  },
  gender: {
    type: String,
    // required: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Invalid gender");
      }
    },

    lowercase: true,
  },
  photoUrl: {
    type: String, // URL of the photo
    default:
      "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
  },
  about: {
    type: String,
    default: "This is an Default About of an User!",
  },
  skills: {
    type: [
      {
        type: String,
        required: true,
        maxLength: 5,
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
