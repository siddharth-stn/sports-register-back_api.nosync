const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const TeamSchema = new Schema({
  team_name: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  sport: { type: Schema.Types.ObjectId, ref: "Sport", required: true },
  team_type: {
    type: String,
    enum: ["Boys", "Girls", "Mixed"],
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
