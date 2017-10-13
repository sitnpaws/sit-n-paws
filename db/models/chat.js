const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.schema.ObjectId, required: true, ref: 'User'},
    conversationId: { type: mongoose.schema.ObjectId, required: true }
  },
  { timestamps: true }
);

const Msg = mongoose.model('Message', messageShema);
module.exports.Msg = Msg;
