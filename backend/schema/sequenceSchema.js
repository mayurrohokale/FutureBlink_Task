
const mongoose = require("mongoose");

const SequenceNodeSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: ['loadSourceNode', 'coldEmailNode', 'delayNode', 'addButton'] },
  data: {
    label: String,
    role: String,
    email: String,
    id: String,
    name: String,
    subject: String,
    body: String,
    waitFor: String,
    waitType: String,
  },
  position: {
    x: Number,
    y: Number,
  },
  measured: {
    width: Number,
    height: Number,
  },
});

const SequenceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  sequence: [SequenceNodeSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sequence", SequenceSchema);
