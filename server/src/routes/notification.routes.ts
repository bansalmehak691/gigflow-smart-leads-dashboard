import express from "express";
import { getNotifications } from "../controllers/notification.controller";
import { protect } from "../middleware/auth.middleware";


const router = express.Router();

// 📩 GET ALL NOTIFICATIONS
router.get("/", protect, getNotifications);

export default router;