const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team_name: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  sport: { type: Schema.Types.ObjectId, ref: "Sport", required: true },
  team_type: {
    type: String,
    enum: ["Boys", "Girls", "Mixed"],
    required: true,
  },
  team_position_in_table: {
    type: String,
    enum: ["Winner", "Second", "Third", "RunnerUp"],
    default: "RunnerUp",
    required: true,
  },
  house: {
    type: String,
    required: true,
    enum: ["Red", "Blue", "Green", "Yellow", "UnCat"],
    default: "UnCat",
  },
  player: [{ type: Schema.Types.ObjectId, ref: "Player", required: true }],
});

module.exports = mongoose.model("Team", TeamSchema);
