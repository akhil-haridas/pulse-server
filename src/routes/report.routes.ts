import express from "express";
import { authenticate } from "@middlewares";
import { getMyMonthlyReport } from "@controllers";

const router = express.Router();

router.get("/me", authenticate, getMyMonthlyReport);

export default router;
