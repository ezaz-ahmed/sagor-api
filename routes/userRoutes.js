import express from "express";
const router = express.Router();

import {
  addUser,
  getAllUser,
  deleteUser,
} from "../controllers/userController.js";
import { authCheck, adminCheck } from "../middleware/authMiddleware.js";

router.get("/users", authCheck, adminCheck, getAllUser);
router.post("/users", authCheck, adminCheck, addUser);
router.delete("/users/:id", authCheck, adminCheck, deleteUser);

export default router;
