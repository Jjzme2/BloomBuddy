import NotificationModel from "./Notification.js";
import { sendEmail } from "../.email/EmailService.js";
import dotenv from "dotenv";
dotenv.config();

const developerEmail = process.env.DEVELOPER_EMAIL;

// const setTimer = (duration, callback) => {
//   setTimeout(callback, duration);
// };

const createNotification = (message, data) => {
  // Validate message
  if (message.trim() === "") {
    throw new Error("Message is required");
  }

  //   Validate data
  if (typeof data !== "object") {
    console.warn("Data must be a valid JSON object", data);
    data = { data };
  }

  try {
    const notification = new NotificationModel(message, data);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

const sendDeveloperEmail = (notification) => {
  sendEmail(
    developerEmail,
    "Developer Notification",
    JSON.stringify(notification),
  );
};

export { createNotification, sendDeveloperEmail };
