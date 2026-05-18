import { Response } from "express";
import Lead from "../models/lead.model";
import Notification from "../models/notification.model";
import { AuthRequest } from "../middleware/auth.middleware";

// ================= CREATE LEAD =================
export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, company, status } = req.body;

    const lead = await Lead.create({
      name,
      email,
      company,
      status: status || "new",
      assignedTo: req.user.id,
    });

    // 🔔 NOTIFICATION
    await Notification.create({
      message: `New lead created: ${name}`,
      type: "success",
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error while creating lead",
    });
  }
};

// ================= GET ALL LEADS =================
export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const leads = await Lead.find().populate(
      "assignedTo",
      "name email role"
    );

    res.status(200).json({
      leads,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error while fetching leads",
    });
  }
};

// ================= UPDATE LEAD STATUS (KANBAN CORE) =================
export const updateLeadStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 🔒 Allowed statuses
    const allowedStatuses = ["new", "qualified", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    // 🔔 NOTIFICATION
    await Notification.create({
      message: `Lead moved to ${status}: ${lead.name}`,
      type: "info",
      userId: req.user.id,
    });

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error while updating lead",
    });
  }
};

// ================= DELETE LEAD =================
export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    // 🔔 NOTIFICATION
    await Notification.create({
      message: `Lead deleted: ${lead.name}`,
      type: "warning",
      userId: req.user.id,
    });

    res.status(200).json({
      message: "Lead deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error while deleting lead",
    });
  }
};