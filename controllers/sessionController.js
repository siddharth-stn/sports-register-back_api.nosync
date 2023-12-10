const Session = require("../models/session-model");

const { body, validationResult } = require("express-validator");

// Display list of Sessions
exports.session_list = (req, res, next) => {
  res.send("Not Implemented: Session List");
};

// Handle Session Create on POST
exports.session_create_post = [
  // Validate and Sanitize the Field
  body("session", "Session format YYYY-YY").trim().escape(),
  async (req, res, next) => {
    // Extract the validation errors from request.
    const errors = validationResult(req);

    // Create a session object with escaped and trimmed data
    const session = new Session({ session: req.body.session });
  },
];

// Update a Session
exports.session_update_post = (req, res, next) => {
  res.send("Not Implemented: Session Update on POST");
};

// Delete a Session
exports.session_delete_post = (req, res, next) => {
  res.send("Not Implemented: Session Delete on POST");
};
