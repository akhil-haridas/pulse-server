import { Request, Response } from "express";
import { loginUser, registerUser } from "@services";
import { signToken, verifyToken } from "@utils";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body);
        const accessToken = signToken({ userId: user.id }, "15m");
        const refreshToken = signToken({ userId: user.id }, "7d");

        res.status(200).json({
            user: { id: user.id, email: user.email, name: user.name },
            accessToken,
            refreshToken,
        });
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token required" });
    }

    try {
        const decoded = verifyToken(refreshToken) as { userId: string };
        const accessToken = signToken({ userId: decoded.userId }, "15m");

        res.status(200).json({ accessToken });
    } catch (err: any) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
};
