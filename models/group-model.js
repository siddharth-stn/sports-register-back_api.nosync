const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  group_name: { type: String, required: true },
  session: { type: Schema.Types.ObjectId, ref: "Session", required: true },
  classes: [{ type: String, required: true }],
});

module.exports = mongoose.model("Group", GroupSchema);
