import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import numberRoutes from "./routes/numberRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectDb from "./config/database.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 9999;

app.use("/api", authRoutes);
app.use("/api", numberRoutes);
app.use("/api", userRoutes);

app.listen(PORT, console.log(`Port: ${PORT}`));

const con = await connectDb();

console.log(`${con.connection.host} \nMongoDB Connected`);
