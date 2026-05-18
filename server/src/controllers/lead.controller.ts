import { Request, Response } from "express";
import Lead from "../models/lead.model";
import { AuthRequest } from "../middleware/auth.middleware";

// CREATE LEAD
export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, company, status } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      company,
      status: status || "new",
      assignedTo: userId,
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

// GET ALL LEADS
export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const leads = await Lead.find()
      .populate("assignedTo", "name email role");

    res.status(200).json({
      leads,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE LEAD STATUS
export const updateLeadStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
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

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE LEAD
export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};