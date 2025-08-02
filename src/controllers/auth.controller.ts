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

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            user: { id: user.id, email: user.email, name: user.name },
            accessToken,
        });

    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) return res.status(400).json({ error: "Missing refresh token" });

        const decoded = verifyToken(refreshToken) as { userId: string };
        const accessToken = signToken({ userId: decoded.userId }, "15m");

        res.status(200).json({ accessToken });
    } catch (err: any) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
};

export const logout = (_req: Request, res: Response) => {
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logged out successfully" });
};