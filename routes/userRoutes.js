import express from "express";
import {
  addUser, deleteUser, getAllUser, updateUser
} from "../controllers/userController.js";
import { adminCheck, authCheck } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/users", authCheck, adminCheck, getAllUser);
router.post("/users", authCheck, adminCheck, addUser);
router.put("/users/:id", authCheck, adminCheck, updateUser);
router.delete("/users/:id", authCheck, adminCheck, deleteUser);

export default router;
