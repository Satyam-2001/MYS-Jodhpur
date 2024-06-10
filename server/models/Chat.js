const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }  // Optional for quick access to the last message
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat