const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
    chatId: { type: mongoose.Schema.ObjectId, required: true }
  },
  { timestamps: true }
);

const Msg = mongoose.model('Message', messageSchema);
module.exports.Msg = Msg;

const chatSchema = new mongoose.Schema(
  {
    stay: { type: mongoose.Schema.ObjectId, required: true, ref: 'Stay'},
    host: { type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
    guest: { type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
    count: { type: Number, default: 0 }
  }
);

const Chat = mongoose.model('Conversation', chatSchema);
module.exports.Chat = Chat;
