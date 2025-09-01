const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["reminder", "goal", "roadmap", "content"],
    default: "reminder",
  },
  actions: {
    type: [String], 
    default: [],
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
