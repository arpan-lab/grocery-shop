import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true } // ✅ This adds createdAt and updatedAt
);

export default mongoose.model("User", userSchema);
