import express from "express";
import { getItems, addItem, deleteItem } from "../controllers/groceryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getItems);
router.post("/", protect, addItem);
router.delete("/:id", protect, deleteItem);

export default router;
