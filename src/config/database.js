const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://manishsijwali01:ManisH%4001234@devtinder.4rs1k.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
