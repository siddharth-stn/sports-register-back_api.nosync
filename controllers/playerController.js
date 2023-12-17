const asyncHandler = require("express-async-handler");

const Player = require("../models/player-model");

const { body, validationResult } = require("express-validator");

// Display list of players
exports.player_list = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find().exec();
  res.status(200).json(allPlayers);
});

// Handle Player Create on POST
exports.player_create_post = [
  body("player_name")
    .trim()
    .notEmpty()
    .withMessage("Player name can not be blank")
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract errors from the req
    const errors = validationResult(req);

    // Create the player object from the data received
    const player = new Player({
      player_name: req.body.player_name,
      class: req.body.class,
    });

    // Check for and Report Errors
    if (!errors.isEmpty()) {
      // There are errors
      res.status(400).json({ errors: errors.array() });
    } else {
      // Check if the player is already in the database
      const playerExists = await Player.findOne({
        player_name: req.body.player_name,
        class: req.body.class,
      }).exec();
      if (playerExists) {
        const err = [
          ...errors.array(),
          {
            type: "custom",
            value: req.body.player_name,
            msg: "Player already exists in database",
            path: "player/create",
            location: "body",
          },
        ];
        res.status(400).json({ errors: err });
      } else {
        await player.save();
        res.status(200).end("Data saved Successfully");
        //! Write the code to redirect
      }
    }
  }),
];

exports.player_update_post = (req, res, next) => {
  res.send("Not Implemented: Player update on POST");
};

exports.player_delete_post = (req, res, next) => {
  res.send("Not Implemented: Player DELETE on POST");
};
