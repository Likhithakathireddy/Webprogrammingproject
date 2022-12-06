const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    phonenumber : String,
    password: String,
    otp : String,
    key: String,
  },
  {
    collection: "webapp",
  }
);

mongoose.model("webapp", UserDetailsScehma);