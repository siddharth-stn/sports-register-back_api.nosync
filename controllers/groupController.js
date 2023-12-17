const asyncHandler = require("express-async-handler");

const Group = require("../models/group-model");
const { body, validationResult } = require("express-validator");

exports.group_list = asyncHandler(async (req, res, next) => {
  const allGroups = await Group.find().exec();
  res.status(200).json(allGroups);
});

exports.group_create_post = [
  body("group_name")
    .trim()
    .notEmpty()
    .withMessage("Group Name can not be empty")
    .escape(),
  body("classes")
    .isArray()
    .withMessage("Classes Should be an Array of Strings")
    .escape(),

  // Process Request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from request
    const errors = validationResult(req);

    // Create a Group object with escaped and trimmed data
    const group = new Group({
      group_name: req.body.group_name,
      session: req.body.session,
      classes: req.body.classes,
    });

    if (!errors.isEmpty()) {
      // There are errors
      res.status(400).json({ errors: errors.array() });
    } else {
      // Data is valid
      // Check is similar group already exists
      const groupExists = await Group.findOne({
        group_name: req.body.group_name,
        session: req.body.session,
      }).exec();

      if (groupExists) {
        const err = [
          ...errors.array(),
          {
            type: "custom",
            value: req.body.group_name,
            msg: "Group already exists for this session",
            path: "group/create",
            location: "body",
          },
        ];
        res.status(400).json({ errors: err });
      } else {
        await group.save();
        res.status(200).json("Group Created Successfully");
        //! Here redirect code is to be written
      }
    }
  }),
];

exports.group_update_post = (req, res, next) => {
  res.send("Not Implemented: Group Update on POST");
};

exports.group_delete_post = (req, res, next) => {
  res.send("Not Implemented: Group Delete on POST");
};
