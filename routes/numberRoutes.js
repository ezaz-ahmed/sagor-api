import express from "express";
import {
  addNumber,
  editLimit,
  getActiveNumbers,
  getNumbers,
  removeNumber,
  toggleActiveNumber,
  updateNumber,
} from "../controllers/numberController.js";
import { adminCheck, authCheck } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/active", authCheck, getActiveNumbers);
router.get("/numbers", authCheck, adminCheck, getNumbers);
router.post("/numbers", authCheck, adminCheck, addNumber);
router.post("/limit/:id", authCheck, editLimit);
router.get("/numbers/:id", authCheck, adminCheck, toggleActiveNumber);
router.put("/numbers/:id", authCheck, adminCheck, updateNumber);
router.delete("/numbers/:id", removeNumber);

export default router;
