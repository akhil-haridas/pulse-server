import express from "express";

import { validate } from "@middlewares";
import { login, logout, refreshAccessToken, register } from "@controllers";
import { LoginSchema, RegisterSchema } from "@validations";

const router = express.Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
