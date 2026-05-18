import mongoose, { Document, Schema } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "closed";

  assignedTo?: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    status: {
      type: String,

      enum: [
        "new",
        "contacted",
        "qualified",
        "closed",
      ],

      default: "new",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILead>(
  "Lead",
  leadSchema
);

export default Lead;