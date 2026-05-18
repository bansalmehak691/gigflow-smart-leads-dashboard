import { Request, Response } from "express";
import Notification from "../models/notification.model";
import { AuthRequest } from "../middleware/auth.middleware";

// CREATE NOTIFICATION
export const createNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { message, type } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const validType = (type as "info" | "success" | "warning") || "info";

    const notification = await Notification.create({
      message,
      type: validType,
      userId,
    });

    res.status(201).json({
      message: "Notification created",
      notification,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET NOTIFICATIONS
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      notifications,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};