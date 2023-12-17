const asyncHandler = require("express-async-handler");

const Sport = require("../models/sport-model");

const { body, validationResult } = require("express-validator");

exports.sport_list = asyncHandler(async (req, res, next) => {
  const allSports = await Sport.find().exec();
  res.status(200).json(allSports);
});

// Handle Sport Creation on POST
exports.sport_create_post = [
  // Validate and Sanitize the fields
  body("sport_name")
    .trim()
    .notEmpty()
    .withMessage("Sport name can not be blank")
    .escape(),
  body("no_of_player_in_team")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Team should have atleast one player")
    .escape(),
  body("win_award_points")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Points can not be less than one")
    .escape(),
  body("second_place_award_points")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Points can not be less than one")
    .escape(),
  body("third_place_award_points")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Points can not be less than one")
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from req
    const errors = validationResult(req);

    // Create a sport object with sanitized and validated data
    const sport = new Sport({
      sport_name: req.body.sport_name,
      no_of_player_in_team: req.body.no_of_player_in_team,
      win_award_points: req.body.win_award_points,
      second_place_award_points: req.body.second_place_award_points,
      third_place_award_points: req.body.third_place_award_points,
      group: req.body.group,
    });

    // Check and return errors
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      // Data is valid
      // Check if similar sport exists
      const sportExists = await Sport.findOne({
        sport_name: req.body.sport_name,
        group: req.body.group,
      }).exec();

      if (sportExists) {
        const err = [
          ...errors.array(),
          {
            type: "custom",
            value: req.body.sport_name,
            msg: "Sport exists in database",
            path: "sport/create",
            location: "body",
          },
        ];
        res.status(400).json({ errors: err });
      } else {
        await sport.save();
        res.end("data saved Successfully");
        //! Have to code the redirect feature
      }
    }
  }),
];

exports.sport_update_post = (req, res, next) => {
  res.send("Not Implemented: Sport update on POST");
};
exports.sport_delete_post = (req, res, next) => {
  res.send("Not Implemented: Sport delete on POST");
};
