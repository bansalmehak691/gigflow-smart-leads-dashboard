import { Request, Response } from "express";
import Lead from "../models/lead.model";

// ================= GET ANALYTICS =================
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();

    const total = leads.length;

    const newLeads = leads.filter((l) => l.status === "new").length;

    const qualified = leads.filter(
      (l) => l.status === "qualified"
    ).length;

    const closed = leads.filter((l) => l.status === "closed").length;

    // 📊 conversion rate
    const conversionRate =
      total === 0 ? 0 : (closed / total) * 100;

    // 📈 mock monthly growth (can be improved later)
    const monthlyData = [
      { month: "Jan", leads: 10 },
      { month: "Feb", leads: 20 },
      { month: "Mar", leads: 15 },
      { month: "Apr", leads: 30 },
      { month: "May", leads },
    ];

    res.json({
      total,
      newLeads,
      qualified,
      closed,
      conversionRate,
      monthlyData,
    });

  } catch (error) {
    res.status(500).json({
      message: "Analytics error",
    });
  }
};