import express from "express";
const router = express.Router();

import {
  getNumbers,
  addNumber,
  toggleActiveNumber,
  updateNumber,
  removeNumber,
  getActiveNumbers,
  editLimit,
} from "../controllers/numberController.js";

import { authCheck, adminCheck } from "../middleware/authMiddleware.js";

router.get("/active", getActiveNumbers);
router.get("/numbers", authCheck, adminCheck, getNumbers);
router.post("/numbers", authCheck, adminCheck, addNumber);
router.post("/limit/:id", authCheck, editLimit);
router.get("/numbers/:id", authCheck, adminCheck, toggleActiveNumber);
router.put("/numbers/:id", authCheck, adminCheck, updateNumber);
router.delete("/numbers/:id", removeNumber);

export default router;
