const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  group_name: { type: String, required: true },
  classes: [{ type: String, required: true }],
});

module.exports = mongoose.model("Group", GroupSchema);
