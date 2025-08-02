import { Request, Response } from "express";
import { getUserById, updateUserProfile } from "@services";
import { AuthenticatedRequest } from "@middlewares";

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    const user = await getUserById(req.user!.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password, ...safeUser } = user;
    res.json({ user: safeUser });
};

export const updateMe = async (req: AuthenticatedRequest, res: Response) => {
    const user = await updateUserProfile(req.user!.userId, req.body);
    const { password, ...safeUser } = user;
    res.json({ user: safeUser });
};
