import express from "express";

import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @route   POST /api/leads
 * @desc    Create new lead
 * @access  Private
 */
router.post("/", protect, createLead);

/**
 * @route   GET /api/leads
 * @desc    Get all leads
 * @access  Private
 */
router.get("/", protect, getLeads);

/**
 * @route   PUT /api/leads/:id
 * @desc    Update lead status
 * @access  Private
 */
router.put("/:id", protect, updateLeadStatus);

/**
 * @route   DELETE /api/leads/:id
 * @desc    Delete lead
 * @access  Private
 */
router.delete("/:id", protect, deleteLead);

export default router;