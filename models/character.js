const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  x1: { type: Number, required: true },
  y1: { type: Number, required: true },
  x2: { type: Number, required: true },
  y2: { type: Number, required: true },
});

module.exports = mongoose.model("Character", CharacterSchema);
