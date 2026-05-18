import { Request, Response } from "express";
import Notification from "../models/notification.model";

// ================= GET NOTIFICATIONS =================
export const getNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// ================= CREATE NOTIFICATION =================
export const createNotification = async (
  message: string,
  type: string,
  userId: string
) => {
  try {
    await Notification.create({
      message,
      type,
      userId,
    });
  } catch (error) {
    console.log("Notification error");
  }
};