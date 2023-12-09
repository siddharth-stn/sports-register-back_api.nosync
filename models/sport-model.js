const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SportSchema = new Schema({
  sport_name: { type: String, required: true },
  no_of_player_in_team: { type: Number, required: true },
  win_award_points: { type: Number, required: true },
  second_place_award_points: { type: Number, required: true },
  third_place_award_points: { type: Number, required: true },
  group: [{ type: Schema.Types.ObjectId, ref: "Group", required: true }],
});

module.exports = mongoose.model("Sport", SportSchema);
