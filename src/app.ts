import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "@routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


// Health check route
app.get("/api/health", (_req, res) => {
    res.json({ status: "OK", message: "Server is healthy" });
});

export default app;
