import express from "express";
import { authenticate, AuthenticatedRequest } from "@middlewares";

const router = express.Router();

router.get("/me", authenticate, (req: AuthenticatedRequest, res) => {
    res.json({ message: "You are authenticated!", user: req.user });
});

export default router;
