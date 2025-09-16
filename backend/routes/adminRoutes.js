import express from "express";
import { loginAdmin, getAllUsers, deleteUser, updateUser,getAllOrders } from "../controllers/adminController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

// Protected routes
router.get("/users", adminOnly, getAllUsers);
router.delete("/users/:id", adminOnly, deleteUser);
router.put("/users/:id", adminOnly, updateUser);
router.get("/orders", adminOnly, getAllOrders);
export default router;
