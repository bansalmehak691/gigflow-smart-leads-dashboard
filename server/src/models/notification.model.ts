import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["info", "success", "warning"],
      default: "info",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);