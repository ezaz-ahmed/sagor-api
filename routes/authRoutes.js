import express from "express";
const router = express.Router();

import { login, logout } from "../controllers/authController.js";

router.post("/login", login);
router.get("/logout", logout);

export default router;
