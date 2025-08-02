import express from "express";

import { validate } from "@middlewares";
import { login, register } from "@controllers";
import { loginSchema, registerSchema } from "@validations";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
