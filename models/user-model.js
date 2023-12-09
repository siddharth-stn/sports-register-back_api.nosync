const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        // Define a regular expression for email validation
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
    },
    message: "Invalid email format/Already registered",
  },
  contact_number: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        // Define a regular expression for a 10-digit mobile number
        return /^[0-9]{10}$/.test(value);
      },
    },
    message: "Invalid mobile number/Already Registered",
  },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
