const Notification = require("../schema/notificationSchema");

async function createNotification(data) {
  return await Notification.create(data);
}

async function getUserNotifications(userId) {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
}

async function markAsRead(notificationId) {
  return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
}

module.exports = { createNotification, getUserNotifications, markAsRead };
