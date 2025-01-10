const mongoose = require("mongoose");



const SequenceNodeSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ['loadSourceNode', 'coldEmailNode', 'delayNode', 'addButton']
  },
  data: {
    label: String,
    role: String,          // for loadSourceNode
    email: String,         // for coldEmailNode
    id: String,           // template id for coldEmailNode
    name: String,         // for coldEmailNode
    subject: String,      // for coldEmailNode
    body: String,
     // for coldEmailNode
    waitFor: String,      // for delayNode
    waitType: String      // for delayNode
  },
  position: {
    x: Number,
    y: Number
  },
  measured: {
    width: Number,
    height: Number
  }
});

const SequenceNode = mongoose.model('User', SequenceNodeSchema);
module.exports = SequenceNode;