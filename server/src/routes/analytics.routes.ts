import express from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// 📊 GET ANALYTICS DATA
router.get("/", protect, getAnalytics);

export default router;