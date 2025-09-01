const cron = require("node-cron");
const Goal = require("../schema/goalSchema");
const { createNotification } = require("../service/notificationService");
const sendEmail = require("./sendEmail");

cron.schedule("0 0 * * *", async () => {
  try {
    const goals = await Goal.find({
      status: "Not Started",
      createdAt: { $lte: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } 
    }).populate("user");

    for (let goal of goals) {
      const message = `Its been 4 days you added the goal ${goal.goal} but you have not generated or suggest content for your goal`;

      
      await createNotification({
        user: goal.user._id,
        goal: goal._id,
        message,
        type: "reminder",
        actions: ["generateRoadmap", "deleteGoal"],
      });

      
      await sendEmail({
        to: goal.user.email,
        subject: "⚡ Reminder: your goal is pending",
        text: `${message}\n👉Generate roadmap Or ❌ Delete Goal`,
      });
    }

    console.log("Reminder job executed successfully");
  } catch (err) {
    console.error("Reminder job failed", err);
  }
});
