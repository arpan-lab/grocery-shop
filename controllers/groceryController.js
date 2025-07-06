import GroceryItem from "../models/GroceryItem.js";

// GET /api/groceries
export const getItems = async (req, res) => {
  try {
    const items = await GroceryItem.find({ userId: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/groceries
export const addItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    const newItem = new GroceryItem({
      name,
      quantity,
      price,
      imageUrl: "", // 👈 We’ll handle fallback on frontend
      userId: req.user._id,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/groceries/:id
export const deleteItem = async (req, res) => {
  try {
    const item = await GroceryItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
