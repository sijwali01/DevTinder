const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new error("First name and last name are required.");
  } else if (!validator.isEmail(email)) {
    throw new error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new error("Please enter a strong Password");
  }
};
module.exports = {validationSignUpData}