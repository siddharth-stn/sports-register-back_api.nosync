const asyncHandler = require("express-async-handler");

const Session = require("../models/session-model");

const { body, validationResult } = require("express-validator");

// Display list of Sessions
exports.session_list = asyncHandler(async (req, res, next) => {
  const allSessions = await Session.find().exec();
  res.status(200).json(allSessions);
});

// Handle Session Create on POST
exports.session_create_post = [
  // Validate and Sanitize the Field
  body("session", "Session format YYYY-YY")
    .trim()
    .notEmpty()
    .withMessage("Session can not be Empty")
    .matches(/^\d{4}-\d{2}$/)
    .withMessage("Format should be YYYY-YY")
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request.
    const errors = validationResult(req);

    // Create a session object with escaped and trimmed data
    const session = new Session({ session: req.body.session });

    if (!errors.isEmpty()) {
      // There are errors
      res.status(400).json({ errors: errors.array() });
    } else {
      // Data is valid
      // Check if the similar session already exists
      const sessionExists = await Session.findOne({
        session: req.body.session,
      }).exec();

      if (sessionExists) {
        const err = [
          ...errors.array(),
          {
            type: "custom",
            value: req.body.session,
            msg: "Session exists in database",
            path: "session/create",
            location: "body",
          },
        ];
        res.status(400).json({ errors: err });
      } else {
        await session.save();
        res.end("Data Saved Successfully");
        //! To write the code to redirect to Group Creation Page after this
      }
    }
  }),
];

// Update a Session
exports.session_update_post = (req, res, next) => {
  res.send("Not Implemented: Session Update on POST");
};

// Delete a Session
exports.session_delete_post = (req, res, next) => {
  res.send("Not Implemented: Session Delete on POST");
};
