import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // Ensure bcrypt is imported
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("⚠️ Admin already exists");
      return mongoose.disconnect();
    }

    const newAdmin = new Admin({
      name: "admin",
      email: "admin@example.com",
      password: "admin@985", // Will be hashed via pre-save hook
    });

    await newAdmin.save();
    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
