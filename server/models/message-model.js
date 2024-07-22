const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true
    },
    messageType: {
      type: String,
      required: true
    },
    textOrPathToFile: {
      type: String,
      required: true
    },
    roomId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Message', MessageSchema)