const asyncHandler = require("express-async-handler");

const Team = require("../models/team-model");

const { body, validationResult } = require("express-validator");

exports.team_list = asyncHandler(async (req, res, next) => {
  const allTeams = await Team.find().exec();
  res.status(200).json(allTeams);
});

// Handle Team creation on POST
exports.team_create_post = [
  body("team_name")
    .trim()
    .notEmpty()
    .withMessage("Team name can not be blank")
    .escape(),
  body("team_type").escape(),
  body("house").escape(),
  body("team_position_in_table").escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation Errors
    const errors = validationResult(req);

    // Create a Team object with escaped and trimmed data
    const team = new Team({
      team_name: req.body.team_name,
      group: req.body.group,
      sport: req.body.sport,
      team_type: req.body.team_type,
      team_position_in_table: req.body.team_position_in_table,
      house: req.body.house,
      player: req.body.player,
    });

    // Check and report errors
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      // Data is valid
      // Check if similar team already exists
      const teamExists = await Team.findOne({
        team_name: req.body.team_name,
      }).exec();

      if (teamExists) {
        const err = [
          ...errors.array(),
          {
            type: "custom",
            value: req.body.team,
            msg: "Team exists in database",
            path: "team/create",
            location: "body",
          },
        ];
        res.status(400).json({ errors: err });
      } else {
        await team.save();
        res.status(200).end("Data Saved Successfully");
        //! To write the code to redirect
      }
    }
  }),
];

exports.team_update_post = (req, res, next) => {
  res.send("Not Implemented: Team UPDATE on POST");
};

exports.team_delete_post = (req, res, next) => {
  res.send("Not Implemented: Team DELETE on POST");
};
