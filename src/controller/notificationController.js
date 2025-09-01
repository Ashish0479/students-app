const { getUserNotifications, markAsRead } = require("../service/notificationService");
const Notification = require("../schema/notificationSchema");

async function fetchNotifications(req, res) {
  try {
    const notifications = await getUserNotifications(req.user.id);
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
}

async function markNotificationRead(req, res) {
  try {
    const notification = await markAsRead(req.params.id);
    res.status(200).json({ success: true, data: notification });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating notification" });
  }
}
 async function addNotification (req, res){
  try {
    const { message } = req.body;

    const notification = await Notification.create({
      user: req.user.id,  
      message,
    });

    res.status(201).json({
      success: true,
      data: notification,
      message: "Notification added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
    });
  }
};


module.exports = { fetchNotifications, markNotificationRead,addNotification };
