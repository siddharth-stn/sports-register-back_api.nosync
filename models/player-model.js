const Schema = require("mongoose").Schema;

const PlayerSchema = new Schema({
  player_name: { type: String, required: true },
  class: {
    type: String,
    required: true,
    enum: [
      "Nur",
      "LKG",
      "UKG",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11-Maths",
      "11-Bio",
      "11-Comm",
      "11-Ag",
      "11-Arts",
      "12-Maths",
      "12-Bio",
      "12-Comm",
      "12-Ag",
      "12-Arts",
    ],
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
