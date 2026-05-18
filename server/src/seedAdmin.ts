import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model";

dotenv.config();

const createAdmin = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("MongoDB connected");

    // 2. Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@crm.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 4. Create admin user
    await User.create({
      name: "Admin",
      email: "admin@crm.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");

    process.exit();

  } catch (error) {
    console.log("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();