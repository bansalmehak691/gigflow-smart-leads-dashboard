import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import leadRoutes from "./routes/lead.routes";
import analyticsRoutes from "./routes/analytics.routes";
import notificationRoutes from "./routes/notification.routes";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/", (_, res) => {
  res.send("API Running");
});

export default app;