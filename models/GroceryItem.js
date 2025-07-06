import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  imageUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Grocery = mongoose.model("GroceryItem", groceryItemSchema);

export default Grocery;
