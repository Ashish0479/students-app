const express = require("express");
const { fetchNotifications, markNotificationRead, addNotification } = require("../controller/notificationController");
const { isLoggedIn } = require("../validations/authValidator");

const notificationRouter = express.Router();
notificationRouter.post("/add", isLoggedIn, addNotification);
notificationRouter.get("/", isLoggedIn, fetchNotifications);
notificationRouter.patch("/:id/read", isLoggedIn, markNotificationRead);

module.exports = notificationRouter;
