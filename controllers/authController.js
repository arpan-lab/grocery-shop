import User from "../models/User.js";
import GroceryItem from "../models/GroceryItem.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Signup request:", name, email);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const defaultItems = [
      { name: "Milk", quantity: 2, price: 45 },
      { name: "Bread", quantity: 3, price: 25 },
      { name: "Eggs", quantity: 12, price: 120 },
      { name: "Salt", quantity: 2, price: 70 },
      { name: "Maggie", quantity: 4, price: 55 },
      { name: "Cornflakes", quantity: 1, price: 90 },
      { name: "Tomato", quantity: 6, price: 40 },
      { name: "Oreo", quantity: 2, price: 50 },
      { name: "Bourboan", quantity: 1, price: 30 },
      { name: "Mariegold", quantity: 1, price: 25 },
      { name: "Onion", quantity: 4, price: 38 },
      { name: "Garlic", quantity: 3, price: 20 },
      { name: "Darkfantasy", quantity: 1, price: 60 },
      { name: "Dabur", quantity: 2, price: 90 },
      { name: "Indiagate", quantity: 1, price: 120 },
      { name: "Closeup", quantity: 1, price: 45 },
    ];

    const groceries = defaultItems.map((item) => ({
      ...item,
      userId: user._id,
    }));

    await GroceryItem.insertMany(groceries);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ error: "Signup failed" });
  }
};

// ✅ SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Signin error:", err.message);
    res.status(500).json({ error: "Signin failed" });
  }
};
